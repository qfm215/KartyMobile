import React, { Component } from "react";
import { ImageBackground, View, StatusBar } from "react-native";
import { Container, Button, H1, Text, Right, Input, Item, Label, Content, Title, Header, Icon, Left, Body, Card, CardItem } from "native-base";

import styles from "./styles";

const launchscreenBg = require("../../../assets/launchscreen-bg.png");
const launchscreenLogo = require("../../../assets/logo_karty.png");

class Submit extends Component {

  state = {
    firstname: "",
    lastname: "",
    mail: "",
    password: "",
    confirm: "",
    country: "",
    birthday: "",
    message: "",
    token: "",
  };

  CreateUser(firstname, lastname, mail, password, confirm, country, birthday)
  {
      var theUrl = "http://" + global.ip + ":3000/api/v1/users";
      var params = "firstname=" + firstname + "&lastname=" + lastname + "&mail=" + mail + "&password=" + password + "&confirmpass=" + confirm + "&country=" + country + "&birthday=" + birthday;
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
            this.props.navigation.goBack();
        }
        else
        {
            alert(json.message);
//            this.setState({message: json["message"]});
        }
      }
    
      request();
  }

  _userSubmit = () => {
    this.CreateUser(this.state.firstname, this.state.lastname, this.state.mail, this.state.password, this.state.confirm, this.state.country, this.state.birthday);
    this.clearPassword();
    this.clearConfirm();
};

  clearUsername = () => {
    this._username.setNativeProps({ text: "" });
    this.setState({ message: "" });
  };

  clearPassword = () => {
    this._password.setNativeProps({ text: "" });
    this.setState({ message: "" });
  };

  clearConfirm = () => {
    this._confirm.setNativeProps({ text: "" });
    this.setState({ message: "" });
  };

  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <ImageBackground source={launchscreenBg} style={{flex: 1, width: null, height: null}}>
        <Header searchBar rounded style={{backgroundColor: "transparent"}}>
            <Left>
                <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back" />
                </Button>
            </Left>
            </Header>
          <Content>
            <Card style={{ marginLeft: 20, marginRight: 20, marginTop: 10}}>
              <CardItem header>
                <H1 style={{marginLeft: 125}}>Submit</H1>
              </CardItem>
              <CardItem>
                <Body>
                  <Item fixedLabel>
                    <Label>Firstname</Label>
                    <Input ref={component => this._firstname = component}
                            onChangeText={(firstname) => this.setState({firstname})} />
                  </Item>
                  <Item fixedLabel>
                    <Label>Lastname</Label>
                    <Input ref={component => this._lastname = component}
                            onChangeText={(lastname) => this.setState({lastname})} />
                  </Item>
                  <Item fixedLabel>
                    <Label>Mail</Label>
                    <Input ref={component => this._mail = component}
                            onChangeText={(mail) => this.setState({mail})} />
                  </Item>                  
                  <Item fixedLabel last>
                    <Label>Password</Label>
                    <Input secureTextEntry
                           ref={component => this._password = component}
                           onChangeText={(password) => this.setState({password})} />
                  </Item>
                  <Item fixedLabel last>
                    <Label>Confirm Password</Label>
                    <Input secureTextEntry
                           ref={component => this._confirm = component}
                           onChangeText={(confirm) => this.setState({confirm})} />
                  </Item>
                  <Item fixedLabel>
                    <Label>Country</Label>
                    <Input ref={component => this._country = component}
                            onChangeText={(country) => this.setState({country})} />
                  </Item>
                  <Item fixedLabel>
                    <Label>Birthday</Label>
                    <Input ref={component => this._birthday = component}
                            onChangeText={(birthday) => this.setState({birthday})} />
                  </Item>
                  <Button block onPress={this._userSubmit} style={{ margin: 15, marginTop: 20, marginBottom: 40, backgroundColor: "red" }}>
                    <Text>Submit</Text>
                  </Button>
                </Body>
              </CardItem>
              <CardItem style={{marginTop: -10}}>
                <Right style={{flex: 1, marginRight: 10,}}>
                  <Text style={{color: "white"}}>{this.state.message}</Text>
                </Right>
              </CardItem>
            </Card>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

export default Submit;
