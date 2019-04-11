import React, {Component} from "react";
import {
    Text,
    Container,
    Header,
    Left,
    Button,
    Icon,
    Body,
    Right,
    Content,
    Title,
    ListItem,
    Badge,
    IconNB,
    Input,
    Item,
    List
} from "native-base";
import {ListView} from "react-native";

const ip = "192.168.43.187";

const datas = [
    {name: "Food Shopping List", price: 32.50},
    {name: "Birthday List", price: 47.10},
    {name: "Buy condoms", price: 12.99},
    {name: "BBQ Shopping List", price: 73.23},
    {name: "Bedroom decoration", price: 399.99},
    {name: "Party", price: 51.18},
];


class ShoppingList extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            basic: true,
            listViewData: datas
        };
    }

    deleteRow(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.listViewData];
        newData.splice(rowId, 1);
        this.setState({listViewData: newData});
    }

    setlist(response, mycl) {
        values = JSON.parse(response);
        if (values["opcode"] == 200 && values["message"] == "OK") {
            datas += values;
        } else
            return 1;
    }

    GetList(token, id, callback) {
        var theUrl = "http://" + ip + ":3000/api/v1/list?id=" + id;
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, true); // false for synchronous request
        xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
        xmlHttp.setRequestHeader("token", token);
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText, mycl);
        }
        xmlHttp.send(null);
    }

    getlist(token, response, mycl) {
        values = JSON.parse(response);
        if (values["opcode"] == 200) {
            list = values["list"].split(";");
            for (var i = 0; i < list.length; i++) {
                mycl.GetList(token, list[i], mycl.setlist, mycl);
            }
        } else
            return 1;
    }

    GetListUser(token, callback) {
        mycl = this;
        var theUrl = "http://" + ip + ":3000/api/v1/list/user";
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, true); // false for synchronous request
        xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
        xmlHttp.setRequestHeader("token", token);
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(token, xmlHttp.responseText, mycl);
        }
        xmlHttp.send(null);
    }

    render() {
        const {navigation} = this.props;
        token = navigation.getParam('token', 'NO-TOKEN');
        this.GetListUser(token, this.getlist);
        return (
            <Container>
                <Header searchBar rounded>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                            <Icon name="menu"/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>ShoppingList</Title>
                    </Body>
                    <Right>
                        <Item>
                            <Input placeholder="Search"/>
                            <Icon active name="search"/>
                        </Item>
                    </Right>
                </Header>

                <Content>
                    <ListItem itemDivider>
                        <Text>Simply Market</Text>
                    </ListItem>
                    <List style={{marginLeft: 20}}
                          dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                          renderRow={data =>
                              <ListItem thumbnail onPress={() => this.props.navigation.navigate("ShoppingListShow", {
                                  token: token,
                                  name: data.name,
                                  products: data.products
                              })}>
                                  <Left>
                                      <Text> {data.name} </Text>
                                  </Left>
                                  <Body/>
                                  <Right>
                                      <Badge success>
                                          <Text> {data.price} $</Text>
                                      </Badge>
                                  </Right>
                              </ListItem>}
                          renderLeftHiddenRow={data =>
                              <Button
                                  full
                                  onPress={() => this.props.navigation.navigate("ShoppingListShow", {
                                      token: token,
                                      name: data.name,
                                      products: data.products
                                  })}
                                  style={{
                                      backgroundColor: "#CCC",
                                      flex: 1,
                                      alignItems: "center",
                                      justifyContent: "center"
                                  }}
                              >
                                  <Icon active name="information-circle"/>
                              </Button>}
                          renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                              <Button
                                  full
                                  danger
                                  onPress={_ => this.deleteRow(secId, rowId, rowMap)}
                                  style={{
                                      flex: 1,
                                      alignItems: "center",
                                      justifyContent: "center"
                                  }}
                              >
                                  <Icon active name="trash"/>
                              </Button>}
                          leftOpenValue={75}
                          rightOpenValue={-75}
                    />
                </Content>
                <Button rounded
                        style={{ position: "absolute", bottom: 0, right: 0, margin: 20}}>
                    <IconNB name="md-add"/>
                </Button>
            </Container>
        );
    }
}

export default ShoppingList;
