import React, { Component } from "react";
import { H2, Button, Text } from "native-base";
import { Col, Grid, Row } from "react-native-easy-grid";
import { NavigationActions } from "react-navigation";

import styles from "../home/styles";
import { getMail, onSignOut } from "../../app/services/authService";

export default class MainMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mail: "",
    };

    getMail().then((mail) => this.setState({
      mail: mail
    }));
  }

  _userInfo = () => {
    this.props.navigation.navigate("UserInfo");
  };

  _shoppingList = () => {
    this.props.navigation.navigate("ShoppingList");
  };

  _userBudgets = () => {
    this.props.navigation.navigate("UserBudgets");
  };

  _changePassword = () => {
    this.props.navigation.navigate("ChangePassword");
  };

  _disconnect = () => {
    onSignOut();
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: "Home" })
      ]
    });

    this.props.navigation.dispatch(resetAction);
  };

  render() {
    return (
      <Grid style={{ backgroundColor: "red", alignItems: "center" }}>
        <Row size={1} style={{ alignItems: "center" }}>
          <Col Style={{}} size={1}></Col>
          <H2>Welcome {this.state.mail}</H2>
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
            <Row size={2}>
              <Button onPress={this._userBudgets} style={styles.secondaryButton}>
                <Text style={styles.actionText}>Budgets</Text>
              </Button>
            </Row>
            <Row size={2}>
              <Button onPress={this._changePassword} style={styles.secondaryButton}>
                <Text style={styles.actionText}>Change password</Text>
              </Button>
            </Row>
            <Row size={2}>
              <Button onPress={this._disconnect} style={styles.secondaryButton}>
                <Text style={styles.actionText}>Disconnect</Text>
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