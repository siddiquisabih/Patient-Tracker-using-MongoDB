import Actions from "../Actions/patientAction"

const initialState = {
    signup: false,
    signupError: false,
    userObjectId: '',
    signupErrorMessage: '',
    login: false,
    loginError: false,
    loginErrorMessage: '',
    logoutUser: false,
    getPatient: false,
    getPatientData: [],
    sendDataToDataBase: false,
    sentData: [],
    getSpecificPatient: false,
    getSpecificPatientData: [],
    getSpecificPatientByDate: false,
    getSpecificPatientDataByDate: [],
    dataEmpty: true
}


function Reducer(state = initialState, action) {
    switch (action.type) {

        case Actions.signup:
            return Object.assign({}, state, { signup: true, signupError: false, signupErrorMessage: '', userObjectId: action.data })

        case Actions.signupError:
            return Object.assign({}, state, { signup: false, signupError: true, signupErrorMessage: action.errorMessage })

        case Actions.login:
            return Object.assign({}, state, { login: true, loginError: false, loginErrorMessage: '', userObjectId: action.data })

        case Actions.loginError:
            return Object.assign({}, state, { login: false, loginError: true, loginErrorMessage: action.errorMessage })

        case Actions.getData:
            return Object.assign({}, state, { getPatient: true, getPatientData: action.data })

        case Actions.sendData:
            return Object.assign({}, state, { sendDataToDataBase: true, sentData: action.data })

        case Actions.specificPatient:
            return Object.assign({}, state, { getSpecificPatient: true, dataEmpty: false, getSpecificPatientData: action.data })

        case Actions.specificPatientByDate:
            return Object.assign({}, state, { getSpecificPatientByDate: true, dataEmpty: false, getSpecificPatientDataByDate: action.data })

        case Actions.emptyData:
            return Object.assign({}, state, { dataEmpty: true, getSpecificPatient: false, getSpecificPatientByDate: false, getSpecificPatientDataByDate: [], getSpecificPatientData: [] })

        case Actions.authentic:
            return Object.assign({}, state, { userObjectId: action.data, userAuthentic: true, userAuthError: false })

        case Actions.authenticError:
            return Object.assign({}, state, { userAuthError: true, userAuthentic: false, userObjectId: '' })

        case Actions.logout:
            return Object.assign({}, state, {
                signup: false, signupError: false, userObjectId: '', signupErrorMessage: '',
                login: false, loginError: false, loginErrorMessage: '', logoutUser: true, getPatient: false, getPatientData: [],
                sendDataToDataBase: false, sentData: [], getSpecificPatient: false, getSpecificPatientData: [], getSpecificPatientByDate: false,
                getSpecificPatientDataByDate: []
            })


        default:
            return state

    }
}

export default Reducer