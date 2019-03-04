import React, { Component } from "react";
import { Text, Container, Header, Left, Button, Icon, Body, Right, Title, Input, Item, Image, Thumbnail} from "native-base";
import styles from "./styles.js";

class ListLoad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      data: "",
    };
  }

    setlist(response, i) {
        if (this.state.data != "")
            this.state.data += "--";
        this.state.data += JSON.stringify(response);

        if (i == 1) {
            const { replace } = this.props.navigation;
            replace("ShoppingList", { token: this.state.token, list: this.state.data });
        }
    }

    getlist(list) {
        var request = async () => {
            var theUrl = global.ip + "/api/v1/list?id="
            for (var i = 0; i < list.length; i++) {
                var response = await fetch(theUrl + list[i].id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'token': this.state.token,
                    },
                });
                var json = await response.json();
                if (json.opcode == 200 && json.message == "OK")
                    this.setlist(json, list.length - i);
            }
        }
        request();
    }

    GetListUser() {
        var theUrl = global.ip + "/api/v1/list/user";
        var request = async () => {
            var response = await fetch(theUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'token': this.state.token,
                },
            });
            var json = await response.json();
            if (json.opcode == 200) {
                var list = json.list;
                this.getlist(list);
            }
        }

        request();
    }

    render() {

    const { navigation } = this.props;
    this.state.token = navigation.getParam('token', 'NO-TOKEN');
    this.GetListUser();

    return (
      <Container style={{backgroundColor: "#FFF"}}>
        <Header searchBar rounded style={{backgroundColor: "red"}}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
          <Title>ShoppingLists</Title>
          </Body>
          <Right>
            <Item>
              <Input placeholder="Search" />
              <Icon active name="search" />
            </Item>
          </Right>
        </Header>

        <Container style={styles.loadingContainer}>
            <Thumbnail square source={ require("../../../assets/loading.gif")} />
        </Container>

      </Container>
    );
  }
}
export default ListLoad;
