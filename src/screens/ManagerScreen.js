import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import { SCREEN } from '../navigation/screens';
import { FlatGrid} from 'react-native-super-grid';
import signedOut from '../assets/icons/signedOut.png'
import { UserContext } from '../context/UserContextProvider';
import { signOutFirebaseUser } from '../fireBase/authentication-methods';

//napisać  wspólną funkcję w screen do player tab i manager tab
const SCREEN_TAB = Object.values(SCREEN.MANAGER_TAB).map((element) => {
    return {
        name: element,
    }
});

const ManagerScreen = () => {
    const navigation = useNavigation();
    const [isSigningOut, setIsSigningOut] = useState(false);
    const currentUser = useContext(UserContext);
    /*useEffect(() => {
        navigation.navigate(SCREEN.TOURNAMENTLIST);
    }
    
    )*/
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
                    <Text style={styles.text}>Witaj  {currentUser.data.firstName} {currentUser.data.lastName}
                    {'\n'}{currentUser.data.role}
                    </Text>
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
                    data={SCREEN_TAB}
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