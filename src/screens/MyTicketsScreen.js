//odliczanie czasu=> w local stroage pobrac info kiedy był czyszczenie starych bietów (pamiętac, że na początku ma być null lub zero)

// pobieram informacje ze storage'u kiedy byly "czyszczone" bilety (bedzie ona przechowywana pod kluczem np. tickets-cleared-at: DATE | undefined)
// 1. tickets-cleared-at istnieje to: analizuje czy czyszczenie jest wymagane w tym momencie
// 2. tickets-cleared-at nie istnieje: od razu wykonuje czyszczenie biletow


// tickets -> tournament(ref) -> tournament(ref).id
// tickets.where(tournament == 'tournaments/tournamentId');

import { useNavigation } from '@react-navigation/core';
import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
} from 'react-native';
import { UserContext } from '../context/UserContextProvider';
import { checkIfTicketsCheckingDateUpdated, localStogrageGetItem, setAsyncItem } from '../store/localStore';
import { getUserTickets } from '../ticket-examples';
import ErrorScreen from './ErrorScreen';

const MyTicketsScreen = () => {
    //const navigation = useNavigation();
    const [myTickets, setMyTickets] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const userContext = useContext(UserContext);
    const userID = userContext.user.uid;
        
    useEffect(() => {
        deleteOutdatedTickets();
        getUserTickets(userID) // "pending"
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

    const renderItem = item => {
        // const ticketDate = {
        //     date: item.createdAt,
        // }
        // console.log('ticketDate', ticketDate)
        // checkIfTicketsCheckingDateUpdated(ticketDate);
        
        return (
            <View style={styles.listStyle} key={item.id}>
                <Text style={styles.itemStyle}>
                    <Text>Nazwa wydarzenia:  </Text>
                    {'\n'}<Text>Rodzaj biletu: </Text>
                    {'\n'}<Text>Razem do zapłaty: {item.price} zł.                     </Text>
                    {'\n'}<Text>Ilość biletów: {item.slots} </Text>
                    {'\n'}<Text>Zamówienie wygaśnie za: </Text>


                </Text>
            </View>
        )
    }

    const myTicketList = myTickets.map(ticket => renderItem(ticket));
    
    
    return (
        <View style={styles.mainBody}>
            <View style={styles.buttonContainer}>
                <Text style={styles.text}>Moje Bilety:</Text>
                {myTicketList}
                {/* // TODO: zadanie
                //zadanie!!!!- pomapowac bilety - zamiana struktur java scriptowych na komponenty Reactowe (żeby je mozna było wyswuetlić w komponnetach View, text itd.) */}

                {/* <FlatList
                    data={myTickets}
                    renderItem={({ item }) => renderItem(item)} 
                    keyExtractor={(item, index) => index.toString()}
                    style={styles.container}
                    withSearchbar={false}
                /> */}
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
        textAlign: 'left',
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