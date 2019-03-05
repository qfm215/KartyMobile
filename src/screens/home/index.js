import React, { Component } from "react";

import { KeyboardAvoidingView, Image, Alert } from "react-native";
import {
  Button,
  H1,
  Text,
  Right,
  Input,
  Item,
  Content,
  Left,
  Body,
  Card,
  CardItem
} from "native-base";

import styles from "./styles.js";
import { Col, Grid, Row } from "react-native-easy-grid";

const launchScreenLogo = require("../../../assets/logo_karty.png");

const ip = "10.149.5.232";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "paul@belloc.ovh",
      password: "test"
    };
  }

  handleToken(response, navigate, mail) {
    const values = JSON.parse(response);
    if (values["opcode"] == 200 && values["message"] == "OK") {
      navigate("MainMenu", { token: values["token"], username: mail });
    }
  }

  GetToken(mail, password, callback) {
    const { navigate } = this.props.navigation;
    var theUrl = "http://" + ip + ":3000/api/v1/auth/authenticate";
    var xmlHttp = new XMLHttpRequest();
    var params = "mail=" + mail + "&password=" + password;
    xmlHttp.open("POST", theUrl, true); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText, navigate, mail);
      if (xmlHttp.readyState == 4 && xmlHttp.status != 200) {
        Alert.alert(
          "Login Error",
          "Invalid credentials.",
          [
            { text: "OK", onPress: () => console.log("Login Error Invalid Credentials: OK pressed.") }
          ],
          { cancelable: false }
        );
      }
    };

    xmlHttp.send(params);
  }

  _userLogin = () => {
    this.GetToken(this.state.username, this.state.password, this.handleToken);
  };

  _register = () => {
    const { navigate } = this.props.navigation;
    navigate("Register");
  };

  _forgotPassword = () => {
    const { navigate } = this.props.navigation;
    navigate("ForgotPassword");
  };

  render() {
    return (
      <Grid style={{ backgroundColor: "red" }}>
        <Row size={2}></Row>
        <Row size={6}>
          <Col size={1}></Col>
          <Col size={4}>
            <Image style={{ flex: 1, height: undefined, width: undefined }} source={launchScreenLogo} resizeMode="contain" />
          </Col>
          <Col size={1}></Col>
        </Row>
        <Row size={2}></Row>
        <Row size={20}>
          <Col size={1}></Col>
          <Col size={10}>
            <Content>
              <KeyboardAvoidingView>
                <Card>
                  <CardItem style={{ justifyContent: "center", alignItems: "center" }} header>
                    <H1>Sign in</H1>
                  </CardItem>
                  <CardItem>
                    <Body>
                    <Item fixedLabel>
                      <Input
                        defaultValue="paul@belloc.ovh"
                        ref={component => this._username = component}
                        onChangeText={(username) => this.setState({ username })}
                        placeholder="Username" spellCheck={false}
                        autoCorrect={false}/>
                    </Item>
                    <Item fixedLabel last>
                      <Input
                        defaultValue="test"
                        secureTextEntry
                        ref={component => this._password = component}
                        onChangeText={(password) => this.setState({ password })}
                        placeholder="Password"/>
                    </Item>
                    <Button block onPress={this._userLogin} style={styles.actionButton}>
                      <Text>Login</Text>
                    </Button>
                    </Body>
                  </CardItem>
                  <CardItem>
                    <Left>
                      <Button onPress={this._register} style={styles.secondaryButton}>
                        <Text style={styles.actionText}>Register</Text>
                      </Button>
                    </Left>
                    <Right>
                      <Button onPress={this._forgotPassword} style={styles.secondaryButton}>
                        <Text style={styles.actionText}>Forgot !</Text>
                      </Button>
                    </Right>
                  </CardItem>
                </Card>
              </KeyboardAvoidingView>
            </Content>
          </Col>
          <Col size={1}></Col>
        </Row>
      </Grid>
    );
  }
}
