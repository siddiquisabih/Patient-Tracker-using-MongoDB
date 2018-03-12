import React, { Component } from 'react'
import { StatusBar, Image, BackHandler } from 'react-native'
import { Container, Header, Icon, Content, Item, Input, Button, Text, Toast, Spinner, Left, Body, Right, Title } from 'native-base';
import { connect } from "react-redux"
import Midware from "../../Store/Middleware/patientMidware"

function mapStateToProps(state) {
    return {
        componentState: state,
        isLogin: state.Reducer.login,
        isError: state.Reducer.loginError,
        errorMessage: state.Reducer.loginErrorMessage,

    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginUser: (data) => {
            dispatch(Midware.Login(data))
        }

    }
}

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            showToast: false,
            loading: false,
        }
    }

    static navigationOptions = {
        header: false
    }

    componentWillMount() {
        console.disableYellowBox= true
        BackHandler.addEventListener('backPress'
    ,
    ()=>{
        BackHandler.exitApp()
    }
    );


    }

    componentWillUnmount() {
        BackHandler.removeEventListener('backPress');
      }
    componentWillReceiveProps(prop) {
        if (prop.isError) {
            this.setState({ loading: false })
        }

        if (prop.isLogin) {
            prop.navigation.navigate("allPatienRoute")
        }


    }

    Login() {
        const userEmailAndPassword = {
            email: this.state.email,
            password: this.state.password
        }
        if (userEmailAndPassword.email !== '' && userEmailAndPassword.password !== '') {

            this.props.loginUser(userEmailAndPassword)
            this.setState({ loading: true })
        }
        else {
            Toast.show({
                text: 'Fill All Boxes!',
                position: 'bottom',
                buttonText: 'Okay',
                type: "danger",
                duration: 1000
            })
        }
    }

    handleError() {
        if (this.props.isError) {
            return <Text note style={style.errorText}>{this.props.errorMessage}</Text>
        }
    }

    handleSpinner() {
        if (this.state.loading) {
            return <Spinner />
        }
        return <Item style={style.buttonStyle}>

            <Button success onPress={this.Login.bind(this)}>
                <Text>Login</Text>
            </Button>
        </Item>
    }



    render() {
        return (

            <Image
                style={{
                    flex: 1,
                    width: null,
                    height: null,
                    resizeMode: "cover"
                }}
                source={require("../../images/doc.jpg")}
            >

                <Container>
                    <Header style={{ backgroundColor: "green" }}  >
                        <StatusBar
                            backgroundColor="black" />
                        <Left />
                        <Body>
                            <Title>Authentication</Title>
                        </Body>
                        <Right />
                    </Header>



                    <Container style={style.containerStyle}>
                        <Content>

                            <Item >
                            <Icon name='ios-at-outline' />


                                <Input placeholder='Email Or UserName' placeholderTextColor="green"
                                    onChangeText={(text) => { this.setState({ email: text }) }}
                                    value={this.state.email} 
                                    />

                            </Item>

                            <Item>
                            <Icon name='ios-key-outline' />

                                <Input placeholder='Password' secureTextEntry placeholderTextColor="green"
                                    onChangeText={(text) => { this.setState({ password: text }) }}
                                    value={this.state.password} />
                            </Item >

                            {this.handleSpinner()}
                            {this.handleError()}

                            <Button
                                danger
                                transparent
                                onPress={() => { this.props.navigation.navigate("SignupRoute") }}
                            ><Text>No Account? Signup</Text></Button>




                        </Content>
                    </Container>
                </Container>
            </Image>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
const style = {
    buttonStyle: {
        justifyContent: 'center',
        borderBottomWidth: 0,
        marginTop: 30
    },
    containerStyle: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 200,
    },
    errorText: {
        color: "red",
        textAlign: "center",
        marginTop: 15,
    },
}