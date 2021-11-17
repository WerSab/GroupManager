import React from 'react';
import { useTournaments } from '../hooks/useTournaments';
import { useNavigation } from '@react-navigation/core';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';

const TournamentDetails = () => {

    const renderItem = item => {
        return (
            <>

            </>
        )
    }

    return (
        <>
            <View style={styles.mainBody}>
                <Text style={styles.text}>TournamentDetails</Text>
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
export default TournamentDetails;
const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#1a112b',
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
        padding: 15,
        marginBottom: 5,
        color: '#27046d',
        backgroundColor: "white",
        marginRight: 20,
        marginLeft: 20,
        borderRadius: 5,
        borderWidth: 1,
        textAlign: 'center',
        fontSize: 16
    },
})