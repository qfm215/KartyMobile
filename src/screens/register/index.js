import React, { Component } from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";

import { FormLabel, FormInput, Text, Button } from "react-native-elements";
import { ENDPOINT_REGISTER, makeAPIRequest } from "../../app/services/apiService";
import { simpleAlert } from "../../app/services/alertService";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPass: "",
      country: "",
      birthday: ""
    };
  }

  submit() {
    const { firstName, lastName, email, password, confirmPass, country, birthday } = this.state;

    const body = JSON.stringify({
      firstname: firstName,
      lastname: lastName,
      mail: email,
      password: password,
      confirmpass: confirmPass,
      country: country,
      birthday: birthday
    });

    makeAPIRequest(ENDPOINT_REGISTER, body)
      .then((responseJSON) => {
        if (responseJSON["opcode"] === 200) {
          simpleAlert("Registration successful !", "Check your emails to validate.", "OK");
          this.props.navigation.goBack();
        }
        else {
          if (responseJSON["message"] === "Missing field") {
            simpleAlert("Registration error", responseJSON["message"] + " : " + responseJSON["field"], "Try again");
          } else {
            simpleAlert("Registration error", responseJSON["message"], "Try again");
          }
        }
      }).catch((error) => {
      console.error(error);
    });
  }

  render() {
    const { firstName, lastName, email, password, confirmPass, country, birthday } = this.state;
    return (
      <ScrollView>
        <KeyboardAvoidingView behavior={"padding"} enabled>
          <Text>Register</Text>

          <FormLabel>First Name</FormLabel>
          <FormInput
            refInput={input => (this.firstNameInput = input)}
            value={firstName}
            onChangeText={firstName => this.setState({ firstName })}
            placeholder="First Name"
            returnKeyType="next"
          />

          <FormLabel>Last Name</FormLabel>
          <FormInput
            refInput={input => (this.lastNameInput = input)}
            value={lastName}
            onChangeText={lastName => this.setState({ lastName })}
            placeholder="Last Name"
            returnKeyType="next"
          />

          <FormLabel>Email</FormLabel>
          <FormInput
            refInput={input => (this.emailInput = input)}
            value={email}
            onChangeText={email => this.setState({ email })}
            placeholder="Email"
            returnKeyType="next"
          />

          <FormLabel>Password</FormLabel>
          <FormInput
            refInput={input => (this.passwordInput = input)}
            value={password}
            onChangeText={password => this.setState({ password })}
            placeholder="Password"
            returnKeyType="next"
            secureTextEntry
          />

          <FormLabel>Confirm Password</FormLabel>
          <FormInput
            refInput={input => (this.confirmPasswordInput = input)}
            value={confirmPass}
            onChangeText={confirmPass => this.setState({ confirmPass })}
            placeholder="Confirm Password"
            returnKeyType="next"
            secureTextEntry
          />

          <FormLabel>Country</FormLabel>
          <FormInput
            refInput={input => (this.countryInput = input)}
            value={country}
            onChangeText={country => this.setState({ country })}
            placeholder="Country"
            returnKeyType="next"
          />

          <FormLabel>Birthday (yyyy-mm-dd)</FormLabel>
          <FormInput
            refInput={input => (this.birthdayInput = input)}
            value={birthday}
            onChangeText={birthday => this.setState({ birthday })}
            placeholder="Birthday (yyyy-mm-dd)"
            returnKeyType="go"
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