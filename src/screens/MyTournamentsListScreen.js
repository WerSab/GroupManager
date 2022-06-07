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
import { SCREEN } from '../navigation/screens';
import { TournamentContext } from '../context/TournamentContextProvider';
import { ScrollView } from 'react-native-gesture-handler';

const MyTournamentsListScreen = () => {

    const { tournamentList } = useContext(TournamentContext);

    const navigation = useNavigation();

    const renderItem = item => {
        return (
            <View style={styles.listStyle}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(SCREEN.MY_TOURNAMENTDETAILS, {
                            id: item.id
                        });
                    }}
                >
                    <Text style={styles.itemStyle}>
                        {item.name}
                    </Text>
                </TouchableOpacity>

            </View>
        )
    }

    return (
        <>
            {/*<CustomHeader/>*/}
            <View style={styles.mainBody}>
                <View style={styles.title}>
                    <Text style={styles.text}>Lista wydarzeń </Text>
                </View>
                
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

export default MyTournamentsListScreen;

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