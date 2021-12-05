import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import { SCREEN } from '../navigation/screens';
import { FlatGrid, SectionGrid } from 'react-native-super-grid';
import signedOut from '../assets/icons/signedOut.png'
import { signOutFirebaseUser } from '../fireBase/authentication-methods';

const ManagerScreen = () => {
    const navigation = useNavigation();
    const [isSigningOut, setIsSigningOut] = useState(false);
    /*useEffect(() => {
        navigation.navigate(SCREEN.TOURNAMENTLIST);
    }
    
    )*/
    const data = [
        { name: SCREEN.TOURNAMENTLIST },
        { name: SCREEN.USERSLIST },
    ]

    //const onSignOutFunction = isSigningOut ? undefined : onSignOutPress;

    const renderItem = item => {

        return (
            <View style={[styles.itemContainer, { backgroundColor: "#015a92" }]}>
                <TouchableOpacity
                    onPress={() => {
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
                <View style={styles.buttonContainer}>
                    <Text style={styles.text}>Hello Manager</Text>
                    <TouchableOpacity

                        onPress={isSigningOut ? undefined : () => {
                            setIsSigningOut(true);
                            signOutFirebaseUser();
                        }}
                    >
                        <Image style={styles.icon} source={signedOut} />
                    </TouchableOpacity>
                </View>
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        width: '100%',

    },
    text: {
        color: '#015a92',
        fontSize: 20,
        padding: 30,
    },
    icon: {
        padding: 15,
        height: 30,
        width: 30,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 15,
        margin: 10,
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
        backgroundColor: '#015a92',
    },
    itemName: {
        fontSize: 16,
        color: 'white',
        fontWeight: '600',
    },

})