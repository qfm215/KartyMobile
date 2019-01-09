import React, { Component } from "react";
import { H2, Button, Text } from "native-base";
import { Col, Grid, Row } from "react-native-easy-grid";
import { FlatList } from "react-native";

import styles from "../home/styles";

const apiAddress = "10.149.5.232";
const apiPort = "3000";
const getUserBudgetsURL = "http://" + apiAddress + ":" + apiPort + "/api/v1/budgets/user/";


export default class UserBudgets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.navigation.getParam("token")
    };

    this.getUserBudgets(this.state.token).then((getUserBudgetsResponse) => {
      this.setState({ budgets: getUserBudgetsResponse["budgets"] });
    });
  }

  _createUserBudget = () => {
    this.props.navigation.navigate("CreateUserBudget", { token: this.state.token });
  }

  getUserBudgets(token) {
    return fetch(getUserBudgetsURL, {
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

  render() {
    return (
      <Grid style={{ backgroundColor: "red", alignItems: "center" }}>
        <Row size={1} style={{ alignItems: "center" }}>
          <Col Style={{}} size={1}></Col>
          <H2>Budgets</H2>
          <Col size={1}></Col>
        </Row>
        <Row size={10}>
          <Col size={1}></Col>
          <Col size={8} style={{ backgroundColor: "white" }}>
            <Button onPress={this._createUserBudget} style={styles.secondaryButton}>
              <Text style={styles.actionText}>Create a new budget</Text>
            </Button>
            <FlatList
              style={{ alignSelf: "stretch" }}
              data={this.state.budgets}
              renderItem={({ item }) =>
                <Text style={{ paddingBottom: 20, textAlign: "center" }}>
                  {item.name}{"\n"}
                  {item.description}{"\n"}
                  {item.total}{"€"}
                </Text>
              }
              keyExtractor={(item, index) => index.toString()}
            />
          </Col>
          <Col size={1}></Col>
        </Row>
        <Row size={1}></Row>
      </Grid>
    );
  }
}