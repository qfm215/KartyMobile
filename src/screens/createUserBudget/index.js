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
      description: ""
    };
  }

  static popUp(name, text, buttonText) {
    Alert.alert(
      name,
      text,
      [
        { text: buttonText }
      ],
      { cancelable: false }
    );
  }

  submit() {
    const { name, description } = this.state;

    fetch(postUserBudgetURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: this.state.token
      },
      body: JSON.stringify({
        name: name,
        description: description
      })
    }).then((response) => response.json())
      .then((responseJSON) => {
        console.log(responseJSON);
      }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    const { name, description } = this.state;

    return (
      <ScrollView>
        <KeyboardAvoidingView behavior={"padding"} enabled>
          <Text>User Informations</Text>

          <FormLabel>First Name</FormLabel>
          <FormInput
            value={name}
            onChangeText={name => this.setState({ name })}
            placeholder="Budget name"
            returnKeyType="next"
          />

          <FormLabel>Last Name</FormLabel>
          <FormInput
            value={description}
            onChangeText={description => this.setState({ description })}
            placeholder="Budget Description"
            returnKeyType="next"
          />

          <Button
            onPress={this.submit.bind(this)}
            name={"Submit"}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}