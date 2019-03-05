import React, { Component } from "react";
import { Alert, KeyboardAvoidingView, ScrollView } from "react-native";

import { FormLabel, FormInput, Text, Button } from "react-native-elements";
import { ENDPOINT_FORGOT_PASSWORD, getRouteForgotPassword, makeAPIRequest } from "../../app/services/apiService";
import { getToken } from "../../app/services/authService";
import { simpleAlert } from "../../app/services/alertService";

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
      <ScrollView>
        <KeyboardAvoidingView behavior={"padding"} enabled>
          <Text>Password reset</Text>

          <FormLabel>mail</FormLabel>
          <FormInput
            value={forgotPasswordMail}
            onChangeText={forgotPasswordMail => this.setState({ forgotPasswordMail })}
            placeholder="mail"
            returnKeyType="next"
          />

          <Button
            onPress={this.submit.bind(this)}
            title={"Submit"}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}