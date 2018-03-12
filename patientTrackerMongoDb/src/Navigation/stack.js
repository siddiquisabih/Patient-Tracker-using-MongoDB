import { StackNavigator } from "react-navigation"
import Signup from "../components/Auth/Signup"
import Login from "../components/Auth/Login"
import Splash from "../components/splash"
import Drawer from "./Drawer"
import ViewPatient from "../components/viewPatient"
const Stack = StackNavigator({


    SplashRoute: {
        screen: Splash
    },

    LoginRoute: {
        screen: Login
    },
    DrawerRoute: {
        screen: Drawer,
        navigationOptions: props => ({
            header: false,
        })
    },

    SignupRoute: {
        screen: Signup
    },

    ViewPatientRoute: {
        screen: ViewPatient
    },


})

export default Stack