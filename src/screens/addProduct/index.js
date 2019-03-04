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
  Card,
  CardItem,
  Item,
  Label,
  Input,
} from "native-base";
import { ListView } from "react-native";

class AddProduct extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.name !== r2.name });
    this.state = {
        prodId: 0,
        listId: 0,
        token: null,
    };
  }

  CreateProduct(prodId, listId)
  {
    var theUrl = global.ip + "/api/v1/list/addProduct";
    var params = "productId=" + prodId + "&listId=" + listId;
    var request = async () => {
      var response = await fetch(theUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'token': this.state.token,
        },
        body: params
      });
      var json = await response.json();
      if (json.opcode == 200 && json.message == "OK")
      {
        this.props.navigation.goBack();
      }
      else
      {
        alert(json.message);
      }
    }
  
    request();
  }

  _addProduct = () => {
    this.CreateProduct(this.state.prodId, this.state.listId);
//    this.props.navigation.goBack();
  }

  render() {
    const { navigation } = this.props;
    if (this.state.token == null)
      this.state.token = navigation.getParam('token', 'NO-TOKEN');
    return (
      <Container style={{backgroundColor: "#FFF"}}>
        <Header searchBar rounded style={{backgroundColor: "red"}}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
          <Title>Add Product</Title>
          </Body>
        </Header>

        <Content>
        <Card style={{ marginLeft: 20, marginRight: 20, marginTop: 10}}>
            <CardItem>
                <Body>
                <Item fixedLabel>
                    <Label>Product Name</Label>
                    <Input ref={component => this._listId = component}
                            onChangeText={(listId) => this.setState({listId})} />
                </Item>
                <Item fixedLabel last>
                    <Label>Product Price</Label>
                    <Input
                        ref={component => this._prodId = component}
                        onChangeText={(prodId) => this.setState({prodId})} />
                </Item>
                <Button block onPress={this._addProduct} style={{ margin: 15, marginTop: 20, backgroundColor: "red" }}>
                    <Text>Add</Text>
                </Button>
                </Body>
            </CardItem>
            </Card>
        </Content>
      </Container>
    );
  }
}
export default AddProduct;