import React, { Component } from "react"
import { Spinner, Container, Content, Button, Header, Text, Input, Icon, Item, List, ListItem, Toast, Card, CardItem, Left, Right } from "native-base"
import { connect } from "react-redux"
import Midware from "../Store/Middleware/patientMidware"
import { StatusBar } from "react-native"


function mapStateToProps(state) {
    return {
        specificPatientData: state.Reducer.getSpecificPatientData,
        specificPatient: state.Reducer.getSpecificPatient,
        allPatientData: state.Reducer.getPatientData,
        allPatient: state.Reducer.getPatient,

    }
}

function mapDispatchToProps(dispatch) {
    return {
        getSpecificData: (name) => {
            dispatch(Midware.getSpecificPatientByName(name))
        }
    }
}

class SearchByName extends Component {

    static navigationOptions = {
        title: "Search By Name",
        drawerIcon: () => {
            return (
                <Icon name="ios-search" />
            )
        }

    }

    constructor() {
        super()
        this.state = {
            name: '',
            Patients: [],
            error: false,
            showToast: false,
        }
    }

    componentWillMount() {

        if (this.props.allPatient) {
            this.setState({ Patients: this.props.allPatientData })

        }
        console.disableYellowBox = true

    }

    componentWillReceiveProps(prop) {

        if (!prop.isEmpty) {
            this.setState({ Patients: prop.specificPatientData, error: false })
        }

        if (prop.isEmpty) {

            this.setState({ Patients: [], error: true })
        }
    }



    handleError() {

        if (this.state.Patients[0] === undefined) {
            return (
                <Container style={{ justifyContent: "center", alignItems: "center", backgroundColor: "#1B5E20" }}>
                    <Text style={{ color: "white" }}>No Record</Text>
                </Container>
            )
        }
    }



    renderData() {
        return <Content>
            {
                this.state.Patients.map((m, v) => {
                    return (
                        <Card
                            key={v}
                        >
                            <CardItem
                                style={{ backgroundColor: "#2E7D32" }}
                            >
                                <Left>
                                    <Text
                                        style={{ color: "white" }}
                                    >
                                        {m.name}
                                    </Text>
                                </Left>
                                <Text
                                    style={{ color: "white" }}
                                >
                                    {m.date}
                                </Text>

                                <Right>
                                    <Button transparent
                                        onPress={() => { this.props.navigation.navigate("ViewPatientRoute", { name: m.name, cost: m.cost, medication: m.medication_provided, date: m.date, disease: m.disease }) }}>
                                        <Text
                                            style={{ color: "orange" }}
                                        >View</Text></Button>
                                </Right>
                            </CardItem>
                        </Card>
                    )
                })
            }

        </Content>
    }

    searchDataByName() {
        if (this.state.name !== '') {
            this.props.getSpecificData({ name: this.state.name })
        }

        else {
            Toast.show({
                text: 'Enter Name',
                position: 'bottom',
                buttonText: 'Okay',
                type: "danger",
                duration: 2000,
            })

        }
    }

    render() {
        return (
            <Container>
                <Header searchBar
                    style={{ backgroundColor: "green" }}>
                    <StatusBar backgroundColor="black" />

                    <Item>
                        <Button
                            success
                            onPress={() => { this.props.navigation.navigate('DrawerOpen') }}>
                            <Icon name="menu" />
                        </Button>
                        <Icon name="ios-search" />
                        <Input placeholder="Search By Name"
                            onChangeText={(text) => this.setState({
                                name: text
                            })}
                        />
                        <Icon name="ios-people" />
                        <Button
                            success
                            onPress={this.searchDataByName.bind(this)}
                        >
                            <Text>Search</Text>
                        </Button>
                    </Item>
                </Header>

                {this.handleError()}

                <Container style={{ backgroundColor: "#1B5E20" }}>

                    {this.renderData()}

                </Container>

            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchByName)