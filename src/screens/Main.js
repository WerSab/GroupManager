import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FIRESTORE_ROLES } from '../config';
import { FirebaseUserContext } from '../context/FireBaseUserProvider';
import { FirestoreDataContext } from '../context/FirestoreDataProvider';
import LoginScreen from '../screens/LoginScreen';
import PlayerScreen from '../screens/PlayerScreen';
import ManagerScreen from '../screens/ManagerScreen';


/*
  Debugowanie na urzadzeniu fizycznym:

  - wlaczenie trybu debugowania w opcjach developerskich
  - 

*/

const Main = () => {
  console.log('tt');

  const userContext = useContext(FirebaseUserContext);
  const authUser = userContext[0];

  // warunek ? spelniony : nie spelniony
  console.log(authUser);
  if(!authUser) {
    return <LoginScreen/>;
  } /*if(authUser === undefined || authUser === null)
     {
        return <LoginScreen/>;
      }*/
  

  const firestoreData = useContext(FirestoreDataContext);



  // firestoreData.role -> nawigacja

  const firestoreUserRole = firestoreData?.role;
  /*let firestoreUserRole = null;
  if(firestoreData) {
    firestoreUserRole = firestoreData.role;
  }*/

  //const screenToDisplay = firestoreUserRole === "player" ? <PlayerScreen/> : <ManagerScreen/>;
  //zrobić useEffect i w zalezności od stanu (określony screen) przełączać na ekran, funkcja useEffect wywołuje się wtedy gdy zmienia się rola użytkownika
  
    switch (firestoreUserRole) {
      case FIRESTORE_ROLES.PLAYER:// wrzucenie zmiennych do config i odwołanie się do nich
        return <PlayerScreen />;
      case FIRESTORE_ROLES.MANAGER:
        return <ManagerScreen />
      default:
        return <LoginScreen />//jeżeli w bazie brasku7je informacji o roli to domyslnie odpala się login screen
    }

  return (
    /*{
      role === 'player' ? (
        <PlayerScreen/>
      ) : (
        <ManagerScreen/>
      )
    }*/
    <View style={styles.mainBody}>
      <Text>Home Screen</Text>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1a112b',
    alignContent: 'center',
  },
});
