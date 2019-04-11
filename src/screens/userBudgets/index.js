import React, {Component} from "react";
import {
    Button,
    Text,
    Header,
    Left,
    Body,
    Title,
    Right,
    Content,
    Container,
    Footer,
    FooterTab,
    ListItem, Icon
} from "native-base";
import {FlatList} from "react-native";

import {ENDPOINT_GET_USER_BUDGETS, makeAPIRequest} from "../../app/services/apiService";

export default class UserBudgets extends Component {
    constructor(props) {
        super(props);

        this.state = {
            budgets: []
        };
        this.refresh();
    }

    _createUserBudget = () => {
        this.props.navigation.navigate("CreateUserBudget", {onBack: () => this.refresh()});
    };

    getUserBudgets() {
        return makeAPIRequest(ENDPOINT_GET_USER_BUDGETS)
            .then((responseJson) => {
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    refresh() {
        this.getUserBudgets().then((getUserBudgetsResponse) => {
            this.setState({budgets: getUserBudgetsResponse["budgets"]});
        });
    }

    render() {
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Your budgets</Title>
                    </Body>
                    <Right/>
                </Header>

                <Content>
                    <FlatList
                        style={{alignSelf: "stretch"}}
                        data={this.state.budgets}
                        renderItem={({item}) =>
                            <ListItem icon>
                                <Left>
                                    <Icon active name="cash"/>
                                </Left>
                                <Body>
                                    <Text>
                                        {"Nom: "}{item.name}{"\n"}
                                        {"Description: "}{item.description}{"\n"}
                                    </Text>
                                </Body>
                                <Right>
                                    <Text>
                                        {"Valeur: "}{item.total}{"€"}
                                    </Text>
                                </Right>
                            </ListItem>
                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
                </Content>

                <Footer>
                    <FooterTab>
                        <Button onPress={this._createUserBudget} full>
                            <Text>Add a budget</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}
