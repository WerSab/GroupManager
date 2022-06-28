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
import { TournamentContext } from '../context/TournamentContextProvider';
import { useTournamentTicketTypes } from '../hooks/useTournamentTicketTypes';
import { getTournamentFromContext } from '../common/context-methods';
import { useNavigation } from '@react-navigation/core';
import { SCREEN } from '../navigation/screens';
import { convertMilisToReadabletime, EVENT_DURATION_FORMAT, parseEventDurationTime } from '../common/time-methods';
import { getDateFromTimestamp } from '../fireBase/firestore-Helper';
import dayjs from 'dayjs';
import { getEventDuration } from './common/tournament-methods';


const MyTournamentDetails = ({ route }) => {
    //const { id } = route.params;- ten lub poniższy sposób
    const tournamentContext = useContext(TournamentContext);
    const id = route.params.id;
    const tournament = getTournamentFromContext(tournamentContext, id);
    const [ticketTypesData, loading, error] = useTournamentTicketTypes(tournament);
    const navigation = useNavigation();
    const parsedTicketTypesData = ticketTypesData?.map(parsedTicketTypesDataView);
    const startTime = getDateFromTimestamp(tournament.startDate);
    const startTimeFormated = dayjs(startTime).format('DD/MM/YYYY HH:mm');
    const eventDuration = parseEventDurationTime(tournament);

    console.log('tournamentContext', tournamentContext)
    console.log('getEventDuration', getEventDuration(tournament, EVENT_DURATION_FORMAT));
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
                                ticketType: element,

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
                        <Text style={styles.textDark}>Godzina rozpoczęcia: {startTimeFormated}</Text>
                        <Text style={styles.textDark}>Czas trwania: {eventDuration}</Text>
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