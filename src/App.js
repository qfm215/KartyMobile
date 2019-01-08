import { StackNavigator } from "react-navigation";

import Home from "./screens/home/";
import Register from "./screens/register/";
import ShoppingList from "./screens/shoppingList/";
import ShoppingListShow from "./screens/shoppingList/show";
import UserInfo from './screens/userInfo/'
import MainMenu from './screens/mainMenu/'

const App = StackNavigator(
  {
    Home: { screen: Home },
    ShoppingList: { screen: ShoppingList },
    ShoppingListShow: { screen: ShoppingListShow },
    Register: { screen: Register },
    UserInfo: {screen: UserInfo },
    MainMenu: { screen: MainMenu }
  },
  {
    initialRouteName: "Home",
    headerMode: "none"
  }
);

export default App;
