import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

export function TicketTypeCreator(props) {
    const [ticketType, setTicketType] = useState({
        name: "",
        price: null,
        slots: null 
    });

    const handleStateChange = (field, text) => {
        console.log("Nazwa i wartość", field, text);
        setTicketType((prev) => ({
            ...prev,
            [field]: text
        }));
    };

    return (
        <View >
            <TextInput
                style={styles.textDark}
                onChangeText={(text) => handleStateChange("name", text)}
                value={ticketType.name}
                placeholder="Nazwa biletu..."
            />
            <TextInput
                style={styles.textDark}
                onChangeText={(text) => handleStateChange("price", text)}
                value={ticketType.price}
                placeholder="Cena biletu..."
            />
            <TextInput
                style={styles.textDark}
                onChangeText={(text) => handleStateChange("slots", text)}
                value={ticketType.slots}
                placeholder="Ilość miejsc..."
            />
            <TouchableOpacity
                style={styles.buttonTextStyle}

                onPress={() => {
                    props.onTicketTypeAdd(ticketType);
                    // onSavePrice();
                    // onSaveSlots();
                }}
            >
                <Text style={styles.textButton}>Zapisz bilet</Text>

            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#015a92',

    },
    text: {
        color: 'white',
        fontSize: 20,
        padding: 40,
    },
    textDark: {
        color: '#005b98',
        fontSize: 18,
        padding: 10,
    },
    container: {
        flex: 1,
    },
    listStyle: {
        padding: 40,
        marginBottom: 5,
        color: '#27046d',
        backgroundColor: "white",
        marginRight: 20,
        marginLeft: 20,
        borderRadius: 5,
        borderWidth: 1,
        textAlign: 'left',
        fontSize: 20
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
    textButton: {
        color: 'white',
        fontSize: 15,
        padding: 10,
    },
    buttonTextStyle: {

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
        color: 'white',

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
})
