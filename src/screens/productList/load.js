import React, { Component } from "react";
import { Text, Container, Header, Left, Button, Icon, Body, Title, Image, Thumbnail} from "native-base";
import styles from "./styles.js";

class ProductLoad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      data: "",
    };
  }

    setproduct(response, listName, i) {
        if (this.state.data != "")
            this.state.data += "--";
        this.state.data += JSON.stringify(response);
        if (i == 1) {
            const { replace } = this.props.navigation;
            replace("ProductList", { token: this.state.token, listName: listName, products: this.state.data });
        }
    }

    GetProduct(prods, listName) {
        var theUrl = global.ip + "/api/v1/product?id=";
        var request = async () => {
            for (var i = 0; i < prods.length; i++) {
                var response = await fetch(theUrl + prods[i].id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'token': this.state.token,
                    },
                });
                var json = await response.json();
                if (json.opcode == 200 && json.message == "OK") {
                    //          alert(JSON.stringify(json))
                    this.setproduct(json, listName, prods.length - i);
                }
            }
        }

        request();
    }

    getListProduct(data) {
        this.state.data = [];
        //    this.props.navigation.navigate("ShoppingListShow", {name: data.name, products: data.products});
        if (this.state.token != "") {
            var prods = data.products;
            this.GetProduct(prods, data.name);
        }
    }

    goBack() {
        //      const { navigate } = this.props.navigation;
        this.props.navigation.goBack();
    }

    render() {

    const { navigation } = this.props;
    this.state.token = navigation.getParam('token', 'NO-TOKEN');
    var data = navigation.getParam('data', null);
    this.getListProduct(data);

    return (
      <Container style={{backgroundColor: "#FFF"}}>
        <Header searchBar rounded style={{ backgroundColor: "red" }}>
            <Left>
                <Button transparent onPress={() => this.goBack()}>
                    <Icon name="arrow-back" />
                </Button>
            </Left>
            <Body>
                <Title>ShoppingList</Title>
            </Body>
        </Header>

        <Container style={styles.loadingContainer}>
            <Thumbnail square source={ require("../../../assets/loading.gif")} />
        </Container>

      </Container>
    );
  }
}
export default ProductLoad;
