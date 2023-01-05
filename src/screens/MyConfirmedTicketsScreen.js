//odliczanie czasu=> w local stroage pobrac info kiedy był czyszczenie starych bietów (pamiętac, że na początku ma być null lub zero)

// pobieram informacje ze storage'u kiedy byly "czyszczone" bilety (bedzie ona przechowywana pod kluczem np. tickets-cleared-at: DATE | undefined)
// 1. tickets-cleared-at istnieje to: analizuje czy czyszczenie jest wymagane w tym momencie
// 2. tickets-cleared-at nie istnieje: od razu wykonuje czyszczenie biletow

// tickets -> tournament(ref) -> tournament(ref).id
// tickets.where(tournament == 'tournaments/tournamentId');

import {useNavigation} from '@react-navigation/core';
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {Button} from 'react-native-elements';
import {getTournamentFromContext} from '../common/context-methods';
import {TicketContext} from '../context/TicketContextProvider';
import {TournamentContext} from '../context/TournamentContextProvider';
import {UserContext} from '../context/UserContextProvider';
import {SCREEN} from '../navigation/screens';
import {
  deleteOutdatedTickets,
  getCurrentDate,
  getDayFromMillis,
  setNewCleanUpDate,
} from '../store/localStore';
import {getUserTickets} from '../firebase/firestore-ticket-methods';
import ErrorScreen from './ErrorScreen';
import {ScrollView} from 'react-native-gesture-handler';

const MyConfirmedTicketsScreen = ({route}) => {
  const [myTickets, setMyTickets] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const userContext = useContext(UserContext);
  const userID = userContext.user.uid;

  useEffect(() => {
    Promise.resolve();
    getUserTickets(userID)
      .then(result => {
        setMyTickets(result);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.buttonContainer}>
        <Text style={styles.textDark}>Ładuje się</Text>
      </View>
    );
  }
  if (error) {
    return <ErrorScreen errorMessage={error.message} />;
  }
  if (!myTickets && myTickets.length === 0) {
    return (
      <View style={styles.buttonContainer}>
        <Text style={styles.text}>Nie posiadasz żadnych biletów.</Text>
      </View>
    );
  }
  const renderItem = item => {
    return (
      <View style={styles.listStyle} key={item.id}>
        <Text style={styles.itemStyle}>
          {'\n'}
          <Text style={styles.textBold}>Kod zamówienia:</Text>{' '}
          <Text>{item.id}</Text>
          {'\n'}
          <Text style={styles.textBold}>Koszt biletów:</Text>{' '}
          <Text>{item.price}</Text> <Text>zł.</Text>
          {'\n'}
          <Text style={styles.textBold}>Ilość biletów:</Text>
          <Text> {item.slots} </Text>
        </Text>
      </View>
    );
  };

  const myTicketList = myTickets.map(ticket => renderItem(ticket));

  return (
    <View style={styles.mainBody}>
      <View style={styles.buttonContainer}>
        <Text style={styles.text}>Moje Bilety:</Text>
        <ScrollView>{myTicketList}</ScrollView>
        {/* // TODO: zadanie
                //zadanie!!!!- pomapowac bilety - zamiana struktur java scriptowych na komponenty Reactowe (żeby je mozna było wyswuetlić w komponnetach View, text itd.) */}

        {/* <FlatList
                    data={myTicketList}
                    renderItem={({ item }) => renderItem(item)} 
                    keyExtractor={(item, index) => index.toString()}
                    style={styles.container}
                    withSearchbar={false}
                /> */}
      </View>
    </View>
  );
};

export default MyConfirmedTicketsScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#005b98',
    alignItems: 'center',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#005b98',
    width: '100%',
  },
  singleButtonView: {
    flexDirection: 'row',
    textAlign: 'right',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  text: {
    color: 'white',
    fontSize: 25,
    padding: 10,
  },
  textBold: {
    color: '#005b98',
    fontSize: 16,
    padding: 10,
    fontWeight: 'bold',
  },
  textDark: {
    color: '#005b98',
    fontSize: 20,
    padding: 20,
  },
  container: {
    flex: 2,
  },
  listStyle: {
    flexDirection: 'row',
    padding: 5,
    marginBottom: 5,
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemStyle: {
    flexDirection: 'column',
    width: '95%',
    padding: 7,
    marginBottom: 5,
    color: '#005b98',
    backgroundColor: 'white',
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 5,
    textAlign: 'left',
    fontSize: 15,
    alignItems: 'center',
  },
  icon_1: {
    height: 40,
    width: 40,
    justifyContent: 'flex-end',
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
    justifyContent: 'flex-end',
  },
  deleteButton: {
    flexDirection: 'row',
    borderRadius: 10,
    paddingVertical: -5,
    paddingHorizontal: -5,
    elevation: 1,
    width: '100%',
    backgroundColor: '#eeedef',
    justifyContent: 'space-between',
  },
  modalView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    elevation: 5,
    margin: '10%',
  },
});
