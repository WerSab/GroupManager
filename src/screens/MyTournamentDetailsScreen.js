// this.state = {
//     selectedStartDate: null,
// }; -> odpowiednik funkcyjny -> const [selectedStartDate, setSelectedStartDate] = useState(null);


import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Linking,
    TouchableOpacity,
    Alert,
    ScrollView,
    Button

} from 'react-native';
import linkIcon from '../assets/icons/link.png';
import { useEffect } from 'react/cjs/react.production.min';
import { TournamentContext } from '../context/TournamentContextProvider';
import { UserContext } from '../context/UserContextProvider';
import { useTournamentTicketTypes } from '../hooks/useTournamentTicketTypes';
import { updateBookingsToTournament, getTournaments, bookingsCounter } from '../tournaments-examples';
import { getTournamentFromContext } from '../common/context-methods';
import { NavigationContainer, useNavigation } from '@react-navigation/core';
import { SCREEN } from '../navigation/screens';
import { CustomButton } from '../styles/CustomButton';
import { TicketOrderingScreen } from './TicketOrderingScreen'


const MyTournamentDetails = ({ route }) => {
    //const { id } = route.params;- ten lub poniższy sposób
    const id = route.params.id;
    const userContext = useContext(UserContext);
    const tournamentContext = useContext(TournamentContext);
    const tournament = getTournamentFromContext(tournamentContext, id);
    const [ticketTypesData, loading, error] = useTournamentTicketTypes(tournament);
    const navigation = useNavigation();
    const parsedTicketTypesData = ticketTypesData?.map(parsedTicketTypesDataView);
    
        function parsedTicketTypesDataView(element) {
                return <Text style={styles.listStyle} key={element.id}>
            {
                `${element.name}:   
            Cena: ${element.price}  
            Ilość biletów: ${element.slots}`
            }
            
            <View >

                 <Button
                    activeOpacity={0.5}
                    background='#005b98'
                    title="Kup bilet/Zarezerwuj"
                    onPress={() => {
                        navigation.navigate(SCREEN.TICKET_ORDERING,
                        {
                            tournamentId: id,
                            userId: userContext.user.uid,
                            ticketTypesId: element.id,
                            ticketTypesPrice: element.price,
                            tournamentName: tournament.name,
                            
                        });
                    }}
                />

            </View>
        </Text>
    }

    return (
        <View style={styles.mainBody}>
            <ScrollView>

                <Text style={styles.text}>{tournament.name}
                </Text>

                <Text style={styles.listStyle}>

                    <View >

                        <Text style={styles.textDark}>Miejsce:  {tournament.place}</Text>
                        <Text style={styles.textDark}>Termin: {tournament.date}</Text>
                        <Text style={styles.textDark}>Godzina rozpoczęcia: {tournament.startTime}</Text>
                        <Text style={styles.textDark}>Czas trwania: {tournament.interval}</Text>
                        <TouchableOpacity
                            onPress={() => Linking.openURL(tournament.link)}//(then i catch/ obsłużyć w promisie/sprawdzić Regex/https://regex101.com/https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url#:~:text=javascript%3Avoid%20%280%29%20is%20valid%20URL%2C%20although%20not%20an,DNS%29%20https%3A%2F%2Fexample..com%20is%20valid%20URL%2C%20same%20as%20above
                        >
                            <Text style={styles.linkStyle}><Image source={linkIcon} style={styles.icon} />Link do wydarzenia</Text>
                        </TouchableOpacity>

                    </View>
                </Text>

                {
                    loading ? <Text style={styles.text}>Ładuje się ...</Text> : (
                        error ? <Text>Blad pobierania biletów {!!error}</Text> : (
                            <View style={styles.listStyle}>
                                <Text style={styles.textDark}> Bilety:</Text>

                                <Text> {parsedTicketTypesData}</Text>

                            </View>
                        )
                    )
                }

            </ScrollView>
        </View>
        //{JSON.stringify(tournament, null, 2)}
    )
}
export default MyTournamentDetails;
const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        //justifyContent: 'center',
        backgroundColor: '#015a92',

    },
    text: {
        color: 'white',
        fontSize: 20,
        padding: 10,
    },
    textDark: {
        color: '#005b98',
        fontSize: 16,

    },
    container: {
        flex: 1,
    },
    listStyle: {
        padding: 20,
        marginBottom: 5,
        color: '#005b98',
        backgroundColor: "white",
        marginRight: 20,
        marginLeft: 20,

        textAlign: 'left',
        fontSize: 16
    },
    linkStyle: {
        color: '#fbb713',
        height: 40,


    },
    buttonStyle: {
        backgroundColor: 'white',
        borderWidth: 0,
        borderColor: '#3175ab',
        height: 40,
        alignItems: 'center',
        borderRadius: 15,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
        margin: 10,



    },
    buttonTextStyle: {
        paddingVertical: 10,
        color: '#005b98',
        fontSize: 16,


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
    twoButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    image: { height: 70, width: 70, flexBasis: '20%' },
    icon: { height: 30, width: 30, flexBasis: '20%' },
})