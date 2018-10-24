import React from "react";
import { Root } from "native-base";
import { StackNavigator, DrawerNavigator } from "react-navigation";


import Home from "./screens/home/";
import Submit from "./screens/home/submit";
import ShoppingList from "./screens/shoppingList/";
import AddList from "./screens/shoppingList/addList";
import ShoppingListShow from "./screens/shoppingList/show";
import AddProduct from "./screens/shoppingList/addProduct";

const AppNavigator = StackNavigator(
  {

    Home: { screen: Home },
    Submit: { screen: Submit },
    ShoppingList: { screen: ShoppingList },
    AddList: { screen: AddList },
    ShoppingListShow: { screen: ShoppingListShow },
    AddProduct: { screen: AddProduct },

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
