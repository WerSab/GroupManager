import React, { useContext } from 'react';
import { useUsers } from '../hooks/useUsers';
import {
    View,
    Text,
    StyleSheet,
        } from 'react-native';
import { UserContext } from '../context/UserContextProvider';
import {getUsers}  from '../users-examples';

function getUserFromContext(context, userId) {
    const {data} = context;
    return users.find(function (user) {
        return user.id === userId;
    });
};

function UserDetails({ route }) {
    //const { id } = route.params;- ten lub poniższy sposób
    const id = route.params.id;
    // odczytuje obiekt user przekazany do route'a jako parametr -> const user = route.params.user;
    const userContext = useContext(UserContext);
    const user = getUserFromContext(userContext, id);
    console.log("user.lastName", user.lastName);
    return (
        <View style={styles.mainBody}>

            <Text style={styles.text}>{user.firstName} {user.lastName}{'\n'}</Text>
            <Text style={styles.text}></Text>
        </View>
        //{JSON.stringify(user, null, 2)}
    );
}
export default UserDetails;
const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        //justifyContent: 'center',
        backgroundColor: '#015a92',

    },
    text: {
        color: 'white',
        fontSize: 20,
        padding: 40,
    },
    container: {
        flex: 1,
    },
    listStyle: {
        padding: 15,
        marginBottom: 5,
        color: '#27046d',
        backgroundColor: "white",
        marginRight: 20,
        marginLeft: 20,
        borderRadius: 5,
        borderWidth: 1,
        textAlign: 'center',
        fontSize: 16
    },
    buttonStyle: {
        backgroundColor: 'white',
        borderWidth: 0,
        borderColor: '#3175ab',
        height: 40,
        alignItems: 'center',
        borderRadius: 15,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
        margin: 10,
    },
    buttonTextStyle: {
        color: '#015a92',
        paddingVertical: 10,
        fontSize: 16,
    },
})