import React, { Component } from "react"
import { Content, Container, Text, Button, Spinner, Header, Left, Body, Right, Icon, Title, List, ListItem, Card, CardItem } from "native-base"
import { connect } from "react-redux"
import Midware from "../Store/Middleware/patientMidware"
import { StatusBar } from "react-native"

function mapStateToProps(state) {
    return {
        ComponentState: state.Reducer.getPatientData,
        getPatient: state.Reducer.getPatient

    }
}


function mapDispatchToProps(dispatch) {
    return {

        getDataFromDB: () => {
            dispatch(Midware.getAllPatients())
        }

    }
}

class AllPatientList extends Component {
    static navigationOptions = {
        title: 'All Patient',
        drawerIcon: () => {
            return (
                <Icon name="ios-people" />
            )
        }

    }

    constructor() {
        super()
        this.state = {
            error: true
        }
    }

    renderMethod() {
        if (this.props.getPatient === false) {
            return <Spinner />
        }
        return (<Content>
            {
                this.props.ComponentState.map((m, v) => {
                    return (
                        <Card key={v}>
                            <CardItem style={{ backgroundColor: "#2E7D32" }} >
                                <Left>
                                    <Text style={{ color: "white" }}>
                                        {m.name}
                                    </Text>
                                </Left>
                                <Text style={{ color: "white" }}>
                                    {m.date}
                                </Text>
                                <Right>
                                    <Button transparent onPress={() => { this.props.navigation.navigate("ViewPatientRoute", { name: m.name, cost: m.cost, medication: m.medication_provided, date: m.date, disease: m.disease }) }}>
                                        <Text style={{ color: "orange" }}>View</Text></Button>
                                </Right>
                            </CardItem>
                        </Card>
                    )
                }
                )}
        </Content>
        )
    }

    handleError() {
        if (this.state.error) {
            return (
                <Container style={{ justifyContent: "center", alignItems: "center", backgroundColor: "#1B5E20" }}>
                    <Text style={{ color: "white" }}>No Record</Text>

                </Container>
            )
        }
    }

    componentWillMount() {
        this.props.getDataFromDB()
        console.disableYellowBox = true
    }

    componentWillReceiveProps(prop) {
        if (prop.ComponentState[0] !== undefined) {
            this.setState({ error: false })
        }
    }

    render() {
        return (
            <Container
                style={{ backgroundColor: "#1B5E20" }}
            >

                <Header style={{ backgroundColor: "green" }}>
                    <StatusBar backgroundColor="black" />
                    <Left>
                        <Button transparent
                            onPress={() => { this.props.navigation.navigate('DrawerOpen') }}
                        >
                            <Icon name='ios-menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>All Patients</Title>
                    </Body>
                    <Right />
                </Header>

                <Container style={{ backgroundColor: "#1B5E20" }}>
                    {this.renderMethod()}
                </Container>

                {this.handleError()}



            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllPatientList)