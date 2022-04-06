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
    Modal,
    TextInput,
    Alert,
    ScrollView,

} from 'react-native';
import linkIcon from '../assets/icons/link.png';
import { useEffect } from 'react/cjs/react.production.min';
import { TournamentContext } from '../context/TournamentContextProvider';
import { UserContext } from '../context/UserContextProvider';
import { useTournamentTicketTypes } from '../hooks/useTournamentTicketTypes';
import { updateBookingsToTournament, getTournaments, bookingsCounter } from '../tournaments-examples';
import TicketOrderScreen from './TicketOrderingScreen';


function getTournamentFromContext(context, tournamentId) {
    const [tournamentList] = context;
    return tournamentList.find(function (tournament) {
        return tournament.id === tournamentId;
    });
};

function parsedTicketTypesDataView(element) {
    return <Text style={styles.listStyle} key={element.id}>
        {
            `${element.name}:   
        Cena: ${element.price}  
        Ilość biletów: ${element.slots}`
        }
        {'\n'}
        {'\n'}
        <TicketOrderScreen />
        {'\n'}
        {'\n'}

    </Text>
}


const TournamentDetails = ({ route }) => {
    //const { id } = route.params;- ten lub poniższy sposób
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [bookings, setBookings] = useState(null);
    const id = route.params.id;
    const tournamentContext = useContext(TournamentContext);
    const tournament = getTournamentFromContext(tournamentContext, id);
    const [ticketTypesData, loading, error] = useTournamentTicketTypes(tournament);

    const parsedTicketTypesData = ticketTypesData?.map(parsedTicketTypesDataView);

    const onSavePress = () => {
        const parsedBookings = parseInt(bookings);
        if (isNaN(parsedBookings)) {
            Alert.alert('Wystąpił błąd', `Prosze wprowadzić liczbę`, [
                { text: 'Ok' },
            ])
            return undefined;
        }

        updateBookingsToTournament(id, parsedBookings)
            .then(() => {
                setIsModalVisible(!isModalVisible);
            })
            .catch(function (err) {
                Alert.alert('Wystąpił błąd', `Przepraszamy mamy problem z serwerem, prosze spróbować później`, [
                    { text: 'Ok' },
                ]);
                console.log("TournamentsDetailsScreen error: ", err);
            })

    }



    return (
        <View style={styles.mainBody}>
            <ScrollView>

                <Text style={styles.text}>{tournament.name} {'\n'}
                </Text>
                <Text style={styles.listStyle}>
                    <View >
                        <Text style={styles.textDark}>Miejsce:  {tournament.place}</Text>
                        <Text style={styles.textDark}>Termin: {tournament.date}</Text>
                        <Text style={styles.textDark}>Godzina rozpoczęcia: {tournament.startTime}</Text>
                        <Text style={styles.textDark}>Czas trwania: {tournament.interval}</Text>
                        <Image source={{ uri: tournament.picture }}
                            style={{ width: 60, height: 60 }} />

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
export default TournamentDetails;
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