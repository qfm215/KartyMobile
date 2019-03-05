import React, { Component } from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";

import { FormLabel, FormInput, Text, Button } from "react-native-elements";
import { ENDPOINT_UPDATE_PASSWORD, makeAPIRequest } from "../../app/services/apiService";
import { simpleAlert } from "../../app/services/alertService";

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mail: "",
      password: "",
      confirmpass: ""
    };
  }

  submit() {
    this.submitInfo();
  }

  submitInfo() {
    const { mail, password, confirmpass } = this.state;

    if (!mail || !password || !confirmpass) {
      simpleAlert("Error", "You need to fill all fields", "OK");
      return;
    }

    const body = JSON.stringify({
      mail: mail,
      password: password,
      confirmpass: confirmpass
    });

    makeAPIRequest(ENDPOINT_UPDATE_PASSWORD, body)
      .then((responseJSON) => {
        if (responseJSON["opcode"] === 200) {
          simpleAlert("Success", "Check your emails to change your password.", "OK");
        }
        else {
          simpleAlert("Password change error", responseJSON.message, "Try again");
        }
      }).catch((error) => {
      console.error(error);
    });
  }

  render() {
    const { mail, password, confirmpass } = this.state;

    return (
      <ScrollView>
        <KeyboardAvoidingView behavior={"padding"} enabled>
          <Text>Password change</Text>

          <FormLabel>mail</FormLabel>
          <FormInput
            value={mail}
            onChangeText={mail => this.setState({ mail })}
            placeholder="mail"
            returnKeyType="next"
          />

          <FormLabel>Current password</FormLabel>
          <FormInput
            value={password}
            onChangeText={password => this.setState({ password })}
            placeholder="current password"
            returnKeyType="next"
            secureTextEntry
          />

          <FormLabel>Current password confirmation</FormLabel>
          <FormInput
            value={confirmpass}
            onChangeText={confirmpass => this.setState({ confirmpass })}
            placeholder="confirm current password"
            returnKeyType="next"
            secureTextEntry
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