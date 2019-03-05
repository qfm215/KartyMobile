import React, { Component } from "react";
import { Alert, KeyboardAvoidingView, ScrollView } from "react-native";

import { FormLabel, FormInput, Text, Button } from "react-native-elements";

const apiAddress = "10.149.5.232";
const apiPort = "3000";

const resetPasswordURL = "http://" + apiAddress + ":" + apiPort + "/api/v1/users/changepassword";

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mail: "",
    };
  }

  submit() {
    this.submitInfo();
  }

  submitInfo() {
    const { mail } = this.state;

    if (!mail) {
      resetPasswordURL.popUp("Error", "You need to enter your email address", "OK");
      return;
    }

    fetch(resetPasswordURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: this.state.token
      },
      body: JSON.stringify({
        mail: mail,
      })
    }).then((response) => response.json())
      .then((responseJSON) => {
        console.log(responseJSON);
        if (responseJSON.opcode == 200) {
          ForgotPassword.popUp("Success", "Check your emails to reset your password.", "OK");
        }
        else {
          ForgotPassword.popUp("Password reset error", responseJSON.message + ": " + responseJSON.field, "Try again");
        }
      }).catch((error) => {
      console.log(error);
    });
  }

  static popUp(title, text, buttonText) {
    Alert.alert(
      title,
      text,
      [
        { text: buttonText }
      ],
      { cancelable: false }
    );
  }

  render() {
    const { mail } = this.state;

    return (
      <ScrollView>
        <KeyboardAvoidingView behavior={"padding"} enabled>
          <Text>Password reset</Text>

          <FormLabel>mail</FormLabel>
          <FormInput
            value={mail}
            onChangeText={mail => this.setState({ mail })}
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