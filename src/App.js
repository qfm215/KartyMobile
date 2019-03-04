import React from "react";
import { Root } from "native-base";
import { StackNavigator } from "react-navigation";

//global.ip = "https://api.archri.ovh";
global.ip = "http://192.168.0.7:3000";

import Home from "./screens/home/";
import Register from "./screens/register/";
import ListLoad from "./screens/shoppingList/load";
import ProductLoad from "./screens/productList/load";
import ShoppingList from "./screens/shoppingList/";
import AddList from "./screens/addList/";
import ProductList from "./screens/productList/";
import AddProduct from "./screens/addProduct/";
import UserInfo from './screens/userInfo/'

const AppNavigator = StackNavigator(
  {

    Home: { screen: Home },
    ShoppingList: { screen: ShoppingList },
    AddList: { screen: AddList },
    ProductList: { screen: ProductList },
    AddProduct: { screen: AddProduct },
    Register: { screen: Register },
    UserInfo: { screen: UserInfo },
    ListLoad: { screen: ListLoad},
    ProductLoad: { screen: ProductLoad},
  },
  {
    initialRouteName: "Home",
    headerMode: "none"
  }
);

export default () =>
  <Root>
    <AppNavigator />
  </Root>;
