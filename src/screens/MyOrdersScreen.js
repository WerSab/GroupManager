import {useNavigation} from '@react-navigation/core';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  TouchableHighlight,
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
import {
  extractTicketsInfo,
  getUserTickets,
} from '../firebase/firestore-ticket-methods';
import ErrorScreen from './ErrorScreen';
import {ScrollView} from 'react-native-gesture-handler';
import TicketOrderDetails from '../styles/TicketOrderDetails';
import {getUserOrders} from '../firebase/firestore-order-methods';
import {TICKET_PAYMENT_STATUS} from '../config';
import {useAsync} from '../hooks/useAsync';
import {getDateFromTimestamp} from '../firebase/firestore-helpers';
import dayjs from 'dayjs';
import {
  getFormattedDiff,
  getOrderExpirationInHours,
} from './common/tournament-methods';

const MyOrdersScreen = ({route}) => {
  const userContext = useContext(UserContext);
  const userID = userContext.user.uid;

  const deleteOutadatedTicketsAndFetchUserOrders = useCallback(async () => {
    try {
      await deleteOutdatedTickets(userID);
      return getUserOrders(userID, TICKET_PAYMENT_STATUS.UNPAID);
    } catch (error) {
      throw error;
    }
  }, [userID]);

  const {
    data: myOrders,
    error,
    loading,
  } = useAsync(deleteOutadatedTicketsAndFetchUserOrders);

  console.log('myOrders', myOrders[0].tournament.name);

  const now = getCurrentDate();

  if (error) {
    return <ErrorScreen errorMessage={error.message} />;
  }
  if (loading) {
    return (
      <View style={styles.buttonContainer}>
        <Text style={styles.textDark}>Ładuje się</Text>
      </View>
    );
  }

  if (!myOrders && myOrders.length === 0) {
    console.log('nie posiadasz biletów');
    return (
      <View>
        <Text style={styles.text}>Nie posiadasz żadnych biletów.</Text>
      </View>
    );
  }

  const renderItem = item => {
    const createdAt = getDateFromTimestamp(item.createdAt);
    const willExpireInHours = getFormattedDiff(now, createdAt.getTime(), 'HH');
    const ticketReference = item.tickets;
    const orderId = item.id;
    return (
      <View style={styles.itemStyle} key={item.id}>
        <Text style={styles.textName}>{myOrders[0].tournament.name}</Text>
        <Text style={styles.textDark}>
          Dane do przelewu (naciśnij aby skopiować):
        </Text>

        <View>
          <TouchableOpacity
            style={styles.touchableOpacityView}
            onPress={() => {
              Clipboard.setString(`87 8600 0002 0000 0000 3838 0005`);
              Alert.alert('Pomyślnie skopiowane');
            }}
          >
            <Text style={styles.textDarkBold}>
              Numer konta: 87 8600 0002 0000 0000 3838 0005
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.touchableOpacityView}
            onPress={() => {
              Clipboard.setString(
                `Centrum Kultury i Sportu w Skawinie, ul. Żwirki i Wigury 11,32-050 Skawina`,
              );
              Alert.alert(`Pomyślnie skopiowane`);
            }}
          >
            <Text style={styles.textDarkBold}>
              Nazwa i adres odbiorcy: Centrum Kultury i Sportu w Skawinie, ul.
              Żwirki i Wigury 11,32-050 Skawina
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            style={styles.touchableOpacityView}
            onPress={() => {
              Clipboard.setString(` ${item.id}`);
              Alert.alert(`Pomyślnie skopiowane`);
            }}
          >
            <Text style={styles.textDarkBold}>Tytuł przelewu: {item.id}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.touchableOpacityView}
            onPress={() => {
              Clipboard.setString(` ${item.price}`);
              Alert.alert(`Pomyślnie skopiowane`);
            }}
          >
            <Text style={styles.textDarkBold}>
              Kwota do zapłaty: {item.price} zł.
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.textDark}>
            *Zamówienie wygaśnie za: {willExpireInHours}
          </Text>
        </View>
        <View>
          <Text style={styles.textDark}>
            {/* <Button
              activeOpacity={2}
              color="#47b8ce"
              title="Kopiuj dane do przelewu"
              onPress={() => {
                Clipboard.setString(
                  `Numer konta: 87 8600 0002 0000 0000 3838 0005, Adres: c, Tytuł przelewu: ${orderId}`,
                );
                Alert.alert(`Dane do przelewu zostały pomyślnie skopiowane`);
              }}
            /> */}
          </Text>
        </View>
      </View>
    );
  };

  const myOrderList = myOrders.map(order => renderItem(order));

  return (
    <View style={styles.mainBody}>
      <ScrollView>
        <View>{myOrderList}</View>
      </ScrollView>
    </View>
  );
};

export default MyOrdersScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    backgroundColor: '#C5EEFF',
  },
  title: {
    color: '#005b98',
    fontSize: 20,
    padding: 10,
  },

  text: {
    color: 'white',
    fontSize: 25,
    padding: 10,
  },

  textDark: {
    color: '#005b98',
    fontSize: 16,
    padding: 5,
    flexDirection: 'column',
  },
  textDarkBold: {
    color: '#005b98',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 2,
    flexDirection: 'column',
  },
  textName: {
    color: '#005b98',
    fontSize: 30,
    fontWeight: 'bold',
    padding: 2,
    flexDirection: 'column',
  },

  itemStyle: {
    flexDirection: 'column',
    padding: 20,
    marginStart: 10,
    marginEnd: 10,
    marginTop: 20,
    color: '#005b98',
    backgroundColor: 'white',
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 5,
    fontSize: 16,
  },

  singleButtonView: {
    flexDirection: 'row',
    textAlign: 'right',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  touchableOpacityView: {
    justifyContent: 'space-evenly',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    backgroundColor: '#C5EEFF',
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
});
