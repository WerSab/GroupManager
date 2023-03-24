import React, {useContext, useState, useCallback} from 'react';
import {useNavigation} from '@react-navigation/core';
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import addIcon from '../assets/icons/add.png';
import deleteIcon from '../assets/icons/delete.png';
import {Picker} from '@react-native-picker/picker';
import {SCREEN} from '../navigation/screens';
import {
  addNewTournamentToCollection,
  deleteTournament,
} from '../firebase/firestore-tournament-methods';
import {TournamentContext} from '../context/TournamentContextProvider';
import {TicketTypeCreator} from './TicketTypeCreator';
import {
  validateTournament,
  validateTournmanetFields,
} from '../firebase/firestore-model-validators';
import DatePicker from 'react-native-date-picker';

const MIN_EVENT_DURATION_IN_MILLIS = 60 * 1000;

const TournamentsScreen = () => {
  // Zaznaczanie takich samych wystapein -> ctrl+d
  // ctrl+z -> cofnij
  const {tournamentList, isLoaded, error, actions} =
    useContext(TournamentContext);

  const deleteAlert = (id, name) => {
    Alert.alert('Delete alert', `Do You want to delete ${name}?`, [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
      {
        text: 'Ok',
        onPress: () => {
          deleteTournament(id)
            .then(() => {
              actions.requeryTournaments();
            })
            .catch(function (err) {
              Alert.alert('Spróbuj ponownie później');
            });
        },
      },
    ]);
  };

  const navigation = useNavigation();

  const renderItem = item => {
    return (
      <View>
        <TouchableOpacity
          style={styles.listStyle}
          onPress={() => {
            navigation.navigate(SCREEN.TOURNAMENTDETAILS, {
              id: item.id,
            });
          }}
        >
          <Text style={styles.textDark}>
            <Text>{item.name}</Text>
          </Text>

          <TouchableOpacity onPress={() => deleteAlert(item.id, item.name)}>
            <Image source={deleteIcon} style={styles.icon} />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <View style={styles.mainBody}>
        <View style={styles.title}>
          <Text style={styles.text}>Wydarzenia </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(SCREEN.TOURNAMENT_CREATOR)}
          >
            <Image style={styles.icon_1} source={addIcon} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={tournamentList}
          renderItem={({item}) => renderItem(item)} //do renderItem przekazujemy wartośc funkcji renderItem
          keyExtractor={(item, index) => index.toString()}
          style={styles.container}
          withSearchbar={true}
        />
      </View>
    </>
  );
};

export default TournamentsScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#C5EEFF',
    alignItems: 'center',
  },
  image: {height: 70, width: 110, flexBasis: '20%'},
  textContainer: {
    textAlign: 'center',
    flexBasis: '70%',
  },

  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#C5EEFF',
    width: '100%',
  },
  textHeader: {
    color: '#005b98',
    fontSize: 20,
    padding: 10,
  },
  text: {
    color: '#005b98',
    fontSize: 20,
    padding: 10,
  },
  textDark: {
    color: '#005b98',
    fontSize: 18,
    padding: 10,
    flexDirection: 'column',
  },

  container: {
    flex: 2,
  },
  listStyle: {
    flexDirection: 'row',
    padding: 15,
    marginStart: 20,
    marginEnd: 20,
    marginTop: 20,
    color: '#005b98',
    backgroundColor: 'white',
    borderRadius: 5,
    fontSize: 19,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  icon_1: {
    padding: 15,
    height: 30,
    width: 30,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 15,
    margin: 10,
  },
  icon: {
    height: 25,
    width: 25,
  },

  modalView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    margin: '2%',
  },
  button: {
    backgroundColor: '#005b98',
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
    justifyContent: 'center',
  },
  ticketStyle: {
    backgroundColor: '#e3ecf2',
    alignItems: 'center',
    borderRadius: 15,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
    margin: 10,
    justifyContent: 'center',
    borderRadius: 20,
  },
  datePicker: {
    paddingVertical: 40,
  },
});
