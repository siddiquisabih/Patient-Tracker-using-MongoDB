import React, { Component } from "react"
import { Spinner, Container, Toast, Content, Button, Header, Text, Input, Icon, Item, Left, Right, List, ListItem, Card, CardItem } from "native-base"
import DatePicker from "react-native-datepicker"
import Midware from "../Store/Middleware/patientMidware"
import { connect } from "react-redux"
import { StatusBar, Dimensions, View } from "react-native"

function mapStateToProps(state) {
    return {
        patientData: state.Reducer.getSpecificPatientDataByDate,
        patientDataStatus: state.Reducer.getSpecificPatientByDate,


        allPatientData: state.Reducer.getPatientData,
        allPatient: state.Reducer.getPatient,


    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDataByDate: (date) => {
            dispatch(Midware.getSpecificPatientByDate(date))
        }
    }
}


class SearchByDate extends Component {
    static navigationOptions = {
        title: "Search By Date",
        drawerIcon: () => {
            return (
                <Icon name="ios-calendar" />
            )
        }
    }

    constructor() {
        super()
        this.state = {
            date: '',
            Patients: [],
            error: false,
            showToast: false,
        }
    }

    searchByDate() {
        if (this.state.date !== '') {
            this.props.getDataByDate({ date: this.state.date })
        }
        else {
            Toast.show({
                text: 'Select Date',
                position: 'bottom',
                buttonText: 'Okay',
                type: "danger",
                duration: 2000,
            })

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
            this.setState({ Patients: prop.patientData, error: false })
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
                                        onPress={() => { this.props.navigation.navigate("ViewPatientRoute", { name: m.name, cost: m.cost, medication: m.medication, date: m.date, disease: m.disease }) }}>
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
    render() {
        return (
            <Container
                style={{ backgroundColor: "#1B5E20" }}
            >
                < Header rounded style={{ backgroundColor: "green" }}>
                    <StatusBar backgroundColor="black" />


                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>

                        <Button
                            transparent
                            onPress={() => { this.props.navigation.navigate('DrawerOpen') }}>
                            <Icon name='menu' />
                        </Button>


                        <Item style={{ justifyContent: "center" }} >



                            <DatePicker
                                style={{ width: Dimensions.get('window').width / 2, backgroundColor: "white" }}
                                date={this.state.date}
                                mode="date"
                                placeholder="Select Date"
                                format="YYYY-MM-DD"
                                minDate="2017-05-01"
                                maxDate="2019-06-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                }}
                                onDateChange={(date) => { this.setState({ date: date }) }}

                            />





                        </Item>


                        <Button
                            transparent
                            onPress={this.searchByDate.bind(this)}>
                            <Text style={{ alignItems: "center" }} >
                                Search
</Text>
                        </Button>
                    </View>
                </Header>
                {this.handleError()}
                <Container style={{ backgroundColor: "#1B5E20" }}>
                    {this.renderData()}
                </Container>
            </Container>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchByDate)
style = {
    nameStyle: {
        justifyContent: 'center',
    }
}