import { StackNavigator } from "react-navigation";

import Home from "./screens/home/";
import Register from "./screens/register/";
import ShoppingList from "./screens/shoppingList/";
import ShoppingListShow from "./screens/shoppingList/show";
import UserInfo from './screens/userInfo/'
import MainMenu from './screens/mainMenu/'
import UserBudgets from './screens/userBudgets';
import CreateUserBudget from './screens/createUserBudget';
import ForgotPassword from './screens/forgotPassword';
import ChangePassword from './screens/changePassword';

const App = StackNavigator(
  {
    Home: { screen: Home },
    ShoppingList: { screen: ShoppingList },
    ShoppingListShow: { screen: ShoppingListShow },
    Register: { screen: Register },
    UserInfo: {screen: UserInfo },
    UserBudgets: {screen: UserBudgets },
    CreateUserBudget: {screen: CreateUserBudget },
    MainMenu: { screen: MainMenu },
    ForgotPassword: { screen: ForgotPassword },
    ChangePassword: { screen: ChangePassword },
  },
  {
    initialRouteName: "Home",
    headerMode: "none",
    cardStyle: {
      backgroundColor: "#ffffff"
    },
  },
);

export default App;
