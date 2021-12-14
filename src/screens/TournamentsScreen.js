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
    const {tournamentList, requeryTournaments} = useContext(TournamentContext);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [nameInput, setNameInput] = useState('');
    const [dateInput, setDateInput] = useState('');
    const [startTimeInput, setStartTimeInput] = useState('');
    const [intervalInput, setIntervalInput] = useState('');
    const [placeInput, setPlaceInput] = useState('');
    const [numberOfParticipantsInput, setNumberOfParticipantsInput] = useState('');
    const [selectedValue, setSelectedValue] = useState('Turniej');

    const clearInputs = () => {
        setNameInput('');
        setDateInput('');
        setStartTimeInput('');
        setIntervalInput('');
        setNumberOfParticipantsInput('');
        setPlaceInput('');

    };

    const deleteAlert = (id, name) => {
        Alert.alert('Delete alert', `Do You want to delete ${name}?`, [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
            { text: 'Ok', onPress: () => {
                deleteTournament(id)
                .then(() => {
                    requeryTournaments();
                })
                .catch(function(err){
                    Alert.alert('Spróbuj ponownie później')
                })
            } },
        ]);
    };

    const onSavePress = () => {
        addNewTournamentToCollection({
            name: nameInput,
            date: dateInput,
            startTime: startTimeInput,
            interval: intervalInput,
            place: placeInput,
            numberOfParticipants: numberOfParticipantsInput,
            category: selectedValue,
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
                                selectedValue={selectedValue}
                                style={{ height: 100, width: 150, color: "#005b98" }}
                                onValueChange={itemValue => setSelectedValue(itemValue)}>
                                <Picker.Item label="Kategoria" value="  " />
                                <Picker.Item label="Turniej" value="turniej" />
                                <Picker.Item label="Koncert" value="koncert" />
                                <Picker.Item label="Wystawa" value="wystawa" />
                                <Picker.Item label="Spektakl" value="Spektakl" />
                            </Picker>
                            {/* <TextInput
                                style={styles.textDark}
                                onChangeText={setDateInput}
                                value={dateInput}
                                placeholder="Termin..."
                            /> */}
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
        padding: 5,
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
        // elevation: 5,
        margin: '10%',
    },

})