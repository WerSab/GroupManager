import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { FIRESTORE_ROLES } from '../config';
import { FirebaseUserContext } from '../context/FireBaseUserProvider';
import { FirestoreDataContext } from '../context/FirestoreDataProvider';
import LoginScreen from './LoginScreen';
import PlayerScreen from './PlayerScreen';
import ManagerScreen from './ManagerScreen';
import CustomHeader from './Header';


/*
błedy przy odpalaniu: https://stackoverflow.com/questions/4709137/solution-to-install-failed-insufficient-storage-error-on-android
  Debugowanie na urzadzeniu fizycznym:

  - wlaczenie trybu debugowania w opcjach developerskich
  - 

*/

const MainScreen = ({navigation}) => {
  const userContext = useContext(FirebaseUserContext);
  const firestoreData = useContext(FirestoreDataContext);

  const initializing = userContext[1];
  const authUser = userContext[0];

  if (initializing) {
    return <ActivityIndicator size="large" color="#FCA542" />
  }

  // warunek ? spelniony : nie spelniony

  if (!authUser) {
    return <LoginScreen />;
  } /*if(authUser === undefined || authUser === null)
     {
        return <LoginScreen/>;
      }*/





  // firestoreData.role -> nawigacja

  const firestoreUserRole = firestoreData?.role;
  /*let firestoreUserRole = null;
  if(firestoreData) {
    firestoreUserRole = firestoreData.role;
  }*/

  //const screenToDisplay = firestoreUserRole === "player" ? <PlayerScreen/> : <ManagerScreen/>;
  //zrobić useEffect i w zalezności od stanu (określony screen) przełączać na ekran, funkcja useEffect wywołuje się wtedy gdy zmienia się rola użytkownika

  console.log(firestoreUserRole);
  switch (firestoreUserRole) {
    case FIRESTORE_ROLES.PLAYER:// wrzucenie zmiennych do config i odwołanie się do nich
      return <PlayerScreen />;
    case FIRESTORE_ROLES.MANAGER:
      navigation.navigate('ManagerScreen');
      //return <ManagerScreen />
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
    <>
      {/*<CustomHeader/>*/}
    <View style={styles.mainBody}>
      <Text>Home Screen</Text>
    </View>
    </>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1a112b',
    alignContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});
