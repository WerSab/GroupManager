//UUID?? - id ticket
//odliczanie czasu - przy rezerwacji biletu np. 2 dni
//wyświetlanie rezerwacji na ekranach booking (u managera i playera)
//licznik rezerwacji - update slots w tournamentCollection_ ticketTypes_slots
//ustawienie blokady if slots==0 => alert (brak biletów) && buttons zatwierdz i przelicz inactive
//screen moje rezerwacje = wrzucic info o zarezerwowanych biletach jako oczekujące na potwierdzenie i potwierdzone po zapłaceniu


//odliczanie czasu=> w local stroage pobrac info kiedy był czyszczenie starych bietów (pamiętac, że na początku ma być null lub zero)
// pobieram informacje ze storage'u kiedy byly "czyszczone" bilety (bedzie ona przechowywana pod kluczem np. tickets-cleared-at: DATE | undefined)

// 1. tickets-cleared-at istnieje to: analizuje czy czyszczenie jest wymagane w tym momencie
// 2. tickets-cleared-at nie istnieje: od razu wykonuje czyszczenie biletow
import { useNavigation } from '@react-navigation/core';
import React, { useContext, useState, } from 'react';
import { SCREEN } from '../navigation/screens';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    TextInput,
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView,
    Button,
} from 'react-native';
import { updateTicketOrdersToTournament } from '../tournaments-examples';
import { addNewTicketOrderToCollection } from '../ticket-examples';
import { updateTicketOrdersToUser } from '../users-examples';
import { UserContext } from '../context/UserContextProvider';
import { TournamentContext } from '../context/TournamentContextProvider';
import { getTournamentFromContext } from '../common/context-methods';
import { getCollection } from '../fireBase/firestore-Helper';
import { FIRESTORE_COLLECTION } from '../config';
import { setDateTicketClearedAt } from '../store/localStore';


const TicketOrderingScreen = ({ route }) => {
    const userContext = useContext(UserContext);
    const { tournamentId, ticketType } = route.params;
    const tournamentContext = useContext(TournamentContext);
    const tournament = getTournamentFromContext(tournamentContext, tournamentId);
    const navigation = useNavigation();
    const { user } = userContext;
    const [takenSlots, setTakenSlots] = useState(String(0));
    const [finalPrice, setFinalPrice] = useState(0);
    const [status, setStatus] = useState();
    
    function getCalculatedOrderPrice() {
        const price = ticketType.price;
        price!=0?setStatus('unpaid'): setStatus('paid');
        return Math.round(price * parseInt(takenSlots) * 100) / 100;//zaokrąglenie
    }

    const handleFinalPriceBlur = () => {
        const total = getCalculatedOrderPrice();
        setFinalPrice(total);

    }
    const onSaveTicketOrders = () => {
        const parsedTakenSlots = parseInt(takenSlots)
        if (isNaN(parsedTakenSlots) || parsedTakenSlots <= 0) {
            Alert.alert('Wystąpił błąd', `Prosze wprowadzić liczbę`, [
                { text: 'Ok' },
            ])
            return;
        }

        // tournaments -> [doc1,doc2,doc3] -> ticketTypes -> [doc1,doc2,doc3]
        // tournaments -> doc(id) -> ticketType(id)
        const ticketTypeReference = getCollection(FIRESTORE_COLLECTION.TOURNAMENTS)
            .doc(tournamentId)
            .collection(FIRESTORE_COLLECTION.SUB_COLLECTION.TICKET_TYPES)
            .doc(ticketType.id);
        const tournamentReference = getCollection(FIRESTORE_COLLECTION.TOURNAMENTS)
            .doc(tournamentId);

        const userReference = getCollection(FIRESTORE_COLLECTION.USERS)
            .doc(user.uid)


        const data = {
            ticketType: ticketTypeReference,
            tournament: tournamentReference,
            user: userReference,
            slots: parsedTakenSlots,
            price: finalPrice,
            status: status,
        };
        //blokowanie buttona zatwierdź na inactive
        addNewTicketOrderToCollection(data)
            .then((ticketOrderDocumentReference) => {
                navigation.navigate(SCREEN.TICKET_PAYMENT_SUMMARY,
                    {
                        ticketOrderDocumentReference,
                        
                    }
                )
                console.log('ticketOrderDocumentReference', ticketOrderDocumentReference);
                //odblokowanie buttona zatwierdź
            })
            .catch(function (err) {
                Alert.alert('Wystąpił błąd', `Przepraszamy mamy problem z serwerem, prosze spróbować później`, [
                    { text: 'Ok' },
                ]);
                console.log("OrdersScreen error: ", err);
            });

                    
    }

    return (
        <View style={styles.mainBody}>
            <KeyboardAvoidingView enabled>
                <SafeAreaView>
                    <ScrollView>
                        <Text style={styles.headline} > {tournament.name}</Text>
                        <Text style={styles.buttonTextStyle} > Cena pojedyńczego biletu : {ticketType.price} zł. </Text>
                        <View style={styles.SectionStyle}>

                            <Text style={styles.buttonTextStyle} > Ilość biletów :  </Text>


                            <TextInput
                                onBlur={handleFinalPriceBlur}
                                style={styles.inputStyle}
                                onChangeText={(text) =>
                                    setTakenSlots(text)
                                }
                                value={takenSlots}
                                underlineColorAndroid="#f000"
                                placeholder="Wpisz ilość biletów..."
                                placeholderTextColor="#8b9cb5"
                            />
                        </View>
                        {/* <View >
                            <Text style={styles.buttonTextStyleDark} >
                                <Button
                                    activeOpacity={2}
                                    color='#47b8ce'
                                    title="Przelicz"
                                    onPress={() => {
                                        setFinalPrice(getCalculatedOrderPrice());
                                    }}
                                />
                            </Text>
                        </View> */}
                        <Text style={styles.buttonTextStyle} > Razem do zapłaty : {finalPrice} zł. </Text>
                        <Text style={styles.buttonTextStyleDark} >
                            <Button
                                activeOpacity={2}
                                color='#47b8ce'
                                title="Zatwierdź"
                                onPress={() => {
                                    onSaveTicketOrders();

                                }}
                            />
                        </Text>
                    </ScrollView>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </View>
    )
}
export default TicketOrderingScreen;
const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#015a92',
        alignContent: 'center',
    },
    headline: {
        alignSelf: 'center',
        color: 'white',
        paddingVertical: 50,
        paddingHorizontal: 2,
        fontSize: 22,
    },
    SectionStyle: {
        flexDirection: 'row',
        borderColor: '#3175ab',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: 'white',
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
    },
    buttonTextStyle: {
        color: 'white',
        paddingVertical: 10,
        fontSize: 18,
    },
    buttonTextStyleDark: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        color: '#015a92',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        color: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#3175ab',
    },

    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },

});
