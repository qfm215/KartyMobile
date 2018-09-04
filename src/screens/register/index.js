import React, { Component } from "react";
import { KeyboardAvoidingView, Image, ImageBackground, View, StatusBar, Alert } from "react-native";
import { Container, Button, H1, Text, Right, Input, Item, Label, Content, Title, Header, Icon, Left, Body, Card, CardItem } from "native-base";

import styles from "./styles.js";

const launchScreenLogo = require("../../../assets/logo_karty.png");

const ip = "192.168.43.7";

export default class Home extends Component {
  render() {
    return (
        <Container>
            <StatusBar barStyle="light-content" />
            <View style={styles.flexContainer}>
                <Content>
                    <KeyboardAvoidingView>
                        <Text>DFSDF</Text>
                    </KeyboardAvoidingView>
                </Content>
            </View>
        </Container>
    );
  }
}
