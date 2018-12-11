import React, { Component } from "react";
import { Alert, KeyboardAvoidingView, ScrollView } from "react-native";

import { FormLabel, FormInput, Text, Button } from "react-native-elements";

const apiAddress = "10.149.5.232";
const apiPort = "3000";

const getUserInfoURL = "http://" + apiAddress + ":" + apiPort + "/api/v1/users/";
const updateUserInfoURL = "http://" + apiAddress + ":" + apiPort + "/api/v1/users/";
const updateUserMailURL = "http://" + apiAddress + ":" + apiPort + "/api/v1/users/changemail";

export default class UserInfo extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const token = navigation.getParam("token");

    this.state = {
      token: token,
      firstName: "",
      lastName: "",
      mail: "",
      country: "",
      birthday: ""
    };

    this.getUserInfo(token).then((userInfo) => {
      this.setState(userInfo);
      console.log('LOG THE STATE IN THEN: ', this.state);
    });
  }

  getUserInfo(token) {
    return fetch(getUserInfoURL, {
      method: "GET",
      headers: {
        token: token
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        console.debug(responseJson);
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  submit() {
    this.submitInfo();
  }

  submitInfo() {
    const { firstName, lastName, country, birthday } = this.state;

    fetch(updateUserInfoURL, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: this.state.token
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        country: country,
        birthday: birthday
      })
    }).then((response) => response.json())
      .then((responseJSON) => {
        console.log(responseJSON);
        if (responseJSON.opcode == 200)
          this.submitMail();
        else {
          UserInfo.popUp("Update informations error", responseJSON.message + ": " + responseJSON.field, "Try again");
        }
      }).catch((error) => {
      console.log(error);
    });
  }

  submitMail() {
    const { mail } = this.state;

    fetch(updateUserMailURL, {
      method: "PUT",
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
        if (responseJSON.opcode == 200)
          UserInfo.popUp("Update successful !", null, "OK");
        else {
          UserInfo.popUp("Update mail error", responseJSON.message + ": " + responseJSON.field, "Try again");
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
    const { firstName, lastName, mail,   country, birthday } = this.state;

    return (
      <ScrollView>
        <KeyboardAvoidingView behavior={"padding"} enabled>
          <Text>User Informations</Text>

          <FormLabel>First Name</FormLabel>
          <FormInput
            value={firstName}
            onChangeText={firstName => this.setState({ firstName })}
            placeholder="First Name"
            returnKeyType="next"
          />

          <FormLabel>Last Name</FormLabel>
          <FormInput
            value={lastName}
            onChangeText={lastName => this.setState({ lastName })}
            placeholder="Last Name"
            returnKeyType="next"
          />

          <FormLabel>mail</FormLabel>
          <FormInput
            value={mail}
            onChangeText={mail => this.setState({ mail })}
            placeholder="mail"
            returnKeyType="next"
          />

          {/*<FormLabel>Password</FormLabel>*/}
          {/*<FormInput*/}
            {/*value={password}*/}
            {/*onChangeText={password => this.setState({ password })}*/}
            {/*placeholder="Password"*/}
            {/*returnKeyType="next"*/}
            {/*secureTextEntry*/}
          {/*/>*/}

          {/*<FormLabel>Confirm Password</FormLabel>*/}
          {/*<FormInput*/}
            {/*value={confirmPassword}*/}
            {/*onChangeText={confirmPassword => this.setState({ confirmPassword })}*/}
            {/*placeholder="Confirm Password"*/}
            {/*returnKeyType="next"*/}
            {/*secureTextEntry*/}
          {/*/>*/}

          <FormLabel>Country</FormLabel>
          <FormInput
            value={country}
            onChangeText={country => this.setState({ country })}
            placeholder="Country"
            returnKeyType="next"
          />

          <FormLabel>Birthday (yyyy-mm-dd)</FormLabel>
          <FormInput
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