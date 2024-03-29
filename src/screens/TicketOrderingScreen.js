//14.11 - cały order przekazac w route params, order details odczytać bilety (referencje normalnie, a rozpakowanie promisem, get(), rozpakowanie referencji)
//final price
//zrobić upgrade do wersji https://react-native-community.github.io/upgrade-helper/?from=0.65.3&to=0.69.7
//

// 17.11.
// Feature branch per funkcjonalnosc
// Tworze nowy branch featurowy na ktorym rozwijam funkcjoanlnosc
// Commituje "kawalki" pracy
// Pushuje do zdalnego repozytorium na featurowy branch
// Nastepnie na zdalnym repozytorium (github) tworze pull request (feature/XYZ -> main)

import {useNavigation} from '@react-navigation/core';
import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {SCREEN} from '../navigation/screens';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Button,
  ActivityIndicator,
} from 'react-native';
import safeIcon from '../assets/icons/safe.png';
import {updateTicketOrdersToTournament} from '../firebase/firestore-tournament-methods';
import {addNewTicketOrderToCollection} from '../firebase/firestore-ticket-methods';
import {updateTicketOrdersToUser} from '../firebase/firestore-user-methods';
import {UserContext} from '../context/UserContextProvider';
import {TournamentContext} from '../context/TournamentContextProvider';
import {getTournamentFromContext} from '../common/context-methods';
import {getCollection} from '../firebase/firestore-helpers';
import {FIRESTORE_COLLECTION, TICKET_PAYMENT_STATUS} from '../config';
import {setDateTicketClearedAt} from '../store/localStore';
import useStoredTicketTypesFromRouteParams from '../hooks/useStoredTicketTypesFromRouteParams';
import {FlatList} from 'react-native-gesture-handler';
import {CustomTicketFlatList} from '../styles/CustomTicketFlatList';
import {useTournamentTicketTypes} from '../hooks/useTournamentTicketTypes';
import DiscountPrices from '../styles/DiscountPrices';
import {parseBoughtTicketsToArray} from '../common/ticket-order-methods';
import {calculateFinalPrice} from '../common/price-methods';

