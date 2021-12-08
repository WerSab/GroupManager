import React, { useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { SelectedUserContext } from '../context/SelectedUserContextProvider';

function getSelectedUserFromContext(context, userId) {
    const [users] = context;
    return users.find(function (user) {
        return user.id === userId;
    });
};
function UserDetails({ route }) {
    //const { id } = route.params;- ten lub poniższy sposób
    const id = route.params.id;
    const selectedUserContext = useContext(SelectedUserContext)
    const selectedUser = getSelectedUserFromContext(selectedUserContext, id)
    console.log('selectedUser', selectedUser)
    return (
        <>
            <View style={styles.mainBody}>
                 <Text style={styles.text}>{selectedUser.firstName} {selectedUser.lastName}</Text>
                <Text style={styles.listStyle}>
                rola: {selectedUser.role}
                {'\n'}
                {'\n'}
                tel: {selectedUser.phone}
                {'\n'}
                {'\n'}
                adres: {'\n'}{'\n'}
                {selectedUser.ulica}
                {selectedUser.nrdomu}/
                {selectedUser.mieszkanie}
                {'\n'}
                {selectedUser.kod} {selectedUser.city}
                
                
                 </Text> 

            </View>
        </>
    );
}
export default UserDetails;
const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#015a92',

    },
    text: {
        color: 'white',
        fontSize: 30,
        padding: 40,
    },
    container: {
        flex: 1,
    },
    listStyle: {
        padding: 40,
        marginBottom: 5,
        color: '#27046d',
        backgroundColor: "white",
        marginRight: 20,
        marginLeft: 20,
        borderRadius: 5,
        borderWidth: 1,
        textAlign: 'left',
        fontSize: 20
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