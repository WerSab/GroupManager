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

import {Button} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {
  getTicketsOrdersList,
  updateOrderPaymentStatusToPaid,
  updateOrderPaymentStatusToUnPaid,
} from '../firebase/firestore-order-methods';
import {useAsync} from '../hooks/useAsync';
import {ORDER_STATUS} from '../firebase/firestore-constants';

//zrobic na stanie listę z id do każdego zamówienia {orderId: bool/STATUS}

const BookingsListScreen = () => {
  const {data: orders, error, loading} = useAsync(getTicketsOrdersList);
  const [isButtonConfirmedDisabled, setIsButtonConfirmedDisabled] =
    useState(false);
  const [localOrders, setLocalOrders] = useState(orders);
  console.log('orders o Booking screen:', localOrders);

  const isOrderPaid = order => {
    return order.status === ORDER_STATUS.PAID;
  };

  const setOrderStatus = (orderId, status) => {
    setLocalOrders(prevLocalOrders => {
      return prevLocalOrders.map(order => {
        if (orderId !== order.id) {
          return order;
        }
        return {
          ...order,
          status,
        };
      });
    });
  };

  useEffect(() => {
    setLocalOrders(orders);
  }, [orders]);

  const handleConfirmPress = orderId => {
    updateOrderPaymentStatusToPaid(orderId)
      .then(() => {
        setOrderStatus(orderId, ORDER_STATUS.PAID);
      })
      .catch(function (err) {
        console.log('catch error in promise.catch:', err);
        Alert.alert(
          'Wystąpił błąd',
          `Przepraszamy mamy problem z serwerem, prosze spróbować później`,
          [{text: 'Ok'}],
        );
      });
  };

  const handleUndoPress = orderId => {
    updateOrderPaymentStatusToUnPaid(orderId)
      .then(() => {
        setOrderStatus(orderId, ORDER_STATUS.UNPAID);
      })
      .catch(function (err) {
        console.log('catch error in promise.catch:', err);
        Alert.alert(
          'Wystąpił błąd',
          `Przepraszamy mamy problem z serwerem, prosze spróbować później`,
          [{text: 'Ok'}],
        );
      });
  };

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
  if (!localOrders || localOrders.length === 0) {
    return (
      <View style={styles.buttonContainer}>
        <Text style={styles.text}>Nie posiadasz żadnych biletów.</Text>
      </View>
    );
  }

  const renderItem = item => {
    return (
      <View style={styles.listStyle} key={item.id}>
        <View style={styles.itemStyle}>
          <Text style={styles.textBold}>Kod zamówienia: {item.id}</Text>

          <Text style={styles.textBold}>
            Razem do zapłaty: {item.price} zł.
          </Text>
        </View>
        <View style={styles.buttonList}>
          <Button
            activeOpacity={2}
            color="#47b8ce"
            title="Zatwierdź"
            disabled={isOrderPaid(item)}
            onPress={() => handleConfirmPress(item.id)}
          />

          <Button
            activeOpacity={2}
            title="Cofnij"
            disabled={!isOrderPaid(item)}
            onPress={() => handleUndoPress(item.id)}
          />
        </View>
      </View>
    );
  };

  const myTicketList = localOrders.map(ticket => renderItem(ticket));

  return (
    <View style={styles.mainBody}>
      <View style={styles.buttonContainer}>
        <Text style={styles.textDark}>Rezerwacje biletów:</Text>
      </View>
      <ScrollView>{myTicketList}</ScrollView>
    </View>
  );
};

export default BookingsListScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    backgroundColor: '#C5EEFF',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
    width: '100%',
  },

  buttonList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
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
    marginBottom: 10,
    marginVertical: 20,
  },

  textBold: {
    color: '#005b98',
    fontSize: 22,
  },
  textDark: {
    color: '#005b98',
    fontSize: 25,
    padding: 20,
  },

  listStyle: {
    flexDirection: 'column',
    padding: 5,
    marginBottom: 5,
  },
  itemStyle: {
    flexDirection: 'column',
    padding: 7,
    margin: 5,
    backgroundColor: 'white',
    textAlign: 'left',
    fontSize: 15,
    borderRadius: 5,
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