const TicketOrderingScreen = ({route, props}) => {
  const userContext = useContext(UserContext);
  const {tournamentId} = route.params;
  const tournamentContext = useContext(TournamentContext);

  const navigation = useNavigation();
  const {user} = userContext;
  const [totalTicketsAmount, setTicketsAmount] = useState(0);
  const [finalPrice, setFinalPrice] = useState('0');
  const [ticketTypesData, loading, error] =
    useTournamentTicketTypes(tournamentId);

  const [boughtTickets, setBoughtTickets] = useState({});

  const [isButtonSafeDisabled, setIsButtonSafeDisabled] = useState(false);

  const handleRemoveDiscount = ticketName => {
    delete boughtTickets.current[ticketName];
    const calculatedPrice = calculateFinalPrice(
      boughtTickets.current,
      ticketTypesData,
    );
    setFinalPrice(calculatedPrice);
  };

  useEffect(() => {
    const setTotalTicketsAmount = () => {
      const initialTotalValue = 0;
      const totalAmount = Object.values(boughtTickets).reduce(
        (accumulator, ticketType) => {
          return accumulator + ticketType.amount;
        },
        initialTotalValue,
      );

      // const tickets = Object.values(boughtTickets);
      // let totalAmount = 0;
      // for (let i = 0; i < tickets.length; i++) {
      //   const ticketInIteration = tickets[i];
      //   const amountInIteration = ticketInIteration.amount;
      //   totalAmount = totalAmount + amountInIteration;
      // }
      setTicketsAmount(totalAmount);
    };

    const setTotalPrice = () => {
      const calculatedPrice = calculateFinalPrice(boughtTickets);
      setFinalPrice(calculatedPrice);
    };
    setTotalTicketsAmount();
    setTotalPrice();
  }, [boughtTickets]);

  const handleAmountChange = (
    ticketTypeId,
    ticketName,
    ticketPrice,
    amount,
  ) => {
    setBoughtTickets(prevState => {
      return {
        ...prevState,
        [ticketTypeId]: {
          // ...boughtTickets.current[ticketName],
          ticketName,
          ticketPrice,
          amount,
        },
      };
    });
  };

  const renderTicketItem = ({item}) => {
    console.log('renderTicketItem_item', item);
    const ticketTypeId = item.id;

    return (
      <View style={styles.SectionStyle}>
        <DiscountPrices
          ticketName={item.type}
          price={item.price}
          removeDiscount={() => handleRemoveDiscount(item.type)}
          onAmountChange={amount =>
            console.log('anon amount:', amount) ||
            handleAmountChange(ticketTypeId, item.type, item.price, amount)
          }
        />
      </View>
    );
  };

  const keyExtractor = (item, index) => {
    return index;
  };

  const finishOrder = () => {
    const tickets = parseBoughtTicketsToArray(boughtTickets);
    console.log('finish-order_boughtTickets.current', boughtTickets);
    addNewTicketOrderToCollection({
      user: user,
      tournamentId: tournamentId,
      tickets,
      status: 'unpaid',
      price: finalPrice,
    })
      .then(Alert.alert('Bilety dodane do listy  Moje zamówienia'))
      .then(navigation.navigate(SCREEN.PLAYER))
      .catch(function (err) {
        Alert.alert(
          'Wystąpił błąd',
          `Przepraszamy mamy problem z serwerem, prosze spróbować później`,
          [{text: 'Ok'}],
        );
        console.log('OrdersScreen error: ', err);
      });
  };

  if (error) {
    // wyrenderuj cos tam
    return <Text>wystapil blad</Text>;
  }
  if (loading) {
    // wyrenderuj cos innego
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.mainBody}>
      {/* <Text style={styles.headline}>Rezerwacja biletów</Text> */}
      <FlatList
        data={ticketTypesData}
        renderItem={renderTicketItem}
        style={styles.container}
        keyExtractor={keyExtractor}
      />

      <Text style={styles.buttonTextStyle}>
        {' '}
        Ilość biletów:{' '}
        <Text style={styles.boldTextStyle}>{totalTicketsAmount} </Text>
        zł.{' '}
      </Text>

      <Text style={styles.buttonTextStyle}>
        {' '}
        Razem do zapłaty:{' '}
        <Text style={styles.boldTextStyle}>{finalPrice} </Text>zł.{' '}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          style={styles.roundButtonDark}
          onPress={() => {
            finishOrder();
            navigation.navigate(SCREEN.PLAYER_TAB.MY_TICKETS);
          }}
        >
          <Image source={safeIcon} style={styles.icon1} />
          <Text style={styles.textButton}>Zapisz</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default TicketOrderingScreen;
const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    backgroundColor: '#C5EEFF',
    alignItems: 'center',
  },
  headline: {
    alignSelf: 'center',
    color: '#005b98',
    paddingVertical: 6,
    paddingHorizontal: 2,
    fontSize: 22,
  },
  SectionStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  buttonStyle: {
    backgroundColor: 'white',
    borderColor: '#7DE24E',
    alignItems: 'center',
    borderRadius: 30,
  },
  textButton: {
    color: 'white',
    paddingVertical: 10,
    fontSize: 16,
    marginStart: 5,
    marginEnd: 5,
    textAlign: 'center',
  },

  buttonTextStyle: {
    color: '#005b98',
    marginStart: 20,
    paddingVertical: 10,
    fontSize: 18,
  },
  boldTextStyle: {
    color: '#005b98',
    marginStart: 20,
    paddingVertical: 10,
    fontSize: 50,
    fontWeight: 'bold',
  },
  buttonTextStyleDark: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    color: '#015a92',
    paddingVertical: 10,
    fontSize: 18,
  },
  roundButtonDark: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#005b98',
    margin: 10,
  },
  inputStyle: {
    flex: 1,
    color: '#015a92',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#005b98',
    width: 20,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  container: {
    flex: 2,
  },
  rowStyle: {
    flexDirection: 'row',
    padding: 5,
  },
  icon1: {
    height: 30,
    width: 30,
    margin: 2,
  },
});
