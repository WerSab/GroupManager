// this.state = {
//     selectedStartDate: null,
// }; -> odpowiednik funkcyjny -> const [selectedStartDate, setSelectedStartDate] = useState(null);


import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
} from 'react-native';
import { TournamentContext } from '../context/TournamentContextProvider';
import { UserContext } from '../context/UserContextProvider';
import { addBookingsToTournament, getTournaments, bookingsCounter } from '../tournaments-examples';

function getTournamentFromContext(context, tournamentId) {
    const [tournamentList] = context;
    return tournamentList.find(function (tournament) {
        return tournament.id === tournamentId;
    });
};

const TournamentDetails = ({ route }) => {
    //const { id } = route.params;- ten lub poniższy sposób
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [bookings, setBookings] = useState(null);
    const id = route.params.id;
    const tournamentContext = useContext(TournamentContext);
    const currentUser = useContext(UserContext);
    const tournament = getTournamentFromContext(tournamentContext, id);
    const allParticipants = tournament.numberOfParticipants;
    const allBookings = tournament.numberOfBookings + bookings;
    const bookCounter = bookingsCounter(allParticipants, allBookings);

    const onSavePress = () => {
        const bookings = parseInt(bookings);
        addBookingsToTournament(id, bookings)
            .then(() => {
                setIsModalVisible(!isModalVisible);
                setNumberOfBookings();
            })
            .catch(function (err) {
                Alert.alert('Wystąpił błąd', `Przepraszamy mamy problem z serwerem, prosze spróbować później`, [
                    { text: 'Ok' },
                ]);
                console.log("TournamentsDetailsScreen error: ", err);
            })

    }


    // {
    //     addParticipantToTournament(id, currentUser.user.uid, numberOfBookings)
    //         .then(() => {
    //             setIsModalVisible(!isModalVisible);
    //             setNumberOfBookings('');
    //         })
    //         .catch(function (err) {
    //             Alert.alert('Wystąpił błąd', `Przepraszamy mamy prblem z serwerem, prosze spróbować później`, [
    //                 { text: 'Ok' },
    //             ]);
    //             console.log("TournamentsDetailsScreen error: ", err);
    //         })

    // }

    return (
        <View style={styles.mainBody}>

            <Text style={styles.text}>{tournament.name} {'\n'}
            </Text>
            {isModalVisible && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setIsModalVisible(false)}
                    onBackdropPress={() => setIsModalVisible(false)}
                    onBackButtonPress={() => setIsModalVisible(false)}>
                    <View style={styles.modalView}>

                        <TextInput
                            style={styles.textDark}
                            onChangeText={setBookings}
                            value={bookings}
                            placeholder="Liczba rezerwacji..."
                            keyboardType="numeric"
                        />
                        <View style={styles.twoButtons}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    setIsModalVisible(!isModalVisible);
                                    setBookings('');
                                }}>
                                <Text style={styles.textDark}>Close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonSafe]}
                                onPress={() => {

                                    onSavePress();
                                }}>
                                <Text style={styles.textDark}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}




            <Text style={styles.listStyle}>Miejsce:  {tournament.place}
                {'\n'}{'\n'}Termin: {tournament.date}
                {'\n'}{'\n'}Liczba dostępnych miejsc:  {bookCounter}
            </Text>


            <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                title="Book"
                onPress={() => {
                    setIsModalVisible(true);
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
        padding: 10,
    },
    textDark: {
        color: '#005b98',
        fontSize: 20,
        padding: 20,
    },
    container: {
        flex: 1,
    },
    listStyle: {
        padding: 40,
        marginBottom: 5,
        color: '#015a92',
        backgroundColor: "white",
        marginRight: 20,
        marginLeft: 20,
        borderRadius: 5,
        borderWidth: 1,
        textAlign: 'left',
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


})