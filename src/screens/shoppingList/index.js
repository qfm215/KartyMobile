import React, { Component } from "react";
import { Text, Container, Header, Left, Button, Icon, Body, Right, Content, Title, ListItem, Badge, IconNB, Input, Item, View, SwipeRow, List} from "native-base";
import { ListView } from "react-native";

let datas = null;

class ShoppingList extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      token: null,
      data: "",
      basic: true,
      listViewData: []
    };
  }

  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }

    productList(data) {
        const { navigate } = this.props.navigation;
        navigate("ProductLoad", { token: this.state.token, data: data });
    }

  addList()
  {
      const { navigate } = this.props.navigation;
      navigate("AddList", { token: this.state.token });
  }

  render() {
    const { navigation } = this.props;
    this.state.token = navigation.getParam('token', 'NO-TOKEN');
    if (datas == null)
    {
      datas = [];
      var list = navigation.getParam('list', 'NO-LIST').split("--");
      for (i = 0; i < list.length; ++i)
      {
          datas.push(JSON.parse(list[i]));
      }
      this.state.listViewData = datas;
    }
//    this.GetListUser(token, this.getlist);
    return (
      <Container style={{backgroundColor: "#FFF"}}>
        <Header searchBar rounded style={{backgroundColor: "red"}}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
          <Title>ShoppingLists</Title>
          </Body>
          <Right>
            <Item>
              <Input placeholder="Search" />
              <Icon active name="search" />
            </Item>
          </Right>
        </Header>

        <Content >
          <ListItem itemDivider>
            <Text>Auchan</Text>
          </ListItem>
          <List style={{marginLeft: 20}}
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data =>
              <ListItem thumbnail onPress={() => this.productList(data)} >
                <Left>
                  <Text> {data.name} </Text>
                </Left>
                <Body/>
                <Right>
                  <Badge style={{backgroundColor: "grey"}}>
                    <Text>{data.total}</Text>
                  </Badge>
                </Right>
            </ListItem>}
            renderLeftHiddenRow={data =>
              <Button
                full
                onPress={() => this.getListProduct(data)}
                style={{
                  backgroundColor: "#CCC",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Icon active name="information-circle" />
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
                <Icon active name="trash" />
              </Button>}
            leftOpenValue={75}
            rightOpenValue={-75}
          />
        </Content>
        <Button onPress={_ => this.addList()} rounded style={{ backgroundColor: "#DD5144", position: "absolute", bottom: 0, right: 0, margin: 20}}>
          <IconNB name="md-add" />
        </Button>
      </Container>
    );
  }
}
export default ShoppingList;
