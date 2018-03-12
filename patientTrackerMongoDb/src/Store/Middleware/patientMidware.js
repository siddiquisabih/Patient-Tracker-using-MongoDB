import Actions from "../Actions/patientAction"
import axios from "axios"
import { AsyncStorage } from "react-native"

const uid = ''
class Midware {

    static Signup(data) {
        return (dispatch) => {
            axios.post('https://patient-server.herokuapp.com/api/signup', data)
                .then((responce) => {
                    if (responce.data.error) {
                        dispatch(Actions.signupUserError(responce.data.error))
                    }
                    else {
                        uid = responce.data._id


                        AsyncStorage.setItem("auth", uid)
                            .then(() => {
                                dispatch(Actions.signupUser(uid))
                            })
                    }
                })
        }
    }

    static Login(data) {
        return (dispatch) => {
            axios.post('https://patient-server.herokuapp.com/api/login', data)
                .then((responce) => {
                    if (responce.data.error) {
                        dispatch(Actions.LoginUserError(responce.data.error))
                    }
                    else {

                        uid = responce.data._id

                        AsyncStorage.setItem("auth", uid)
                            .then(() => {
                                dispatch(Actions.LoginUser(uid))
                            })
                    }

                })
        }
    }

    static getAllPatients() {
        let allPatientData = []
        return (dispatch) => {
            axios.get(`https://patient-server.herokuapp.com/api/getAllPatient/${uid}`)
                .then((responce) => {
                    allPatientData = responce.data
                })
                .then(() => {
                    dispatch(Actions.getAllPatientData(allPatientData))
                })
        }
    }

    static SendDataToDatabase(data) {
        console.log(data, "data")
        var sentData = []
        sentData = data
        return (dispatch) => {
            axios.post('https://patient-server.herokuapp.com/api/createPatientProfile', data)
                .then(() => {
                })
                .then(() => {
                    dispatch(Actions.sendDataToDataBase(sentData))
                })
        }
    }


    static getSpecificPatientByName(name) {
        let specificPatient = []
        return (dispatch) => {
            axios.post(`https://patient-server.herokuapp.com/api/findPatientByName/${uid}`, name)
                .then((responce) => {
                    specificPatient = responce.data
                })
                .then(() => {
                    if (specificPatient[0] === undefined) {
                        dispatch(Actions.noData())
                    }
                    else{
                        dispatch(Actions.getSpecificPatient(specificPatient))
                    }




                })
        }
    }

    static getSpecificPatientByDate(date) {
        let specificPatient = []
        return (dispatch) => {
            axios.post(`https://patient-server.herokuapp.com/api/findPatientByDate/${uid}`, date)
                .then((responce) => {
                    specificPatient = responce.data
                })
                .then(() => {

                    if (specificPatient[0] === undefined) {
                        dispatch(Actions.noData())
                    }
                    else {
                        dispatch(Actions.getSpecificPatientByDate(specificPatient))

                    }
                })
        }
    }


    static checkingForAuthentication() {
        return (dispatch) => {
            AsyncStorage.getItem("auth")
                .then((responce) => {
                    if (responce) {
                        uid = responce
                        dispatch(Actions.userAuthentic(responce))
                    }
                    else {
                        dispatch(Actions.userAuthenticError())
                    }
                })
        }
    }

    static Logout() {
        return (dispatch) => {
            AsyncStorage.removeItem("auth").then(() => {
                dispatch(Actions.Logout())
            })
        }
    }
}

export default Midware