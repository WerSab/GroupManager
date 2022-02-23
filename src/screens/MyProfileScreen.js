import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState, useContext } from 'react';
import { useUsers } from '../hooks/useUsers';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import { UserContext } from '../context/UserContextProvider';

const MyProfileScreen = () => {
    const currentUser = useContext(UserContext);
    console.log("current user", currentUser)
    
    return (
        <View style={styles.mainBody}>
            <View style={styles.buttonContainer}>
                <Text style={styles.text}>Mój profil
                {'\n'}{'\n'}Imię: {currentUser.data.firstName}
                {'\n'}{'\n'}Nazwisko:  {currentUser.data.lastName}
                {'\n'}{'\n'}Miasto:  {currentUser.data.city}
                {'\n'}{'\n'}Telefon:  {currentUser.data.phone}
                {'\n'}{'\n'}Status w aplikacji:  {currentUser.data.role}
                </Text>
            </View>
        </View>
    )
}

export default MyProfileScreen;

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
        padding: 30,
    },
    textDark: {
        color: '#005b98',
        fontSize: 20,
        padding: 20,
    },
    container: {
        flex: 2,
    },
    listStyle: {
        flexDirection: 'row',
        padding: 15,
        marginBottom: 5,
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
        elevation: 5,
        margin: '10%',
    },
})