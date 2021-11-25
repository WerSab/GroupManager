import React, { useContext } from 'react';
import { useTournaments } from '../hooks/useTournaments';
import { useNavigation } from '@react-navigation/core';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { SCREEN } from '../navigation/screens';
import { TournamentContext } from '../context/TournamentContextProvider';

const TournamentsScreen = ({tournamentList}) => {

    const navigation = useNavigation();
   
    const renderItem = item => {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(SCREEN.TOURNAMENTDETAILS, {
                           id: item.id
                        });
                   }}
                >
                    <Text style={styles.listStyle}>
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
                <Text style={styles.text}>Wydarzenia</Text>
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
    text: {
        color: 'white',
        fontSize: 20,
        padding: 30,
    },
    container: {
        flex: 1,
    },
    listStyle: {
        flexDirection: 'column',
        padding: 15,
        marginBottom: 5,
        color: '#005b98',
        backgroundColor: "white",
        marginRight: 20,
        marginLeft: 20,
        borderRadius: 5,
        borderWidth: 1,
        textAlign: 'center',
        fontSize: 16
    },
})