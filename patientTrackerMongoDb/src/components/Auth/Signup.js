import React, { Component } from 'react'
import { StatusBar, Image } from 'react-native'
import { Container, Header, Icon, Content, Item, Input, Button, Text, Toast, Spinner, Left, Body, Right, Title } from 'native-base';
import { connect } from "react-redux"
import Midware from "../../Store/Middleware/patientMidware"

function mapStateToProps(state) {
    return {
        componentState: state,
        isSignup: state.Reducer.signup,
        isError: state.Reducer.signupError,
        errorMessage: state.Reducer.signupErrorMessage

    }
}

function mapDispatchToProps(dispatch) {
    return {
        signupUser: (data) => {
            dispatch(Midware.Signup(data))
        }
    }
}

class Signup extends Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: '',
            name: "",
            showToast: false,
            loading: false,

        }
    }

    static navigationOptions = {
        header: false
    }

    componentWillReceiveProps(prop) {
        if (prop.isError) {
            this.setState({ loading: false })
        }
        if (prop.isSignup) {
            prop.navigation.navigate("allPatienRoute")
        }
    }
    componentWillMount() {
        console.disableYellowBox = true

    }

    signup() {
        const userEmailAndPassword = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        if (userEmailAndPassword.email !== '' && userEmailAndPassword.name !== '' && userEmailAndPassword.password !== '') {
            this.props.signupUser(userEmailAndPassword)
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
            <Button
                success
                onPress={this.signup.bind(this)}>
                <Text>Signup</Text>
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
                source={require("../../images/doc.jpg")}>
                <Container>
                    <Header style={{ backgroundColor: "green" }}  >
                        <StatusBar
                            backgroundColor="black" />
                        <Left >
                            <Button transparent
                                onPress={() => this.props.navigation.navigate("LoginRoute")}
                            >

                                <Icon name="arrow-back" />
                            </Button>


                        </Left>
                        <Body>
                            <Title>SIGNUP</Title>
                        </Body>
                        <Right />
                    </Header>
                    <Container style={style.containerStyle}>
                        <Content>
                            <Item>

                                <Icon name='ios-contact-outline' />

                                <Input placeholder='Name' placeholderTextColor="green"
                                    onChangeText={(text) => { this.setState({ name: text }) }}
                                    value={this.state.name} />
                            </Item>
                            <Item >
                                <Icon name='ios-at-outline' />
                                <Input placeholder='Email Or UserName' placeholderTextColor="green"
                                    onChangeText={(text) => { this.setState({ email: text }) }}
                                    value={this.state.email} />
                            </Item>
                            <Item>
                                <Icon name='ios-key-outline' />
                                <Input placeholder='Password' secureTextEntry placeholderTextColor="green"
                                    onChangeText={(text) => { this.setState({ password: text }) }}
                                    value={this.state.password} />
                            </Item >
                            {this.handleSpinner()}
                            {this.handleError()}
                        </Content>
                    </Container>
                </Container>
            </Image>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup)

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