//git push origin feature/remove-google-services:main --force
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import {FIRESTORE_ROLES} from '../config';
import {FirebaseUserContext} from '../context/FireBaseUserProvider';
import {FirestoreDataContext} from '../context/FirestoreDataProvider';
import LoginScreen from './LoginScreen';
import PlayerScreen from './PlayerScreen';
import ManagerScreen from './ManagerScreen';
import CustomHeader from './Header';

const MainScreen = ({navigation}) => {
  const userContext = useContext(FirebaseUserContext);
  const firestoreData = useContext(FirestoreDataContext);

  const authUser = userContext[0];
  const initializing = userContext[1];

  console.log('auth user: ', authUser);
  if (initializing) {
    return <ActivityIndicator size="large" color="#FCA542" />;
  }

  if (!authUser) {
    return <LoginScreen />;
  }

  const firestoreUserRole = firestoreData?.role;

  console.log(firestoreUserRole);
  switch (firestoreUserRole) {
    case FIRESTORE_ROLES.PLAYER:
      return <PlayerScreen />;
    case FIRESTORE_ROLES.MANAGER:
      navigation.navigate('ManagerScreen');

    default:
      return <LoginScreen />;
  }

  return (
    <>
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
    backgroundColor: '#008DD2',
    alignContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
