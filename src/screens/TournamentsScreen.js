import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import {
    View,
    Image,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Alert,
    Modal,
    TextInput,
} from 'react-native';
import addIcon from '../assets/icons/add.png';
import deleteIcon from '../assets/icons/delete.png';
import { Picker } from '@react-native-picker/picker';
import { removeFromArray } from '../fireBase/firestoreHelper';
import { SCREEN } from '../navigation/screens';
import { addNewTournamentToCollection, deleteTournament } from '../tournaments-examples';
import { TournamentContext } from '../context/TournamentContextProvider';

const TournamentsScreen = () => {
    const [tournamentList, , { requeryTournaments }] = useContext(TournamentContext);
    console.log("tournamentSCREEN", tournamentList,)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalPricingVisible, setIsModalPricingVisible] = useState(false);
    const [nameInput, setNameInput] = useState('');
    const [dateInput, setDateInput] = useState('');
    const [startTimeInput, setStartTimeInput] = useState('');
    const [intervalInput, setIntervalInput] = useState('');
    const [placeInput, setPlaceInput] = useState('');
    const [numberOfParticipantsInput, setNumberOfParticipantsInput] = useState('');
    const [tournamentCategoryInput, setTournamentCategoryInput] = useState('Kategoria');
    const [ticketCategoryInput, setTicketCategoryInput] = useState('Cena biletu');
    const [pricingInput, setPricingInput] = useState('');

    const clearInputs = () => {
        setNameInput('');
        setDateInput('');
        setStartTimeInput('');
        setIntervalInput('');
        setNumberOfParticipantsInput('');
        setPlaceInput('');
        setTournamentCategoryInput('Kategoria');
        setTicketCategoryInput('Cena biletu');
        setPricingInput('');

    };

    const deleteAlert = (id, name) => {
        Alert.alert('Delete alert', `Do You want to delete ${name}?`, [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
            {
                text: 'Ok', onPress: () => {
                    deleteTournament(id)
                        .then(() => {
                            requeryTournaments();
                        })
                        .catch(function (err) {
                            Alert.alert('Spróbuj ponownie później')
                        })
                }
            },
        ]);
    };
    const pricingTickets = () => {
        setIsModalPricingVisible(true)
        const pricing = pricingInput;
        if (pricing == "platny") {
            {
                isModalVisible && (
                    <Modal
                        animationType="slide"
                        transparent={true}
                        onRequestClose={() => setIsModalPricingVisible(false)}
                        onBackdropPress={() => setIsModalPricingVisible(false)}
                        onBackButtonPress={() => setIsModalPricingVisible(false)}>
                        <View style={styles.modalView}>

                            <TextInput
                                style={styles.textDark}
                                onChangeText={setFirstTicketInput}
                                value={firstTicketInput}
                                placeholder="Nazwa biletu..."
                            />
                            <TextInput
                                style={styles.textDark}
                                onChangeText={setSecondTicketInput}
                                value={secondTicketInput}
                                placeholder="Nazwa biletu..."
                            />
                            <TextInput
                                style={styles.textDark}
                                onChangeText={setThirdTicketInput}
                                value={thirdTicketInput}
                                placeholder="Nazwa biletu..."
                            />
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    width: '100%',
                                    padding: 40,
                                }}>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => {
                                        setIsModalPricingVisible(!isModalPricingVisible);
                                    }}>
                                    <Text style={styles.textDark}>Close</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonSafe]}
                                    onPress={() => {
                                        //onSavePricingPress();
                                    }}>
                                    <Text style={styles.textDark}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                )
            }
        }
    };
    //onSavePricingPress();

    const onSavePress = () => {
        const numberOfParticipants = parseInt(numberOfParticipantsInput);
        if (isNaN(numberOfParticipants)) {
            Alert.alert('Wystąpił błąd', `Prosze wprowadzić liczbę`, [
                { text: 'Ok' },
            ]);
            return;
        }
        addNewTournamentToCollection({
            name: nameInput,
            date: dateInput,
            startTime: startTimeInput,
            interval: intervalInput,
            place: placeInput,
            numberOfParticipants: numberOfParticipantsInput,
            tournamentCategory: tournamentCategoryInput,
            ticketCategory: ticketCategoryInput,
        })
            .then(() => {
                setIsModalVisible(!isModalVisible);
                clearInputs();
                requeryTournaments();
            })
            .catch(function (err) {
                Alert.alert('Wystąpił błąd', `Przepraszamy mamy prblem z serwerem, prosze spróbować później`, [
                    { text: 'Ok' },
                ]);
                console.log("TournamentsScreen error: ", err);
            })

    }

    /*
        const tournamentsContext = useContext(Conaosda);
        tournamentsContext.requeryTournaments();
    
        addTournamentToDB()
        .then(() => {
    
            tournamentsContext.requeryTournaments();
        })
    
    */
    const navigation = useNavigation();

    const renderItem = item => {
        return (
            <View style={styles.listStyle}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(SCREEN.TOURNAMENTDETAILS, {
                            id: item.id
                        });
                    }}
                >
                    <Text style={styles.itemStyle}>
                        {item.name}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => deleteAlert(item.id, item.name)}
                >
                    <Image source={deleteIcon} style={styles.icon} />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <>
            {/*<CustomHeader/>*/}
            <View style={styles.mainBody}>
                <View style={styles.title}>
                    <Text style={styles.text}>Wydarzenia </Text><TouchableOpacity onPress={() => setIsModalVisible(true)}>
                        <Image style={styles.icon_1} source={addIcon} />
                    </TouchableOpacity>
                </View>
                {isModalVisible && (
                    <Modal
                        animationType="slide"
                        transparent={true}
                        onRequestClose={() => setIsModalVisible(false)}
                        onBackdropPress={() => setIsModalVisible(false)}
                        onBackButtonPress={() => setIsModalVisible(false)}>
                        <View style={styles.modalView}>
                            <Picker
                                selectedValue={tournamentCategoryInput}
                                style={{ height: 100, width: 150, color: "#005b98" }}
                                onValueChange={itemValue => setTournamentCategoryInput(itemValue)}>
                                <Picker.Item label="Kategoria" value="  " />
                                <Picker.Item label="Kultura" value="kultura" />
                                <Picker.Item label="Sport" value="sport" />
                            </Picker>

                            <TextInput
                                style={styles.textDark}
                                onChangeText={setNameInput}
                                value={nameInput}
                                placeholder="Nazwa..."
                            />
                            <TextInput
                                style={styles.textDark}
                                onChangeText={setPlaceInput}
                                value={placeInput}
                                placeholder="Miejsce..."
                            />
                            <TextInput
                                style={styles.textDark}
                                onChangeText={setDateInput}
                                value={dateInput}
                                placeholder="Termin..."
                            />
                            <TextInput
                                style={styles.textDark}
                                onChangeText={setStartTimeInput}
                                value={startTimeInput}
                                placeholder="Godzina rozpoczęcia..."
                            />
                            <TextInput
                                style={styles.textDark}
                                onChangeText={setIntervalInput}
                                value={intervalInput}
                                placeholder="Czas trwania..."
                            />
                            <TextInput
                                style={styles.textDark}
                                onChangeText={setNumberOfParticipantsInput}
                                value={numberOfParticipantsInput}
                                placeholder="Liczba uczestników..."
                                keyboardType="numeric"
                            />
                            <Picker
                                selectedValue={ticketCategoryInput}
                                style={{ height: 100, width: 150, color: "#005b98" }}
                                onValueChange={itemValue => setTicketCategoryInput(itemValue)}
                            >
                                <Picker.Item label="Cena biletu" value="  " />
                                <Picker.Item label="Bezplatny" value="bezplatny" />
                                <Picker.Item label="Platny" value="platny" />
                            </Picker>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonTicketType]}
                                onPress={() => {
                                    pricingTickets();
                                }}>
                                <Text style={styles.textDark}>Dodaj bilet</Text>
                            </TouchableOpacity>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    width: '100%',
                                    padding: 40,
                                }}>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => {
                                        setIsModalVisible(!isModalVisible);
                                        setNameInput('');
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


                <FlatList
                    data={tournamentList}
                    renderItem={({ item }) => renderItem(item)} //do renderItem przekazujemy wartośc funkcji renderItem
                    keyExtractor={(item, index) => index.toString()}
                    style={styles.container}
                    withSearchbar={false}
                />

            </View>
        </>
    )
}

export default TournamentsScreen;

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
        fontSize: 20,
        padding: 10,
    },
    textDark: {
        color: '#005b98',
        fontSize: 20,
        padding: 10,
    },
    container: {
        flex: 2,
    },
    listStyle: {
        flexDirection: 'row',
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 16,
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    itemStyle: {
        flexDirection: 'column',
        width: 250,
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
        // elevation: 5,
        margin: '10%',
    },

})