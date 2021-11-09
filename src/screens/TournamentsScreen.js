import React from 'react';
import { useTournaments } from '../hooks/useTournaments';
import {
View,
Text,
StyleSheet,
} from 'react-native';
const TournamentsScreen = () => {
status
    useTournaments()

    return (
        <>
        {/*<CustomHeader/>*/}
        <View style={styles.mainBody}>
            <Text style={styles.text}>Tournaments List</Text>
        </View>
        </>
    )
}

export default TournamentsScreen;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#1a112b',
        alignItems: 'center',
    },
    text:{
        color: 'white',
    }
})