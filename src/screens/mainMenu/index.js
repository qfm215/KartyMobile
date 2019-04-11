import React, { Component } from "react";
import {
  Button,
  Text,
  Header,
  Left,
  Title,
  Body,
  Right,
  Container,
  List,
  ListItem,
  Content,
  Footer,
  FooterTab,
  Icon
} from "native-base";
import { NavigationActions } from "react-navigation";

import { getMail, onSignOut } from "../../app/services/authService";

export default class MainMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mail: ""
    };

    getMail().then((mail) => this.setState({
      mail: mail
    }));
  }

  _userInfo = () => {
    this.props.navigation.navigate("UserInfo");
  };

  _shoppingList = () => {
    this.props.navigation.navigate("ShoppingList");
  };

  _userBudgets = () => {
    this.props.navigation.navigate("UserBudgets");
  };

  _changePassword = () => {
    this.props.navigation.navigate("ChangePassword");
  };

  _disconnect = () => {
    onSignOut();
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: "Home" })
      ]
    });

    this.props.navigation.dispatch(resetAction);
  };

  render() {
    return (
      <Container>
        <Header>
          <Left/>
          <Body style={{ flex: 3, flexDirection: "row", justifyContent: "center" }}>
          <Title>Welcome {this.state.mail}</Title>
          </Body>
          <Right/>
        </Header>

        <Content>
          <ListItem onPress={this._userInfo} icon>
            <Left>
              <Button>
                <Icon active name="information"/>
              </Button>
            </Left>
            <Body>
            <Text>User informations</Text>
            </Body>
          </ListItem>

          <ListItem onPress={this._shoppingList} icon>
            <Left>
              <Button>
                <Icon active name="shopping-cart" type="Entypo"/>
              </Button>
            </Left>
            <Body>
            <Text>Shopping list</Text>
            </Body>
          </ListItem>

          <ListItem onPress={this._userBudgets} icon>
            <Left>
              <Button>
                <Icon active name="dollar" type="FontAwesome"/>
              </Button>
            </Left>
            <Body>
            <Text>Manage budgets</Text>
            </Body>
          </ListItem>

          <ListItem onPress={this._changePassword} icon>
            <Left>
              <Button>
                <Icon active name="security" type="MaterialCommunityIcons"/>
              </Button>
            </Left>
            <Body>
            <Text>Change password</Text>
            </Body>
          </ListItem>
        </Content>

        <Footer>
          <FooterTab>
            <Button onPress={this._disconnect} full>
              <Text>Disconnect</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}