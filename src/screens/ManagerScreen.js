import React from 'react';
import {
View,
Text,
StyleSheet,
} from 'react-native';


const ManagerScreen = () => {

    return (
        <View style={StyleSheet.mainBody}>
            <Text>Hello Manager</Text>
        </View>
    )
}

export default ManagerScreen;

style = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#1a112b',
        alignContent: 'center',
    },
})