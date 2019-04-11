import React, { Component } from "react";

import { ENDPOINT_FORGOT_PASSWORD, makeAPIRequest } from "../../app/services/apiService";
import { simpleAlert } from "../../app/services/alertService";
import { Body, Container, Content, Footer, FooterTab, Header, Left, Right, Title, Text, Button, Input } from "native-base";

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      forgotPasswordMail: ""
    };
  }

  submit() {
    this.submitInfo();
  }

  submitInfo() {
    const forgotPasswordMail = this.state.forgotPasswordMail;

    if (!forgotPasswordMail) {
      simpleAlert("Error", "You need to enter your email address", "OK");
      return;
    }

    const body = JSON.stringify({
      mail: forgotPasswordMail
    });

    makeAPIRequest(ENDPOINT_FORGOT_PASSWORD, body)
      .then((responseJSON) => {
        if (responseJSON["opcode"] === 200) {
          simpleAlert("Success", "Check your emails to reset your password.", "OK");
        }
        else {
          simpleAlert("Password reset error", responseJSON.message, "Try again");
        }
      }).catch((error) => {
      console.error(error);
    });
  }

  render() {
    const { forgotPasswordMail } = this.state;

    return (
      <Container>
        <Header>
          <Left>
            <Title>Register</Title>
          </Left>
          <Body/>
          <Right/>
        </Header>

        <Content>
          <Input
            value={forgotPasswordMail}
            onChangeText={forgotPasswordMail => this.setState({ forgotPasswordMail })}
            placeholder="mail"
            returnKeyType="next"
          />
        </Content>

        <Footer>
          <FooterTab>
            <Button onPress={this.submit.bind(this)} full>
              <Text>Send password reset email</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}