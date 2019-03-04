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

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
        username: "paul.belloc@protonmail.com",
        password: "test",
        isLoggingIn: false,
        data: "",
        token: "",
    };
  }

    GetToken(mail, password) {
        var theUrl = global.ip + "/api/v1/auth/authenticate";
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
            if (json.opcode == 200 && json.message == "OK") {
                this.state.token = json.token;
                const { navigate } = this.props.navigation;
                navigate("ListLoad", {token : this.state.token});
            }
            else {
                this.state.isLoggingIn = false;
                alert(json.message);
            }
        }

        request();
    }

    _userLogin = () => {
        if (this.state.isLoggingIn) {
            return;
        }
        this.state.isLoggingIn = true;
        this.GetToken("riadmegh@gmail.com", "aze");
        //this.GetToken(this.state.username, this.state.password);
    };

  _register = () => {
    console.log("register clicked");
    const { navigate } = this.props.navigation;
    navigate("Register");
  };

  render() {
    return (
      <Grid style={{ backgroundColor: "red" }}>
        <Row size={2}></Row>
        <Row size={6}>
          <Col size={1}></Col>
          <Col size={4}>
            <Image style={styles.logo} source={launchScreenLogo}
                   resizeMode="contain"
                   style={{ flex: 1, height: undefined, width: undefined }}/>
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
                        ref={component => this._username = component}
                        onChangeText={(username) => this.setState({ username })}
                        placeholder="Username" spellCheck={false}
                        autoCorrect={false}/>
                    </Item>
                    <Item fixedLabel last>
                      <Input
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
                      <Button onPress={this._forgot} style={styles.secondaryButton}>
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
