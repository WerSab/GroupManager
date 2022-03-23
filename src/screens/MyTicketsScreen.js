import { useNavigation } from '@react-navigation/core';
import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import { UserContext } from '../context/UserContextProvider';
import { runTransaction } from "firebase/firestore";
import { extractTicketsInfo, getUserTickets } from '../ticket-examples';
import ErrorScreen from './ErrorScreen';


function getExtractedTickets(userID) {
    return new Promise((resolve, reject) => {
        getUserTickets(userID)
            .then(function (tickets) {

                return extractTicketsInfo(tickets);
            })
            .then(function (extractedTickets) {
                resolve(extractedTickets)
            })
            .catch((error) => reject(error))
    });

};

const MyTicketsScreen = () => {
    //const navigation = useNavigation();
    const [myTickets, setMyTickets] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const userContext = useContext(UserContext);
    const userID = userContext.user.uid;

    // const [data, error, loading] = useMyTickets();

    useEffect(() => {
        getExtractedTickets(userID) // "pending"
            .then(result => {
                // i know that the promise is fullfilled

                setMyTickets(result);
                setLoading(false);
            })
            .catch((error) => {
                // i know that the promise is rejected
                setError(error);
            })
    }, []);


    //const myTickets = getExtractedTickets(userID);
    if (loading) {
        return (<View style={styles.buttonContainer}>
            <Text style={styles.textDark}>Ładuje się</Text>
        </View>)
    }
    if (error) {
        return <ErrorScreen errorMessage={error.message} />
    }
    if (!myTickets && myTickets.length === 0) {
        return (<View style={styles.buttonContainer}>
            <Text style={styles.text}>Nie posiadasz żadnych biletów.</Text>
        </View>)
    }
    // const myNumber = 0;
    //     if(!!!myNumber || myNumber !== undefined && myNumber !== null) {

    //     }

    return (
        <View style={styles.mainBody}>
            {
                // TODO: zadanie
                myTickets.map(ticket => <Text>{ticket}</Text>)//zadanie!!!!- pomapowac bilety - zamiana struktur java scriptowych na komponenty Reactowe (żeby je mozna było wyswuetlić w komponnetach View, text itd.)
            }
            <View style={styles.buttonContainer}>
                <Text style={styles.text}>Moje Bilety</Text>
                <Text style={styles.text}>Amount: {myTickets.amount} </Text>
            </View>
        </View>
    )
}

export default MyTicketsScreen;

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
    deleteButton: {
        flexDirection: 'row',
        borderRadius: 10,
        paddingVertical: -5,
        paddingHorizontal: -5,
        elevation: 1,
        width: '100%',
        backgroundColor: '#eeedef',
        justifyContent: 'space-between',
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