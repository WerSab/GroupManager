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
import addIconDark from '../assets/icons/add_dark.png';
import deleteIcon from '../assets/icons/delete.png';
import { Picker } from '@react-native-picker/picker';
import { getFirestoreTimestampFromDate, removeFromArray } from '../fireBase/firestore-Helper';
import { SCREEN } from '../navigation/screens';
import { addNewTournamentToCollection, deleteTournament } from '../tournaments-examples';
import { TournamentContext } from '../context/TournamentContextProvider';
import { ticketTypePresets } from '../fireBase/ticket-types-presets';
import { TicketTypeCreator } from './TicketTypeCreator';
import { validateTournament, validateTournmanetFields } from '../fireBase/firestore-model-validators';
import DatePicker from 'react-native-date-picker';

const MIN_EVENT_DURATION_IN_MILLIS = 60*1000;





const TournamentsScreen = () => {
    // Zaznaczanie takich samych wystapein -> ctrl+d
    // ctrl+z -> cofnij
    const {tournamentList, isLoaded, error , actions} = useContext(TournamentContext);
    const [isModalAddTournamentVisible, setIsModalAddTournamentVisible] = useState(false);
    const [nameInput, setNameInput] = useState();
    const [placeInput, setPlaceInput] = useState();
    const [linkInput, setLinkInput] = useState('');
    const [tournamentCategoryInput, setTournamentCategoryInput] = useState('Kategoria');
    const [isCreatorVisible, setIsCreatorVisible] = useState(true);
    const [ticketTypes, setTicketTypes] = useState([]);
    const [date, setDate] = useState(new Date());
    const [endDate, setEndDate]= useState(new Date());
    
    const minimumEndDate= new Date(date.getTime()+MIN_EVENT_DURATION_IN_MILLIS);

console.log('date', date);
console.log('endDate', endDate);
    const handleTicketTypeAdd = (ticketType) => {
        setTicketTypes([...ticketTypes, ticketType]);
        setIsCreatorVisible(false);
    };


    const clearInputs = () => {
        setNameInput('');
        setDate(new Date());
        setDate(date);
        setPlaceInput('');
        setTournamentCategoryInput('Kategoria');
        setTicketTypes([]);
        setLinkInput('');

    };

    const deleteAlert = (id, name) => {
        Alert.alert('Delete alert', `Do You want to delete ${name}?`, [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
            {
                text: 'Ok', onPress: () => {
                    deleteTournament(id)
                        .then(() => {
                            actions.requeryTournaments();
                        })
                        .catch(function (err) {
                            Alert.alert('Spróbuj ponownie później')
                        })
                }
            },
        ]);
    };

    const onSavePress = () => {

        try {

            const tournament = {
                name: nameInput,
                startDate: date,
                endDate: endDate,
                place: placeInput,
                tournamentCategory: tournamentCategoryInput,
                link: linkInput,
            };


            validateTournament(tournament, ticketTypes);

            addNewTournamentToCollection(
                tournament,
                ticketTypes,
            )
                .then(() => {
                    setIsModalAddTournamentVisible(!isModalAddTournamentVisible);
                    clearInputs();
                    setIsCreatorVisible(true);
                    actions.requeryTournaments;
                })

                .catch(function (err) {
                    console.log('catch error in promise.catch:', err);
                    Alert.alert('Wystąpił błąd', `Przepraszamy mamy problem z serwerem, prosze spróbować później`, [
                        { text: 'Ok' },
                    ]);

                });

            // const promiseResult = await addNewTournamentToCollection({},[]); // async/await sugar syntax for promise
            // console.log(promiseResult);

        } catch (error) {
            console.log('try/catch blad: ', error.message);//wyświetlić text błędu
        }
    }

    const navigation = useNavigation();


    const renderItem = item => {
        return (
            <View style={styles.listStyle}>

                <TouchableOpacity style={styles.itemStyle}
                    onPress={() => {
                        navigation.navigate(SCREEN.TOURNAMENTDETAILS, {
                            id: item.id
                        });
                    }}
                >
                    <Text style={styles.textDark}>
                        <Text>{item.name}</Text>
                        <Text>{item.date}</Text>
                        <Text>{item.place}</Text>
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
                                <View style={styles.datePicker}>
                                <Text style={styles.textDark}>Data rozpoczęcia</Text>
                                <DatePicker date={date} onDateChange={setDate} minimumDate={new Date()} />
                                </View>
                                
                                <View>
                                <Text style={styles.textDark}>Data zakończenia</Text> 
                                <DatePicker date={minimumEndDate} onDateChange={setEndDate} minimumDate={minimumEndDate} />
                                </View>
                                
                                <TextInput
                                    style={styles.textDark}
                                    onChangeText={setLinkInput}
                                    value={linkInput}
                                    placeholder="Link do strony..."
                                />

                                <View style={styles.ticketStyle}>

                                    <Text style={styles.textDark}>Bilety</Text>
                                    {isCreatorVisible && (
                                        <TicketTypeCreator onTicketTypeAdd={handleTicketTypeAdd} />
                                    )}
                                    <Text style={styles.textDark}>{JSON.stringify(ticketTypes)}</Text>

                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => { setIsCreatorVisible(true) }}>
                                        <Text style={styles.textButton}>Dodaj bilet  </Text>
                                    </TouchableOpacity>
                                </View>


                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        width: '100%',
                                        padding: 10,
                                    }}>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => {
                                            setIsModalAddTournamentVisible(!isModalAddTournamentVisible);
                                            setNameInput('');
                                        }}>
                                        <Text style={styles.textButton}>Zamknij</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => {
                                            clearInputs();
                                        }}>
                                        <Text style={styles.textButton}>Wyczyść</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => {
                                            onSavePress();
                                        }}>
                                        <Text style={styles.textButton}>Zapisz wydarzenie</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                    </Modal>
                )
                }

                <FlatList
                    data={tournamentList}
                    renderItem={({ item }) => renderItem(item)} //do renderItem przekazujemy wartośc funkcji renderItem
                    keyExtractor={(item, index) => index.toString()}
                    style={styles.container}
                    withSearchbar={true}
                />
                

            </View >
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
    image: { height: 70, width: 110, flexBasis: '20%' },
    textContainer: {
        textAlign: 'center',
        flexBasis: '70%',
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
        fontSize: 16,
        padding: 10,
        flexDirection: 'column',
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
        flexDirection: 'row',
        width: 250,
        padding: 2,
        marginBottom: 5,
        color: '#005b98',
        backgroundColor: "white",
        marginRight: 2,
        marginLeft: 2,
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
    ticketStyle: {
        backgroundColor: '#e3ecf2',
        alignItems: 'center',
        borderRadius: 15,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
        margin: 10,
        justifyContent: 'center',
        borderRadius: 20,
    },
    datePicker:{
        paddingVertical: 40,
    }

})