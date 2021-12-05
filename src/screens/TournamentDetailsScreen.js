import React, { useContext } from 'react';
import { useTournaments } from '../hooks/useTournaments';
import { useNavigation } from '@react-navigation/core';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { TournamentContext } from '../context/TournamentContextProvider';
import {UserContext} from '../context/UserContextProvider';
import { addParticipantToTournament, getTournaments } from '../tournaments-examples';

function getTournamentFromContext(context, tournamentId) {
    const [tournaments] = context;
    return tournaments.find(function (tournament) {
        return tournament.id === tournamentId;
    });
};

const TournamentDetails = ({ route }) => {
    //const { id } = route.params;- ten lub poniższy sposób
    const id = route.params.id;
    const tournamentContext = useContext(TournamentContext);
    const currentUser = useContext(UserContext);
    const tournament = getTournamentFromContext(tournamentContext, id);
    console.log("tournament.name", tournament.name)
    return (
        <View style={styles.mainBody}>

            <Text style={styles.text}>{tournament.name} {'\n'}{tournament.place} {'\n'}{tournament.date}</Text>
            <Text style={styles.text}></Text>

            <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                title="Book"
                onPress={() => {
                    addParticipantToTournament(id, currentUser.user.uid); 
                    //zadanie tak jak signedOut żeby dezaktywować onpress                  
               }}
            >
                <Text style={styles.buttonTextStyle}>Zarezerwuj</Text>
            </TouchableOpacity>
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
        padding: 40,
    },
    container: {
        flex: 1,
    },
    listStyle: {
        padding: 15,
        marginBottom: 5,
        color: '#27046d',
        backgroundColor: "white",
        marginRight: 20,
        marginLeft: 20,
        borderRadius: 5,
        borderWidth: 1,
        textAlign: 'center',
        fontSize: 16
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
        color: '#015a92',
        paddingVertical: 10,
        fontSize: 16,
    },
})