import React from "react";
import { Root } from "native-base";
import { StackNavigator } from "react-navigation";


import Home from "./screens/home/";
import Register from "./screens/register/";
import ShoppingList from "./screens/shoppingList/";
import ShoppingListShow from "./screens/shoppingList/show";
import UserInfo from './screens/userInfo/'

const AppNavigator = StackNavigator(
  {

    Home: { screen: Home },
    ShoppingList: { screen: ShoppingList },
    ShoppingListShow: { screen: ShoppingListShow },
    Register: { screen: Register },
    UserInfo: {screen: UserInfo}
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
