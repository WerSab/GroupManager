import { useNavigation } from '@react-navigation/core';
import React, { useEffect } from 'react';
import {
View,
Text,
StyleSheet,
} from 'react-native';
import { SCREEN } from '../navigation/screens';
import UsersScreen from './UsersScreen';


const PlayerScreen = () => {
    const navigation = useNavigation();
useEffect(() => {
    navigation.navigate(SCREEN.USERSLIST);
}
)
    return (
        <View style={styles.mainBody}>
            <Text style={styles.text}>Hello Player</Text>
        </View>
    )
}

export default PlayerScreen;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#1a112b',
        alignContent: 'center',
        
    },
    text:{
        color: 'white',
    }
})