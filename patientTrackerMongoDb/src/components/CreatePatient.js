import React, { Component } from "react"
import { Container, Content, Button, Form, Text, Input, Label, Item, Header, Left, Body, Right, Icon, Title, Toast } from "native-base"
import { AsyncStorage } from "react-native"
import DatePicker from "react-native-datepicker"
import Midware from "../Store/Middleware/patientMidware"
import { connect } from "react-redux"
import { StatusBar } from "react-native"

function mapStateToProps(state) {
    return {
        sendDataState: state,
        uid: state.Reducer.userObjectId
    }
}

function mapDispatchToProps(dispatch) {
    return {
        sendData: (data) => {
            dispatch(Midware.SendDataToDatabase(data))
        }
    }
}

class DataEntry extends Component {
    static navigationOptions = {
        title: "Create Patient",
        drawerIcon: () => {
            return (
                <Icon name="ios-create" />
            )
        }
    }

    constructor() {
        super()
        this.state = {
            name: '',
            disease: '',
            medication: '',
            cost: '',
            date: '',
            showToast: false
        }
    }

    componentWillMount() {
        const date = new Date().getDate()
        const month = new Date().getMonth()
        const year = new Date().getFullYear()
        if (month <= 8) {
            const newDate = `${year}-0${month + 1}-${date}`
            this.setState({ date: newDate })
        }
        if (month >= 9) {
            const newDate = `${year}-${month + 1}-${date}`
            this.setState({ date: newDate })
        }
        console.disableYellowBox = true

    }



    saveData() {

        var data = {
            name: this.state.name,
            disease: this.state.disease,
            medication_provided: this.state.medication,
            cost: this.state.cost,
            date: this.state.date,
            uid_id: this.props.uid
        }
        if (data.uid_id != '' && data.name != '' && data.disease != '' && data.medication_provided != '' && data.cost != '' && data.date != undefined) {
            this.props.sendData(data)

            this.setState({
                name: '',
                disease: '',
                medication: '',
                cost: '',
                date: ''
            })

            Toast.show({
                text: 'Patient Added',
                position: 'bottom',
                buttonText: 'Ok',
                type: "success",
                duration: 1000
            })

        }
        else {
            Toast.show({
                text: 'Fill All Boxes',
                position: 'bottom',
                buttonText: 'Ok',
                type: "success",
                duration: 1000
            })
        }

    }
    render() {

        return (
            <Container
                style={{ backgroundColor: "#1B5E20" }}>

                <Header
                    style={{ backgroundColor: "green" }}>
                    
                    <StatusBar backgroundColor="black" />

                    <Left>
                        <Button transparent
                            onPress={() => { this.props.navigation.navigate('DrawerOpen') }}
                        >
                            <Icon name='ios-menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Create Patient</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Form>

                        <Item floatingLabel>
                            <Icon name="ios-person-outline" />
                            <Label style={{ color: "white" }}>Name</Label>
                            <Input
                                onChangeText={(text) => this.setState({
                                    name: text
                                })}
                                value={this.state.name}
                            />
                        </Item>

                        <Item floatingLabel>
                            <Icon name="ios-aperture-outline" />
                            <Label style={{ color: "white" }}>Disease</Label>
                            <Input
                                onChangeText={(text) => this.setState({
                                    disease: text
                                })}
                                value={this.state.disease}

                            />
                        </Item>

                        <Item floatingLabel>
                            <Icon name="ios-medkit-outline" />
                            <Label style={{ color: "white" }}>Medicine</Label>
                            <Input
                                onChangeText={(text) => this.setState({
                                    medication: text
                                })}
                                value={this.state.medication} />
                        </Item>

                        <Item floatingLabel >
                            <Icon name="logo-usd" />
                            <Label style={{ color: "white" }}>Cost</Label>
                            <Input
                                onChangeText={(text) => this.setState({
                                    cost: text
                                })}
                                keyboardType="phone-pad"
                                value={this.state.cost} />
                        </Item>

                        <Item style={styles.buttonStyle}>
                            <Button
                                onPress={this.saveData.bind(this)}
                                success
                            >
                                <Text>
                                    Save
                           </Text>
                            </Button>
                        </Item>

                    </Form>
                </Content>
            </Container>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DataEntry)

const styles = {
    buttonStyle: {
        justifyContent: 'center',
        borderBottomWidth: 0,
        marginTop: 30
    },

    line: {
        marginTop: 30
    }
}