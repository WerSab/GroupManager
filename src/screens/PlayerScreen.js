import React from 'react';
import {
View,
Text,
StyleSheet,
} from 'react-native';


const PlayerScreen = () => {

    return (
        <View style={StyleSheet.mainBody}>
            <Text>Hello Player</Text>
        </View>
    )
}

export default PlayerScreen;

style = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#1a112b',
        alignContent: 'center',
    },
})