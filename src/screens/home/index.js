import React, { Component } from "react";
import { ImageBackground, View, StatusBar } from "react-native";
import { Container, Button, H1, Text, Right, Input, Item, Label, Content, Title, Header, Icon, Left, Body, Card, CardItem } from "native-base";

import styles from "./styles";

const launchscreenBg = require("../../../assets/launchscreen-bg.png");
const launchscreenLogo = require("../../../assets/logo_karty.png");

const ip = "192.168.43.187";

class Home extends Component {

  state = {
    username: "",
    password: "",
    isLoggingIn: false,
    token: "",
    message: ""
  };
  
  handleToken(response, navigate) {
    values = JSON.parse(response);
    if (values["opcode"] == 200 && values["message"] == "OK")
    {
      navigate("ShoppingList", {token: values["token"]});
    }
    else
    {
      return 1;
    }
  }
  
  GetToken(mail, password, callback)
  {
      const {navigate} = this.props.navigation;
      var theUrl = "http://" + ip + ":3000/api/v1/auth/authenticate";
      var xmlHttp = new XMLHttpRequest();
      var params = "mail=" + mail + "&password=" + password;
      xmlHttp.open( "POST", theUrl, true ); // false for synchronous request
      xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
      xmlHttp.onreadystatechange = function() {
          if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
              callback(xmlHttp.responseText, navigate);
      }
      xmlHttp.send(params);
  }

  _userLogin = () => {
    this.clearPassword();
    this.GetToken("riadmegh@gmail.com", "bonjour", this.handleToken);
//    this.GetToken(this.state.username, this.state.password, this.handleToken);
};

  clearUsername = () => {
    this._username.setNativeProps({ text: "" });
    this.setState({ message: "" });
  };

  clearPassword = () => {
    this._password.setNativeProps({ text: "" });
    this.setState({ message: "" });
  };

  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <ImageBackground source={launchscreenBg} style={{flex: 1, width: null, height: null}}>
          <View style={{flex: 1, marginTop: 10, justifyContent: "center", alignItems: "center"}}>
            <ImageBackground source={launchscreenLogo} style={{width: 290, height: 130}} />
          </View>
          <Content>
            <Card style={{ marginLeft: 20, marginRight: 20 }}>
              <CardItem header>
                <H1 style={{marginLeft: 125}}>Sign in</H1>
              </CardItem>
              <CardItem>
                <Body>
                  <Item fixedLabel>
                    <Label>Username</Label>
                    <Input ref={component => this._username = component}
                              onChangeText={(username) => this.setState({username})} />
                  </Item>
                  <Item fixedLabel last>
                    <Label>Password</Label>
                    <Input secureTextEntry
                           ref={component => this._password = component}
                           onChangeText={(password) => this.setState({password})} />
                  </Item>
                  <Button block onPress={this._userLogin} style={{ margin: 15, marginTop: 20, backgroundColor: "red" }}>
                    <Text>Login</Text>
                  </Button>
                </Body>
              </CardItem>
              <CardItem style={{marginTop: -10}}>
                <Left>
                  <Text style={{color: "blue", textDecorationLine: "underline"}}> register </Text>
                </Left>
                <Right style={{flex: 1, marginRight: 10,}}>
                  <Text style={{color: "blue", textDecorationLine: "underline"}}> forgot your password ?</Text>
                </Right>
              </CardItem>
            </Card>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

export default Home;
