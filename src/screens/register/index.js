import React, { Component } from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";

import { ENDPOINT_REGISTER, makeAPIRequest } from "../../app/services/apiService";
import { simpleAlert } from "../../app/services/alertService";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Input,
} from "native-base";

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
      <Container>
        <Header>
          <Left>
            <Title>Register</Title>
          </Left>
          <Body/>
          <Right/>
        </Header>
        <Content>
          <ScrollView>
            <KeyboardAvoidingView behavior={"padding"} enabled>
              
              <Input
                refInput={input => (this.firstNameInput = input)}
                value={firstName}
                onChangeText={firstName => this.setState({ firstName })}
                placeholder="First Name"
                returnKeyType="next"
              />

              <Input
                refInput={input => (this.lastNameInput = input)}
                value={lastName}
                onChangeText={lastName => this.setState({ lastName })}
                placeholder="Last Name"
                returnKeyType="next"
              />

              <Input
                refInput={input => (this.emailInput = input)}
                value={email}
                onChangeText={email => this.setState({ email })}
                placeholder="Email"
                returnKeyType="next"
              />

              <Input
                refInput={input => (this.passwordInput = input)}
                value={password}
                onChangeText={password => this.setState({ password })}
                placeholder="Password"
                returnKeyType="next"
                secureTextEntry
              />

              <Input
                refInput={input => (this.confirmPasswordInput = input)}
                value={confirmPass}
                onChangeText={confirmPass => this.setState({ confirmPass })}
                placeholder="Confirm Password"
                returnKeyType="next"
                secureTextEntry
              />

              <Input
                refInput={input => (this.countryInput = input)}
                value={country}
                onChangeText={country => this.setState({ country })}
                placeholder="Country"
                returnKeyType="next"
              />

              <Input
                refInput={input => (this.birthdayInput = input)}
                value={birthday}
                onChangeText={birthday => this.setState({ birthday })}
                placeholder="Birthday (yyyy-mm-dd)"
                returnKeyType="go"
              />

            </KeyboardAvoidingView>
          </ScrollView>
        </Content>

        <Footer>
          <FooterTab>
            <Button onPress={this.submit.bind(this)} full>
              <Text>Submit registration</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}