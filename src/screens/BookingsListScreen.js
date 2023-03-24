import {useNavigation} from '@react-navigation/core';
import React, {useContext, useEffect, useState} from 'react';
import {SCREEN} from '../navigation/screens';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {
  getTicketsOrdersList,
  updateTicketPaymentStatus,
  updateTicketPaymentStatusToPaid,
  updateTicketPaymentStatusToUnPaid,
} from '../firebase/firestore-ticket-methods';
import {Button} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';

const BookingsListScreen = () => {
  //const navigation = useNavigation();
  const [myTickets, setMyTickets] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [isButtonConfirmedDisabled, setIsButtonConfirmedDisabled] =
    useState(false);
  const [isButtonUndoDisabled, setIsButtonUndoDisabled] = useState(false);

  useEffect(() => {
    getTicketsOrdersList()
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
          <Text style={styles.textBold}>Kod zamówienia:</Text>
          <Text> {item.id}</Text>
          {'\n'}
          <Text style={styles.textBold}>Razem do zapłaty:</Text>
          <Text> {item.price}</Text> <Text>zł.</Text>
        </Text>
        <View style={styles.itemView}>
          <Button
            activeOpacity={2}
            color="#47b8ce"
            title="Zatwierdź"
            disabled={isButtonConfirmedDisabled}
            onPress={() => {
              updateTicketPaymentStatusToPaid(item.id);
              setIsButtonConfirmedDisabled(true);
              setIsButtonUndoDisabled(false);
            }}
          />

          <Button
            activeOpacity={2}
            color="#47b8ce"
            title="Cofnij zatwierdź"
            disabled={isButtonUndoDisabled}
            onPress={() => {
              updateTicketPaymentStatusToUnPaid(item.id);
              setIsButtonUndoDisabled(true);
              setIsButtonConfirmedDisabled(false);
            }}
          />
        </View>
      </View>
    );
  };

  const myTicketList = myTickets.map(ticket => renderItem(ticket));

  return (
    <View style={styles.mainBody}>
      <View style={styles.buttonContainer}>
        <Text style={styles.textDark}>Rezerwacje biletów:</Text>
        <ScrollView>{myTicketList}</ScrollView>
      </View>
    </View>
  );
};

export default BookingsListScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#C5EEFF',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#C5EEFF',
    width: '100%',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#C5EEFF',
    width: '100%',
  },
  singleButtonView: {
    flexDirection: 'row',
    textAlign: 'right',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  itemView: {
    flexDirection: 'column',
    padding: 10,
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
    width: '65%',
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
