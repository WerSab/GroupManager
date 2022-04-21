import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { SCREEN } from '../navigation/screens';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert, 
    TextInput
} from 'react-native';
import { updateTicketOrdersToTournament } from '../tournaments-examples';

export function TicketOrderingScreen (props) {
   const [ticketOrders, setTicketOrders] = useState({
       amount:null,
       ticket:'',
       tournament: '',
       user:'',
   });
   
  const onSaveTicketOrders=()=>{
   const parsedTicketOrders = parseInt(ticketOrders);
   if (isNaN(parsedTicketOrders)) {
       Alert.alert('Wystąpił błąd', `Prosze wprowadzić liczbę`, [
           { text: 'Ok' },
       ])
       return undefined;
   }
}

   const onSavePress = () => {
    
    updateTicketOrdersToTournament(id, parsedTickedOrders)
        .then(() => {
            setIsModalVisible(!isModalVisible);
        })
        .catch(function (err) {
            Alert.alert('Wystąpił błąd', `Przepraszamy mamy problem z serwerem, prosze spróbować później`, [
                { text: 'Ok' },
            ]);
            console.log("OrdersScreen error: ", err);
        })

}

   const handleStateChange = (field, text) => {
    console.log("Nazwa i wartość", field, text);
    setTicketOrders((prev) => ({
        ...prev,
        [field]: text
    }));
};
    return (
        <View >
            <Text>Zamów bilet</Text>
            <TextInput
                style={styles.textDark}
                onChangeText={(text) => handleStateChange("slots", text)}
                value={ticketOrders.slots}
                placeholder="Ilość biletów..."
            />
            <TouchableOpacity
                style={styles.buttonTextStyle}

                onPress={() => {
                    props.onTicketOrdersAdd(ticketOrders);
                    onSaveTicketOrders();
                    }}
            >
                <Text style={styles.textButton}>Zamów bilet</Text>

            </TouchableOpacity>
            
        </View>
    )
}

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