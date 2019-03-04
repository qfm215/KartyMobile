import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Thumbnail,
  Left,
  Body,
  Right,
  CheckBox,
  Badge,
  IconNB,
  Alert
} from "native-base";
import { ListView } from "react-native";

let productsdatas = null;

class ShoppingListShow extends Component {

  toggleSwitch(index) {
    productsdatas[index].done = !productsdatas[index].done;
    this.setState({ listViewData: productsdatas });
  }

  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }

  addProduct()
  {
    const {navigate} = this.props.navigation;
      navigate("AddProduct", { token: this.state.token});
  }

  goBack() {
      productsdatas = null;
//      const { navigate } = this.props.navigation;
    this.props.navigation.goBack();
  }

  printInfos(data)
  {
    Alert.alert(data.name + " infos", "Number of " + data.name + " in store : " + data.stores);
  }

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.name !== r2.name });
    this.state = {
      basic: true,
      listViewData: productsdatas,
      token: null,
      listName: "",
    };
  }

  render() {
    const { navigation } = this.props;
    if (this.state.token == null)
      this.state.token = navigation.getParam('token', 'NO-TOKEN');
    if (productsdatas == null)
    {
      this.state.listName = navigation.getParam('listName', 'NO-LISTNAME');
      productsdatas = [];
      var products = navigation.getParam('products', 'NO-LIST').split("--");
      for (i = 0; i < products.length; ++i)
      {
        productsdatas.push(JSON.parse(products[i]));
        productsdatas[i].done = false;
      }
      this.state.listViewData = productsdatas;
    }
    return (
      <Container style={{backgroundColor: "#FFF"}}>
        <Header searchBar rounded style={{backgroundColor: "red"}}>
          <Left>
            <Button transparent onPress={() => this.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
          <Title>ShoppingList</Title>
          </Body>
        </Header>

        <Content>
          <ListItem itemDivider>
            <Text>{this.state.listName}</Text>
          </ListItem>
          <List style={{marginLeft: 20}}
                dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                renderRow={(data, sectionID, rowID) =>
            <ListItem thumbnail onPress={_ => alert("Number of " + data.name + " in store : " + data.stores)}>
              <Left>
                <Thumbnail square size={55} source={{uri: data.image}} />
              </Left>
              <Body>
              <Text>
                {data.name}
              </Text>
              <Text numberOfLines={1} note>
                {data.categories}
              </Text>
              </Body>
              <Right>
                <Badge success>
                  <Text> {data.price} $</Text>
                </Badge>
                <CheckBox
                  checked={data.done}
                  onPress={() => this.toggleSwitch(rowID)}
                />
              </Right>
            </ListItem>}
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
            rightOpenValue={-75}
          />
        </Content>
        <Button onPress={_ => this.addProduct()} rounded style={{ backgroundColor: "#DD5144", position: "absolute", bottom: 0, right: 0, margin: 20}}>
          <IconNB name="md-add" />
        </Button>
      </Container>
    );
  }
}
export default ShoppingListShow;
