import React, {Component} from "react";

import {ENDPOINT_UPDATE_PASSWORD, makeAPIRequest} from "../../app/services/apiService";
import {simpleAlert} from "../../app/services/alertService";
import {Body, Container, Content, Footer, FooterTab, Header, Title, Text, Button, Input} from "native-base";

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
        const {mail, password, confirmpass} = this.state;

        if (!mail || !password || !confirmpass) {
            simpleAlert("Error", "You need to fill all fields", "OK");
            return;
        }

        const body = JSON.stringify({
            mail: mail,
            password: password,
            confirmpass: password
        });

        makeAPIRequest(ENDPOINT_UPDATE_PASSWORD, body)
            .then((responseJSON) => {
                if (responseJSON["opcode"] === 200) {
                    simpleAlert("Success", "Check your emails to change your password.", "OK");
                } else {
                    simpleAlert("Password change error", responseJSON.message, "Try again");
                }
            }).catch((error) => {
            console.error(error);
        });
    }

    render() {
        const {mail, password, confirmpass} = this.state;

        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Reset password</Title>
                    </Body>
                </Header>

                <Content>
                    <Input
                        value={mail}
                        onChangeText={mail => this.setState({mail})}
                        placeholder="mail"
                        returnKeyType="next"
                    />

                    <Input
                        value={password}
                        onChangeText={password => this.setState({password})}
                        placeholder="current password"
                        returnKeyType="next"
                        secureTextEntry
                    />

                    <Input
                        value={confirmpass}
                        onChangeText={confirmpass => this.setState({confirmpass})}
                        placeholder="confirm current password"
                        returnKeyType="next"
                        secureTextEntry
                    />
                </Content>

                <Footer>
                    <FooterTab>
                        <Button onPress={this.submit.bind(this)} full>
                            <Text>Save</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}
