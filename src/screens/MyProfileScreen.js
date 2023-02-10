import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState, useContext} from 'react';
import {useUsers} from '../hooks/useUsers';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {UserContext} from '../context/UserContextProvider';
import {ScrollView} from 'react-native-gesture-handler';

const MyProfileScreen = () => {
  const currentUser = useContext(UserContext);
  console.log('current user', currentUser);

  return (
    <View style={styles.mainBody}>
      <ScrollView>
        <Text style={styles.title}> Mój profil</Text>
        <Text style={styles.listStyle}>
          <Text style={styles.textDark}>
            Imię: {currentUser.data.firstName}
          </Text>

          {'\n'}
          <Text style={styles.textDark}>
            Nazwisko: {currentUser.data.lastName}
          </Text>
          {'\n'}
          <Text style={styles.textDark}>Miasto: {currentUser.data.city}</Text>
          {'\n'}
          <Text style={styles.textDark}>Telefon: {currentUser.data.phone}</Text>
          {'\n'}
          <Text style={styles.textDark}>
            Status w aplikacji: {currentUser.data.role}
          </Text>
        </Text>
      </ScrollView>
    </View>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#C5EEFF',
  },
  title: {
    color: '#005b98',
    fontSize: 20,
    padding: 15,
  },

  textDark: {
    color: '#005b98',
    fontSize: 16,
    padding: 20,
  },

  listStyle: {
    marginBottom: 5,
    color: '#005b98',
    backgroundColor: 'white',
    marginRight: 20,
    marginLeft: 20,
    textAlign: 'left',
    paddingVertical: 20,
    padding: 20,
  },
});
