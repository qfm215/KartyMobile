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

class AddList extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.name !== r2.name });
    this.state = {
        name: "",
        products: "",
        token: null,
    };
  }

  CreateList(name, products, total)
  {
    var theUrl = "http://" + global.ip + ":3000/api/v1/list/list";
    var params = "name=" + name + "&products=" + products + "&total=" + total.toString() + "&state=1";
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

  _addList = () => {
    this.CreateList(this.state.name, this.state.products, this.state.products.split(",").length);
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
          <Title>Add List</Title>
          </Body>
        </Header>

        <Content>
        <Card style={{ marginLeft: 20, marginRight: 20, marginTop: 10}}>
            <CardItem>
                <Body>
                <Item fixedLabel>
                    <Label>List Name</Label>
                    <Input ref={component => this._name = component}
                            onChangeText={(name) => this.setState({name})} />
                </Item>
                <Item fixedLabel last>
                    <Label>List Products</Label>
                    <Input
                        ref={component => this._products = component}
                        onChangeText={(products) => this.setState({products})} />
                </Item>
                <Button block onPress={this._addList} style={{ margin: 15, marginTop: 20, backgroundColor: "red" }}>
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
export default AddList;