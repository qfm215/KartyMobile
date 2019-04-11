import React, {Component} from "react";

import {ENDPOINT_CREATE_USER_BUDGET, makeAPIRequest} from "../../app/services/apiService";
import {simpleAlert} from "../../app/services/alertService";
import {
    Body,
    Container,
    Content,
    Footer,
    FooterTab,
    Header,
    Title,
    Input,
    Button,
    Text
} from "native-base";

export default class UserInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            description: "",
            total: ""
        };
    }

    submit() {
        const body = JSON.stringify({
            name: this.state.name,
            description: this.state.description,
            total: this.state.total
        });

        if (this.state.name && this.state.description && this.state.total) {
            makeAPIRequest(ENDPOINT_CREATE_USER_BUDGET, body)
                .then(() => {
                    this.props.navigation.getParam("onBack")();
                    this.props.navigation.goBack();
                }).catch((error) => {
                console.error(error);
            });
        } else {
            simpleAlert("Error", "All fields must be filled.", "OK");
        }
    }

    onTextChanged(text) {
        // code to remove non-numeric characters from text
        this.setState({total: text.replace(/[^0-9]/g, "")});
    }

    render() {
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>New budget</Title>
                    </Body>
                </Header>

                <Content>
                    <Input
                        value={this.state.name}
                        onChangeText={(name) => this.setState({name})}
                        placeholder="Budget name"
                        returnKeyType="next"
                    />

                    <Input
                        value={this.state.description}
                        onChangeText={(description) => this.setState({description})}
                        placeholder="Budget Description"
                        returnKeyType="next"
                    />

                    <Input
                        keyboardType='numeric'
                        onChangeText={(text) => this.onTextChanged(text)}
                        value={this.state.total}
                        placeholder="Budget Total"
                        returnKeyType="next"
                        maxLength={7}
                    />
                </Content>

                <Footer>
                    <FooterTab>
                        <Button onPress={this.submit.bind(this)} full>
                            <Text>Save new budget</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}
