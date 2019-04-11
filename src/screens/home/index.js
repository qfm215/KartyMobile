import React, { Component } from "react";

import {
  Button,
  Text,
  Input,
  Content,
  Body,
  Header, Title, Container, Footer, FooterTab
} from "native-base";

import { ENDPOINT_AUTHENTICATE, makeAPIRequest } from "../../app/services/apiService";
import { onSignIn } from "../../app/services/authService";
import { simpleAlert } from "../../app/services/alertService";

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
      <Container>
        <Header>
          <Body>
            <Title>Karty - Home</Title>
          </Body>
        </Header>

        <Content>
          <Input
            defaultValue="paul@belloc.ovh"
            onChangeText={(username) => this.setState({ username })}
            placeholder="Email" spellCheck={false}
            autoCorrect={false}/>
          <Input
            defaultValue="test"
            secureTextEntry
            onChangeText={(password) => this.setState({ password })}
            placeholder="Password"/>
          <Button block onPress={this._userLogin} >
            <Text>Login</Text>
          </Button>
        </Content>

        <Footer>
          <FooterTab>
            <Button onPress={this._register} full>
              <Text>Register</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button onPress={this._forgotPassword} full>
              <Text>Forgot Password</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
