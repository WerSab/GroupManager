//odliczanie czasu=> w local stroage pobrac info kiedy był czyszczenie starych bietów (pamiętac, że na początku ma być null lub zero)

// pobieram informacje ze storage'u kiedy byly "czyszczone" bilety (bedzie ona przechowywana pod kluczem np. tickets-cleared-at: DATE | undefined)
// 1. tickets-cleared-at istnieje to: analizuje czy czyszczenie jest wymagane w tym momencie
// 2. tickets-cleared-at nie istnieje: od razu wykonuje czyszczenie biletow

// tickets -> tournament(ref) -> tournament(ref).id
// tickets.where(tournament == 'tournaments/tournamentId');

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
  Modal,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {Button} from 'react-native-elements';
import {getTournamentFromContext} from '../common/context-methods';
import {TicketContext} from '../context/TicketContextProvider';
import {TournamentContext} from '../context/TournamentContextProvider';
import {UserContext} from '../context/UserContextProvider';
import {SCREEN} from '../navigation/screens';

import {getUserOrders} from '../firebase/firestore-order-methods';
import ErrorScreen from './ErrorScreen';
import {ScrollView} from 'react-native-gesture-handler';
import {TICKET_PAYMENT_STATUS} from '../config';
import {useAsync} from '../hooks/useAsync';
import {useUserTickets} from '../hooks/useUserTickets';
import {extractTicketsInfo} from '../firebase/firestore-ticket-methods';
import {TicketDataView} from '../components/TicketDataView';
import {extractTournamentInfo} from '../firebase/firestore-tournament-methods';
import {getDateFromTimestamp} from '../firebase/firestore-helpers';
import {formatDate} from '../common/date-time-methods';

const MyConfirmedOrdersScreen = ({route}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const userContext = useContext(UserContext);
  const userID = userContext.user.uid;

  const fetchUserOrders = useCallback(() => {
    try {
      return getUserOrders(userID, TICKET_PAYMENT_STATUS.PAID);
    } catch (error) {
      throw error;
    }
  }, [userID]);

  const initializeLocalOrders = orders => {
    return orders?.map(order => {
      return {
        ...order,
        isExtracted: false,
      };
    });
  };

  const {data: myOrders, error, loading} = useAsync(fetchUserOrders);
  const [localOrders, setLocalOrders] = useState();
  console.log('localOrders', localOrders);

  useEffect(() => {
    if (localOrders) {
      return;
    }
    setLocalOrders(initializeLocalOrders(myOrders));
  }, [myOrders, localOrders]);

  const getOrderDetails = useCallback(
    async orderId => {
      try {
        console.log('orderId', orderId);

        const order = localOrders?.find(order => order.id === orderId);
        const ticketReferences = order.tickets;
        console.log('ticketReferences', ticketReferences);
        const extractedTickets = await extractTicketsInfo(ticketReferences);
        console.log('extractedTickets', extractedTickets);

        // type SetStateAction<S> = S | ((prevState: S) => S);
        // setLocalOrders((prevState) => {
        //   return [];
        // });
        setLocalOrders(prevLocalOrders => {
          return prevLocalOrders.map(order => {
            if (order.id !== orderId) {
              return order;
            }
            return {
              ...order,
              tickets: extractedTickets,
              isExtracted: true,
            };
          });
        });
      } catch (error) {
        throw error;
      }
    },
    [localOrders],
  );

  const handleShowDetailsPress = useCallback(
    orderId => {
      return () => {
        const order = localOrders.find(order => order.id === orderId);
        if (!order?.isExtracted) {
          getOrderDetails(orderId);
        }
        setIsModalVisible(true);
      };
    },
    [localOrders, getOrderDetails],
  );

  //console.log('local orders:', localOrders);

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
  if (!myOrders && myOrders.length === 0) {
    return (
      <View style={styles.buttonContainer}>
        <Text style={styles.text}>Nie posiadasz żadnych biletów.</Text>
      </View>
    );
  }

  const renderItem = item => {
    const tournamentDate = formatDate(item.tournament.startDate);
    return (
      <View style={styles.itemStyle} key={item.id}>
        <Text>
          <View>
            <Text style={styles.textDark}>ID: {item.id}</Text>
          </View>
          <View>
            <Text style={styles.textDark}>
              Nazwa wydarzenia: {item.tournament.name}
            </Text>
          </View>
          <View>
            <Text style={styles.textDark}>Termin: {tournamentDate}</Text>
          </View>
          <View>
            <Text style={styles.textDark}>
              Miejsce: {item.tournament.place}
            </Text>
          </View>
          <View>
            <Text style={styles.textDark}>
              Koszt zamówienia: {item.price}zł.
            </Text>
          </View>
          <View>
            <Button
              activeOpacity={2}
              color="#47b8ce"
              title="Wyswietl szczegóły"
              onPress={handleShowDetailsPress(item.id)}
            />
          </View>
        </Text>
      </View>
    );
  };

  const parsedTicketDataView = localOrders?.map(orderData => (
    <TicketDataView
      key={orderData.id.toString()}
      ticketData={orderData.isExtracted ? orderData.tickets : undefined}
      ticketId={orderData.Id}
    />
  ));

  const myConfirmedOrderList = localOrders.map(ticketOrder =>
    renderItem(ticketOrder),
  );

  return (
    <View style={styles.mainBody}>
      {isModalVisible && (
        <Modal
          animationType="slide"
          transparent={false}
          onRequestClose={() => setIsModalVisible(false)}
          onBackdropPress={() => setIsModalVisible(false)}
          onBackButtonPress={() => setIsModalVisible(false)}
        >
          <ScrollView>
            <View style={styles.modalView}>
              <Text>{parsedTicketDataView}</Text>
              <View style={styles.singleButtonView}>
                <Button
                  activeOpacity={2}
                  color="#47b8ce"
                  title="Zamknij"
                  onPress={() => {
                    setIsModalVisible(false);
                  }}
                ></Button>
              </View>
            </View>
          </ScrollView>
        </Modal>
      )}

      <View>
        <ScrollView>
          <Text style={styles.title}>Moje Bilety:</Text>
          {myConfirmedOrderList}
        </ScrollView>
      </View>
    </View>
  );
};

export default MyConfirmedOrdersScreen;

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
    padding: 10,
    flexDirection: 'column',
  },

  itemStyle: {
    flexDirection: 'column',
    padding: 5,
    marginStart: 20,
    marginEnd: 20,
    marginTop: 20,
    color: '#005b98',
    backgroundColor: 'white',
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 5,
    fontSize: 16,
  },

  singleButtonView: {
    flexDirection: 'row',
    marginEnd: 20,
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'right',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
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
    backgroundColor: '#C5EEFF',
    borderRadius: 5,
    margin: '5%',
  },
});
