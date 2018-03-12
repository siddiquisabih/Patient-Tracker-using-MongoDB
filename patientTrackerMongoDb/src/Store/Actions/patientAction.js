class Actions {


    static signup = "signup"
    static signupError = "signupError"
    static login = "login"
    static loginError = "loginError"

    static logout = "logout"


    static getData = "getData"
    static sendData = "sendData"
    static specificPatient = "specificPatient"
    static specificPatientByDate = "specificPatientByDate"


    static emptyData = "emptyData"


    static authentic = "authentic"
    static authenticError = "authenticError"

    




    static signupUser(value) {
        return {
            type: Actions.signup,
            data: value
        }
    }


    static signupUserError(message) {
        return {
            type: Actions.signupError,
            errorMessage: message
        }
    }


    static LoginUser(value) {
        return {

            type: Actions.login,
            data: value

        }
    }



    static LoginUserError(message) {
        return {
            type: Actions.loginError,
            errorMessage: message
        }
    }



    static Logout() {
        return {
            type: Actions.logout,
        }
    }


    static noData() {
        return {
            type: Actions.emptyData
        }
    }






    static getAllPatientData(value) {
        return {
            type: Actions.getData,
            data: value
        }
    }

    static sendDataToDataBase(value) {
        return {
            type: Actions.sendData,
            data: value
        }
    }

    static getSpecificPatient(value) {
        return {
            type: Actions.specificPatient,
            data: value
        }
    }

    static getSpecificPatientByDate(value) {
        return {
            type: Actions.specificPatientByDate,
            data: value
        }
    }



    static userAuthentic(value) {
        return {
            type: Actions.authentic,
            data: value
        }
    }


    static userAuthenticError() {
        return {
            type: Actions.authenticError
        }
    }



}
export default Actions