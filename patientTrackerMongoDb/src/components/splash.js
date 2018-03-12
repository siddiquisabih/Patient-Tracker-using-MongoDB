import React, { Component } from 'react'
import { Image , StatusBar} from 'react-native'
import { Container, Spinner , Text } from "native-base"
import Midware from "../../src/Store/Middleware/patientMidware"
import { connect } from "react-redux"



function mapStateToProps(state) {
    return {
        authError: state.Reducer.userAuthError,
        userAuthentic: state.Reducer.userAuthentic
    }
}

function mapDispatchToProps(dispatch) {
    return {
        checkAuth: () => {
            dispatch(Midware.checkingForAuthentication())
        }
    }
}


class Splash extends Component {

    static navigationOptions = {
        header: false
    }

    constructor() {
        super()
        this.state = {
            error: false,
            validUser: false,
        }
    }


    componentWillReceiveProps(prop) {
        if (prop.authError) {
            this.setState({ error: true })
        }

        if (prop.userAuthentic) {
            this.setState({ validUser: true })
        }
    }


    componentWillMount() {
        // if (this.props.userAuthentic) {
        //     this.props.navigation.navigate("patientCreateRoute")
        // }

        this.props.checkAuth()
    setTimeout(() => { this.navigateUser() }, 2000)

    }



    navigateUser() {
        if (this.state.error) {
            this.props.navigation.navigate("LoginRoute")
        }

        if (this.state.validUser) {
            this.props.navigation.navigate("allPatienRoute")
        }
    }


    render() {
        return (
            <Image
                source={require("../images/main.jpg")}
                style={styles.imageBackground}
            >
            <StatusBar
                            backgroundColor="black" />
                <Container style={styles.spinner} >
                    <Spinner
                        color="red"
                    />

                </Container>
            </Image>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Splash)

const styles = {
    imageBackground: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: "cover"
    },
    spinner: {
        justifyContent: "center"
    }
}