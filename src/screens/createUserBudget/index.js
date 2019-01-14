import React, { Component } from "react";
import { Alert, KeyboardAvoidingView, ScrollView } from "react-native";

import { FormLabel, FormInput, Text, Button } from "react-native-elements";

const apiAddress = "10.149.5.232";
const apiPort = "3000";

const postUserBudgetURL = "http://" + apiAddress + ":" + apiPort + "/api/v1/budgets/budget/";

export default class UserInfo extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const token = navigation.getParam("token");

    this.state = {
      token: token,
      name: "",
      description: "",
      total: ""
    };
  }

  submit() {
    console.log(this.state);
    if (this.state.name && this.state.description && this.state.total) {
      fetch(postUserBudgetURL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: this.state.token
        },
        body: JSON.stringify({
          name: this.state.name,
          description: this.state.description,
          total: this.state.total
        })
      }).then((response) => response.json())
        .then((responseJSON) => {
          console.log(responseJSON);
          this.props.navigation.getParam("onBack")();
          this.props.navigation.goBack();
        }).catch((error) => {
        console.log(error);
      });
    } else {
      UserInfo.popUp("Error", "All fields must be filled.", "OK");
    }
  }

  onTextChanged(text) {
    // code to remove non-numeric characters from text
    this.setState({ total: text.replace(/[^0-9]/g, "") });
  }

  render() {
    return (
      <ScrollView>
        <KeyboardAvoidingView behavior={"padding"} enabled>
          <Text>User Informations</Text>

          <FormLabel>First Name</FormLabel>
          <FormInput
            value={this.state.name}
            onChangeText={(name) => this.setState({ name })}
            placeholder="Budget name"
            returnKeyType="next"
          />

          <FormLabel>Last Name</FormLabel>
          <FormInput
            value={this.state.description}
            onChangeText={(description) => this.setState({ description })}
            placeholder="Budget Description"
            returnKeyType="next"
          />

          <FormLabel>Total</FormLabel>
          <FormInput
            keyboardType='numeric'
            onChangeText={(text) => this.onTextChanged(text)}
            value={this.state.total}
            placeholder="Budget Total"
            returnKeyType="next"
            maxLength={7}
          />

          <Button onPress={this.submit.bind(this)} title="submit">
            <Text>Submit</Text>
          </Button>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}