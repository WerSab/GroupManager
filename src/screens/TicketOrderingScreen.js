import { NavigationContainer, useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
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

const TicketOrderingScreen = ({ route }) => {

    const [slots, setSlots] = useState(null);
    const [finalPrice, setFinalPrice] = useState(0);
    const parsedSlots = parseInt(slots);
    const tournamentName= route.params.tournamentName;

    const data = {
        ticketTypesId: route.params.ticketTypesId,
        tournamentId: route.params.tournamentId,
        userId: route.params.userId,
        pricePerTicket: route.params.ticketTypesPrice,
        slots: parsedSlots,
    };

    function orderValue() {
        const price = data.pricePerTicket;
        const slots = data.slots;
        return price * slots;
    }

    
    console.log('finalPrice', finalPrice)

    const id = data.tournamentId;
    const uid = data.userId;

    const onSaveTicketOrders = () => {
        // const parsedTicketOrders = parseInt(data);
        // if (isNaN(parsedTicketOrders)) {
        //     Alert.alert('Wystąpił błąd', `Prosze wprowadzić liczbę`, [
        //         { text: 'Ok' },
        //     ])
        //     return undefined;
        // }
        addNewTicketOrderToCollection(data)

            .then(() => {
                updateTicketOrdersToTournament(id, data)
            })
            .then(() => {
                updateTicketOrdersToUser(uid, data)
            })
            .catch(function (err) {
                Alert.alert('Wystąpił błąd', `Przepraszamy mamy problem z serwerem, prosze spróbować później`, [
                    { text: 'Ok' },
                ]);
                console.log("OrdersScreen error: ", err);
            })

    }

    return (
        <View style={styles.mainBody}>
            <KeyboardAvoidingView enabled>
                <SafeAreaView>
                    <ScrollView>
                    <Text style={styles.headline} > {tournamentName}</Text>
                        <Text style={styles.buttonTextStyle} > Cena pojedyńczego biletu : {data.pricePerTicket} zł. </Text>
                        <View style={styles.SectionStyle}>

                            <Text style={styles.buttonTextStyle} > Ilość biletów :  </Text>


                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(text) =>
                                    setSlots(text)
                                }
                                value={slots}
                                underlineColorAndroid="#f000"
                                placeholder="Wpisz ilość biletów..."
                                placeholderTextColor="#8b9cb5"
                            />
                        </View>
                        <View >
                        <Text style={styles.buttonTextStyleDark} >
                            <Button
                                activeOpacity={2}
                                color='#47b8ce'
                                title="Przelicz"
                                onPress={() => {
                                    orderValue();
                                    setFinalPrice(orderValue);
                                    console.log('orderValue', orderValue)
                                }}
                            />
</Text>
                        </View>
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
