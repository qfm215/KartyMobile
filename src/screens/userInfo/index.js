import React, {Component} from "react";

import {
    ENDPOINT_GET_USER_INFO,
    ENDPOINT_UPDATE_USER_INFO,
    ENDPOINT_UPDATE_USER_MAIL,
    makeAPIRequest
} from "../../app/services/apiService";
import {simpleAlert} from "../../app/services/alertService";
import {Body, Container, Content, Footer, FooterTab, Header, Title, Input, Button, Text} from "native-base";

export default class UserInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            mail: "",
            country: "",
            birthday: ""
        };

        this.getUserInfo().then((userInfo) => {
            if (userInfo) {
                this.setState(userInfo);
            }
        });
    }

    getUserInfo() {
        return makeAPIRequest(ENDPOINT_GET_USER_INFO)
            .then((responseJson) => {
                console.log(responseJson);
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
                return null;
            });
    }

    submit() {
        this.submitInfo();
    }

    submitInfo() {
        const {firstName, lastName, country, birthday, mail} = this.state;

        if (!(firstName && lastName && country && birthday && mail)) {
            simpleAlert("Error", "All fields must be filled.", "OK");
            return;
        }

        const body = JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            country: country,
            birthday: birthday
        });

        makeAPIRequest(ENDPOINT_UPDATE_USER_INFO, body)
            .then((responseJSON) => {
                if (responseJSON["opcode"] === 200)
                    this.submitMail(mail);
                else {
                    simpleAlert("Update informations error", responseJSON.message + ": " + responseJSON.field, "Try again");
                }
            }).catch((error) => {
            console.error(error);
        });
    }

    submitMail(mail) {
        const body = JSON.stringify({
            mail: mail
        });

        makeAPIRequest(ENDPOINT_UPDATE_USER_MAIL, body)
            .then((responseJSON) => {
                if (responseJSON["opcode"] === 200) {
                    simpleAlert("Update successful !", null, "OK");
                    this.props.navigation.goBack();
                } else {
                    simpleAlert("Update mail error", responseJSON.message + ": " + responseJSON.field, "Try again");
                }
            }).catch((error) => {
            console.error(error);
        });
    }

    render() {
        const {firstName, lastName, mail, country, birthday} = this.state;

        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Personal informations</Title>
                    </Body>
                </Header>

                <Content>
                    <Input
                        value={firstName}
                        onChangeText={firstName => this.setState({firstName})}
                        placeholder="First Name"
                        returnKeyType="next"
                    />

                    <Input
                        value={lastName}
                        onChangeText={lastName => this.setState({lastName})}
                        placeholder="Last Name"
                        returnKeyType="next"
                    />

                    <Input
                        value={mail}
                        onChangeText={mail => this.setState({mail})}
                        placeholder="mail"
                        returnKeyType="next"
                    />

                    <Input
                        value={country}
                        onChangeText={country => this.setState({country})}
                        placeholder="Country"
                        returnKeyType="next"
                    />

                    <Input
                        value={birthday}
                        onChangeText={birthday => this.setState({birthday})}
                        placeholder="Birthday (yyyy-mm-dd)"
                        returnKeyType="go"
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
