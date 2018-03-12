import AllPatientList from "../components/AllPatientList"
import { DrawerNavigator } from "react-navigation"
import DataEntry from "../components/CreatePatient"
import SearchByName from "../components/SearchByName"
import SearchByDate from "../components/SearchByDate"
import Signup from "../components/Auth/Signup"
import Login from "../components/Auth/Login"
import Splash from "../components/splash"
import Logout from "../components/Auth/logout"


const Drawer = DrawerNavigator({


    allPatienRoute: {
        screen: AllPatientList,
        
            
     
        
    },


    patientCreateRoute: {
        screen: DataEntry,
    },

    SearchByNameRoute: {
        screen: SearchByName
    },

    SearchByDateRoute: {
        screen: SearchByDate
    },

    lougoutRoute: { screen: Logout },

},

    {
        contentOptions: { activeTintColor: "green" },
    }

)




export default Drawer