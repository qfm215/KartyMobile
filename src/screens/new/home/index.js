import React, { Component } from "react";
import { ImageBackground, View, StatusBar } from "react-native";
import { Container, Button, H1, Text, Right, Input, Item, Label, Content, Title, Header, Icon, Left, Body, Card, CardItem, Image } from "native-base";

import styles from "./styles";

const launchscreenBg = require("../../../assets/launchscreen-bg.png");
const launchscreenLogo = require("../../../assets/logo_karty.png");

global.ip = "zenemby.ddns.net";

class Home extends Component {

  state = {
    username: "",
    password: "",
    isLoggingIn: false,
    token: "",
    message: "",
    data: "",
  };
  
  setlist(response, i)
  {
    if (this.state.data != "")
      this.state.data += "--";
    this.state.data += JSON.stringify(response);
    if (i == 1)
    {
      const {navigate} = this.props.navigation;
      navigate("ShoppingList", {token: this.state.token, list: this.state.data});
    }
  }

  getlist(list)
  {
      var request = async () => {
        var theUrl = "http://" + global.ip + ":3000/api/v1/list?id="
        for (var i = 0; i < list.length; i++)
        {
          var response = await fetch(theUrl + list[i], {
            method: 'GET',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'token': this.state.token,
            },
          });
          var json = await response.json();
          if (json.opcode == 200 && json.message == "OK")  
            this.setlist(json, list.length - i);
        }
      }      
      request();
  }

  GetListUser()
  {
    var theUrl = "http://" + global.ip + ":3000/api/v1/list/user";
    var request = async () => {
      var response = await fetch(theUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'token': this.state.token,
        },
      });
      var json = await response.json();
      if (json.opcode == 200)
      {
        var list = json.list.toString().split(",");
        this.getlist(list);
      }
    }
  
    request();
  }
  
  GetToken(mail, password)
  {
      var theUrl = "http://" + global.ip + ":3000/api/v1/auth/authenticate";
      var params = "mail=" + mail + "&password=" + password;
      var request = async () => {
        var response = await fetch(theUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: params
        });
        var json = await response.json();
        if (json.opcode == 200 && json.message == "OK")
        {
          this.state.token = json.token;
          this.state.isLoggingIn = true;
          this.GetListUser();
        }
        else
        {
          alert(json.message);
        }
      }
    
      request();
  }

  _userLogin = () => {
    //this.GetToken("riadmegh@gmail.com", "aze");
    this.GetToken(this.state.username, this.state.password);
    this.clearPassword();
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
    const {navigate} = this.props.navigation;
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
                  <Text onPress={() => navigate("Submit")} style={{color: "blue", textDecorationLine: "underline"}}> register </Text>
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
