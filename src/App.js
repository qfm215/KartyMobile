import React from "react";
import { Root } from "native-base";
import { StackNavigator, DrawerNavigator } from "react-navigation";


import Home from "./screens/home/";
import ShoppingList from "./screens/shoppingList/";
import ShoppingListShow from "./screens/shoppingList/show";

const AppNavigator = StackNavigator(
  {

    Home: { screen: Home },
    ShoppingList: { screen: ShoppingList },
    ShoppingListShow: { screen: ShoppingListShow },

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
