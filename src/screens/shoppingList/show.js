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
  IconNB
} from "native-base";
import { ListView } from "react-native";

const ip = "192.168.43.187";

const bread = require("../../../assets/food/bread.png");
const chocolate = require("../../../assets/food/chocolate.png");
const steak = require("../../../assets/food/steak.png");
const milk = require("../../../assets/food/milk.png");
const cookie = require("../../../assets/food/cookie.png");
const chicken = require("../../../assets/food/chicken.png");
const fries = require("../../../assets/food/fries.png");
const cheese = require("../../../assets/food/cheese.png");

let datas = [
  {
    img: bread,
    name: "Bread",
    note: "Family Pack",
    price: 2.10,
    done: false
  },
  {
    img: chocolate,
    name: "Chocolate",
    note: "Bio Chocolate",
    price: 2.10,
    done: false
  },
  {
    img: steak,
    name: "Steak",
    note: "100% meat",
    price: 2.10,
    done: false
  },
  {
    img: milk,
    name: "Milk",
    note: "Viva",
    price: 2.10,
    done: false
  },
  {
    img: cookie,
    name: "Cookie",
    note: "White Chocolate",
    price: 2.10,
    done: false
  },
  {
    img: chicken,
    name: "Chicken",
    note: "Best Chicken EU",
    price: 2.10,
    done: false
  },
  {
    img: fries,
    name: "Fries",
    note: "McCain",
    price: 2.10,
    done: false
  },
  {
    img: cheese,
    name: "Cheese",
    note: "Made in France",
    price: 2.10,
    done: false
  },
];

class ShoppingListShow extends Component {

  toggleSwitch(index) {
    datas[index].done = !datas[index].done;
    this.setState({listViewData: datas});
  }

  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.name !== r2.name });
    this.state = {
      basic: true,
      listViewData: datas
    };
  }

  setproduct(response)
  {
      values = JSON.parse(response);
      if (values["opcode"] == 200 && values["message"] == "OK")
      {
          datas += values;
      }
      else
          return 1;
  }
  
  GetProduct(token, id, callback)
  {
    var theUrl = "http://" + ip + ":3000/api/v1/product?id=" + id;
    var xmlHttp = new XMLHttpRequest();
    var params = "mail=" + mail + "&password=" + password;
    xmlHttp.open( "GET", theUrl, true ); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    xmlHttp.setRequestHeader("token", token);
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.send(params);
  }

  getListProduct(token, products)
  {
      if (token != "")
      {
          prods = products.split(";");
          for (var i = 0; i < prods.length; i++)
              this.GetProduct(token, prods[i], this.setproduct);
      }
      return (1)
  }

  render() {
    const { navigation } = this.props;
    token = navigation.getParam('token', 'NO-TOKEN');
    products = navigation.getParam('products', 'NO-LIST');
    this.getListProduct(token, products);
    return (
      <Container>
        <Header searchBar rounded>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
          <Title>ShoppingList</Title>
          </Body>
        </Header>

        <Content>
          <List style={{marginLeft: 20}}
                dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                renderRow={(data, sectionID, rowID) =>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square size={55} source={data.img} />
              </Left>
              <Body>
              <Text>
                {data.text}
              </Text>
              <Text numberOfLines={1} note>
                {data.note}
              </Text>
              </Body>
              <Right>
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
        <Button rounded style={{ position: "absolute", bottom: 0, right: 0, margin: 20}}>
          <IconNB name="md-add" />
        </Button>
      </Container>
    );
  }
}
export default ShoppingListShow;
