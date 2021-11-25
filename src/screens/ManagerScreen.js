import { useNavigation } from '@react-navigation/core';
import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { SCREEN } from '../navigation/screens';
import { FlatGrid, SectionGrid } from 'react-native-super-grid';




const ManagerScreen = () => {
    const navigation = useNavigation();
    /*useEffect(() => {
        navigation.navigate(SCREEN.TOURNAMENTLIST);
    }
    
    )*/
    const data = [
        { name: SCREEN.TOURNAMENTLIST },
        { name: SCREEN.USERSLIST },
    ]
   
    const renderItem = item => {
        
        return (
            <View style={[styles.itemContainer, { backgroundColor: "#e92255" }]}>
                <TouchableOpacity
                onPress = {() =>{
                    navigation.navigate(item.name)
                }}
                
                > 
                <Text style={styles.itemName}>{item.name}</Text>
                </TouchableOpacity>
            </View>
        );
    };
    return (
        <>
            {/*<CustomHeader/>*/}
            <View style={styles.mainBody}>
                <Text style={styles.text}>Hello Manager</Text>
                <FlatGrid
                    itemDimension={130}
                    data={data}
                    style={styles.gridView}
                    // staticDimension={300}
                    // fixed
                    // spacing={20}
                    renderItem={({ item }) => renderItem(item)}
                />

            </View>
        </>
    )
}

export default ManagerScreen;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    text: {
        color: '#e92255',
        fontSize: 20,
        padding: 30, 
    },
    gridView: {
        marginTop: 20,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        padding: 10,
        height: 150,
        backgroundColor: '#3175ab',
    },
    itemName: {
        fontSize: 16,
        color: 'white',
        fontWeight: '600',
    },
    
})