import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { SCREEN } from '../navigation/screens';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Button
} from 'react-native';
import { updateBookingsToTournament, getTournaments, bookingsCounter } from '../tournaments-examples';

const TicketOrderScreen = () => {
    // const [isModalVisible, setIsModalVisible] = useState(false);
    // const [bookings, setBookings] = useState(null);

    return (
        <View >
            <Button
                activeOpacity={0.5}
                background='#005b98'
                title="Kup bilet/Zarezerwuj"
                onPress={() => {
                    setIsModalVisible(true);
                }}
            />
            
        </View>
    )
}

export default TicketOrderScreen;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#005b98',
        alignItems: 'center',
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#005b98',
        width: '100%',

    },

    text: {
        color: 'white',
        fontSize: 25,
        padding: 30,
    },
    textDark: {
        color: '#005b98',
        fontSize: 20,
        padding: 20,
    },
    container: {
        flex: 2,
    },
    listStyle: {
        flexDirection: 'row',
        padding: 15,
        marginBottom: 5,
        marginRight: 20,
        marginLeft: 20,
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 16,
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    itemStyle: {
        flexDirection: 'column',
        width: 300,
        padding: 15,
        marginBottom: 5,
        color: '#005b98',
        backgroundColor: "white",
        marginRight: 20,
        marginLeft: 20,
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 16,
        alignItems: 'center',

    },
    icon_1: {
        height: 40,
        width: 40,
        justifyContent: 'flex-end',
        padding: 15,
        height: 30,
        width: 30,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 15,
        margin: 10,
    },
    icon: {
        height: 25,
        width: 25,
        justifyContent: 'flex-end',
    },
    button: {
        backgroundColor: '#005b98',
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 250,
    },
    buttonTextStyle: {
        color: 'white',
        fontSize: 14,
        paddingVertical: 10,



    },
    modalView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        elevation: 5,
        margin: '10%',
    },


})