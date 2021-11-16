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