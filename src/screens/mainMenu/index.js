import React, { Component } from "react";
import { H2, Button, Text } from "native-base";
import { Col, Grid, Row } from "react-native-easy-grid";

import styles from "../home/styles";

export default class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.navigation.getParam("token"),
      username: this.props.navigation.getParam("username")
    };
  }

  _userInfo = () => {
    this.props.navigation.navigate("UserInfo", { token: this.state.token });
  };

  _shoppingList = () => {
    this.props.navigation.navigate("ShoppingList", { token: this.state.token });
  };

  render() {
    return (
      <Grid style={{ backgroundColor: "red", alignItems: "center" }}>
        <Row size={1} style={{ alignItems: "center" }}>
          <Col Style={{}} size={1}></Col>
          <H2>Welcome {this.state.username}</H2>
          <Col size={1}></Col>
        </Row>
        <Row size={10}>
          <Col size={1}></Col>
          <Col size={8} style={{ backgroundColor: "white", alignItems: "center" }}>
            <Row size={1}></Row>
            <Row size={2}>
              <Button onPress={this._userInfo} style={styles.secondaryButton}>
                <Text style={styles.actionText}>User informations</Text>
              </Button>
            </Row>
            <Row size={2}>
              <Button onPress={this._shoppingList} style={styles.secondaryButton}>
                <Text style={styles.actionText}>Shopping List</Text>
              </Button>
            </Row>
            <Row size={8}></Row>
          </Col>
          <Col size={1}></Col>
        </Row>
        <Row size={1}></Row>
      </Grid>
    );
  }
}