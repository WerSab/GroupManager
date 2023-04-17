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
  getPaidTickets,
  getTicketsOrdersList,
  updateTicketPaymentStatus,
  updateTicketPaymentStatusToPaid,
  updateTicketPaymentStatusToUnPaid,
} from '../firebase/firestore-ticket-methods';
import {Button} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {getPaidOrders} from '../firebase/firestore-order-methods';

const PaidOrdersListScreen = () => {
  //const navigation = useNavigation();
  const [orders, setOrders] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [isButtonConfirmedDisabled, setIsButtonConfirmedDisabled] =
    useState(false);
  const [isButtonUndoDisabled, setIsButtonUndoDisabled] = useState(false);
  useEffect(() => {
    getPaidOrders()
      .then(result => {
        setOrders(result);
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
  if (!orders && orders.length === 0) {
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
          <Text style={styles.textBold}>Zapłacono:</Text>
          <Text> {item.price}</Text> <Text>zł.</Text>
        </Text>
      </View>
    );
  };

  const ordersList = orders.map(ticket => renderItem(ticket));
  return (
    <View style={styles.mainBody}>
      <Text style={styles.textDark}>Zapłacone bilety</Text>
      <ScrollView>{ordersList}</ScrollView>
    </View>
  );
};

export default PaidOrdersListScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#C5EEFF',
    alignItems: 'flex-start',
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
    fontSize: 20,
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
    alignItems: 'center',
  },
  itemStyle: {
    flexDirection: 'column',
    width: '90%',
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
