import React, { useContext, useState, useCallback } from 'react';
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
    ScrollView,
} from 'react-native';
import addIcon from '../assets/icons/add.png';
import deleteIcon from '../assets/icons/delete.png';
import { Picker } from '@react-native-picker/picker';
import { removeFromArray } from '../fireBase/firestoreHelper';
import { SCREEN } from '../navigation/screens';
import { addNewTournamentToCollection, deleteTournament } from '../tournaments-examples';
import { TournamentContext } from '../context/TournamentContextProvider';

const TournamentsScreen = () => {
    // Zaznaczanie takich samych wystapein -> ctrl+d
    // ctrl+z -> cofnij
    const [tournamentList, , { requeryTournaments }] = useContext(TournamentContext);
    const [isModalAddTournamentVisible, setIsModalAddTournamentVisible] = useState(false);
    const [nameInput, setNameInput] = useState();
    const [dateInput, setDateInput] = useState();
    const [startTimeInput, setStartTimeInput] = useState();
    const [intervalInput, setIntervalInput] = useState();
    const [placeInput, setPlaceInput] = useState();
    const [tournamentCategoryInput, setTournamentCategoryInput] = useState('Kategoria');
    const [ticketPremiumPrice, setTicketPremiumPrice] = useState();
    const [ticketPremiumSlots, setTicketPremiumSlots] = useState();
    const [ticketBasicPrice, setTicketBasicPrice] = useState();
    const [ticketBasicSlots, setTicketBasicSlots] = useState();
    const [ticketFreeSlots, setTicketFreeSlots] = useState();

    const getTicketTypes = useCallback(
        //Pierwszy parametr Callback to funkcja
        () => {
            const ticketDetails = [
                {
                    premiumPrice: ticketPremiumPrice,
                    premiumSlots: ticketPremiumSlots,
                },

                {
                    basicPrice: ticketBasicPrice,
                    basicSlots: ticketBasicSlots,
                },
                {
                    freeSlots: ticketFreeSlots,
                }
            ]
            return ticketDetails;
        },

        [
            ticketPremiumPrice,
            ticketPremiumSlots,
            ticketBasicPrice,
            ticketBasicSlots,
            ticketFreeSlots
        ]

    )



    const ticketDetails = getTicketTypes();

    const clearInputs = () => {
        setNameInput('');
        setDateInput('');
        setStartTimeInput('');
        setIntervalInput('');
        setPlaceInput('');
        setTournamentCategoryInput('Kategoria');
        setTicketPremiumPrice('');
        setTicketPremiumSlots('');
        setTicketBasicSlots('');
        setTicketBasicPrice('');
        setTicketFreeSlots('');

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

    const onSavePress = () => {

        addNewTournamentToCollection(
            {
                name: nameInput,
                date: dateInput,
                startTime: startTimeInput,
                interval: intervalInput,
                place: placeInput,
                tournamentCategory: tournamentCategoryInput,

            },
            ticketDetails
        )
            .then(() => {
                setIsModalAddTournamentVisible(!isModalAddTournamentVisible);
                clearInputs();
                requeryTournaments();
            })

            .catch(function (err) {
                Alert.alert('Wystąpił błąd', `Przepraszamy mamy problem z serwerem, prosze spróbować później`, [
                    { text: 'Ok' },
                ]);

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
                    <Text style={styles.text}>Wydarzenia </Text><TouchableOpacity onPress={() => setIsModalAddTournamentVisible(true)}>
                        <Image style={styles.icon_1} source={addIcon} />
                    </TouchableOpacity>
                </View>
                {isModalAddTournamentVisible && (
                    <Modal
                        animationType="slide"
                        transparent={true}
                        onRequestClose={() => setIsModalAddTournamentVisible(false)}
                        onBackdropPress={() => setIsModalAddTournamentVisible(false)}
                        onBackButtonPress={() => setIsModalAddTournamentVisible(false)}>
                        <View style={styles.modalView}>
                            <Text style={styles.textHeader}>Dodaj nowe wydarzenie</Text>
                            <ScrollView>
                                <Picker
                                    selectedValue={tournamentCategoryInput}
                                    style={{ height: 50, width: 150, color: "#005b98" }}
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
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        width: '80%',
                                        padding: 10,
                                    }}>
                                    <Text style={styles.textDark}>Bilety premium:</Text>
                                    <TextInput
                                        style={styles.textDark}
                                        onChangeText={setTicketPremiumPrice}
                                        value={ticketPremiumPrice}
                                        placeholder="cena..."
                                    />
                                    <TextInput
                                        style={styles.textDark}
                                        onChangeText={setTicketPremiumSlots}
                                        value={ticketPremiumSlots}
                                        placeholder="ilość..."
                                    />
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        width: '80%',
                                        padding: 10,
                                    }}>
                                    <Text style={styles.textDark}>Bilety basic:</Text>
                                    <TextInput
                                        style={styles.textDark}
                                        onChangeText={setTicketBasicPrice}
                                        value={ticketBasicPrice}
                                        placeholder="cena..."
                                    />
                                    <TextInput
                                        style={styles.textDark}
                                        onChangeText={setTicketPremiumSlots}
                                        value={ticketBasicSlots}
                                        placeholder="ilość..."
                                    />
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        width: '80%',
                                        padding: 10,
                                    }}>
                                    <Text style={styles.textDark}>Bilety bezpłatne:</Text>
                                    <TextInput
                                        style={styles.textDark}
                                        onChangeText={setTicketFreeSlots}
                                        value={ticketFreeSlots}
                                        placeholder="ilość..."
                                    />
                                </View>

                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        width: '100%',
                                        padding: 10,
                                    }}>
                                    <TouchableOpacity
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => {
                                            setIsModalAddTournamentVisible(!isModalAddTournamentVisible);
                                            setNameInput('');
                                        }}>
                                        <Text style={styles.textButton}>Close</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.button, styles.buttonSafe]}
                                        onPress={() => {
                                            clearInputs();
                                        }}>
                                        <Text style={styles.textButton}>Clear</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.button, styles.buttonSafe]}
                                        onPress={() => {
                                            onSavePress();
                                        }}>
                                        <Text style={styles.textButton}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
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
    textHeader: {
        color: '#005b98',
        fontSize: 20,
        padding: 10,
    },
    text: {
        color: 'white',
        fontSize: 20,
        padding: 10,
    },
    textDark: {
        color: '#005b98',
        fontSize: 15,
        padding: 10,
    },
    textButton: {
        color: 'white',
        fontSize: 15,
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
        margin: '2%',
    },
    button: {
        backgroundColor: '#005b98',
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
        justifyContent: 'center',
    },

})