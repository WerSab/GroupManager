import { useNavigation } from '@react-navigation/core';
import React, { useEffect } from 'react';
import {
View,
Text,
StyleSheet,
} from 'react-native';
import { SCREEN } from '../navigation/screens';
import TournamentsScreen from './TournamentsScreen';



const ManagerScreen = () => {
const navigation = useNavigation();
useEffect(() => {
    navigation.navigate(SCREEN.TOURNAMENTLIST);
}

)
    return (
        <>
        {/*<CustomHeader/>*/}
        <View style={styles.mainBody}>
            <Text style={styles.text}>Hello Manager</Text>
        </View>
        </>
    )
}

export default ManagerScreen;

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