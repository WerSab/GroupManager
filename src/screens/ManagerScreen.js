import React from 'react';
import {
View,
Text,
StyleSheet,
} from 'react-native';



const ManagerScreen = () => {

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