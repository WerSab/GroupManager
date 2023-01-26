//pobrać wszystkich użytkowników getUsers(przenieść metodę z przykładów do lepszego miejsca)

import React from 'react';
import {useUsers} from '../hooks/useUsers';
import {useNavigation} from '@react-navigation/core';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {SCREEN} from '../navigation/screens';
const UsersScreen = () => {
  const navigation = useNavigation();
  const [usersList, isLoaded, error] = useUsers();
  console.log('usersList', usersList);

  const renderItem = item => {
    return (
      <>
        <Text style={styles.listStyle}>
          {item.firstName} {item.lastName} - {item.role}
        </Text>
      </>
    );
  };

  return (
    <>
      {/*<CustomHeader/>*/}
      <View style={styles.mainBody}>
        <Text style={styles.text}>Użytkownicy</Text>
        <FlatList
          data={usersList}
          renderItem={({item}) => renderItem(item)} //do renderItem przekazujemy wartośc funkcji renderItem
          keyExtractor={(item, index) => index.toString()}
          style={styles.container}
          withSearchbar={false}
        />
      </View>
    </>
  );
};

export default UsersScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#C5EEFF',
    alignItems: 'center',
  },
  text: {
    color: '#015a92',
    fontSize: 20,
    padding: 30,
  },
  container: {
    flex: 1,
  },
  listStyle: {
    padding: 15,
    marginBottom: 5,
    color: '#015a92',
    backgroundColor: 'white',
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 5,
    borderWidth: 0,
    textAlign: 'center',
    fontSize: 16,
  },
});
