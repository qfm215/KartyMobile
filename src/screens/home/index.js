import React, { Component } from "react";

import { KeyboardAvoidingView, Image } from "react-native";
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
import { ENDPOINT_AUTHENTICATE, makeAPIRequest } from "../../app/services/apiService";
import { onSignIn } from "../../app/services/authService";
import { simpleAlert } from "../../app/services/alertService";

const launchScreenLogo = require("../../../assets/logo_karty.png");

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "paul@belloc.ovh",
      password: "test"
    };
  }

  _userLogin = async () => {
    const body = JSON.stringify({
      mail: this.state.username,
      password: this.state.password
    });

    makeAPIRequest(ENDPOINT_AUTHENTICATE, body).then((responseJson) => {
      if (responseJson["status"] === "200") {
        onSignIn(responseJson["token"], this.state.username).then(() => {
          this.props.navigation.navigate("MainMenu");
        });
      } else if (responseJson["status"] === "400") {
        simpleAlert("Login error", "Wrong credentials.", "OK");
      }
    }).catch((error) => {
      console.error(error);
      simpleAlert("Login error", "Unexpected error. Check service availability.", "OK");
    });
  };

  _register = () => {
    this.props.navigation.navigate("Register");
  };

  _forgotPassword = () => {
    this.props.navigation.navigate("ForgotPassword");
  };

  render() {
    return (
      <Grid style={{ backgroundColor: "red" }}>
        <Row size={2}></Row>
        <Row size={6}>
          <Col size={1}></Col>
          <Col size={4}>
            <Image style={{ flex: 1, height: undefined, width: undefined }} source={launchScreenLogo}
                   resizeMode="contain"/>
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
