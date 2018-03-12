import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { Container, Header, Icon, Content, Item, Input, Button, Text, Toast, Spinner, Left, Body, Right, Title } from 'native-base';
import { connect } from "react-redux"
import Midware from "../../Store/Middleware/patientMidware"

function mapStateToProps(state) {
    return { state }
}

function mapDispatchToProps(dispatch) {
    return {
        lougoutUser: () => {
            dispatch(Midware.Logout())
        }
    }
}

class Logout extends Component {


    static navigationOptions = {
        title : "Logout",
        
        drawerIcon:()=>{
            return (
                <Icon  name="ios-cog"/>
            )}
        
    }

    componentWillMount = () => {
        this.props.lougoutUser()
        this.props.navigation.navigate("LoginRoute")
        console.disableYellowBox= true
        
    }

    render() {
        return (
            <Container>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout) 