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
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Button,
  ActivityIndicator,
} from 'react-native';
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
  const [takenAmounts, setTakenAmounts] = useState([]);
  const [finalPrice, setFinalPrice] = useState('0');
  const [ticketTypesData, loading, error] =
    useTournamentTicketTypes(tournamentId);

  const boughtTickets = useRef({});

  const [isButtonSafeDisabled, setIsButtonSafeDisabled] = useState(false);

  const handleRemoveDiscount = (ticketName, discountName) => {
    delete boughtTickets.current[ticketName].discounts[discountName];
    const calculatedPrice = calculateFinalPrice(
      boughtTickets.current,
      ticketTypesData,
    );
    setFinalPrice(calculatedPrice);
  };

  const handleAmountChange = (
    ticketTypeId,
    ticketName,
    discountName,
    amount,
  ) => {
    boughtTickets.current = {
      ...boughtTickets.current,
      [ticketName]: {
        ticketTypeId: ticketTypeId,
        discounts: {
          ...boughtTickets.current[ticketName]?.discounts,
          [discountName]: amount,
        },
      },
    };

    const calculatedPrice = calculateFinalPrice(
      boughtTickets.current,
      ticketTypesData,
    );
    setFinalPrice(calculatedPrice);
  };

  const renderTicketItem = ({item}) => {
    const ticketTypeId = item.id;

    const prices = item.prices ?? {};
    return (
      <View>
        <Text style={styles.buttonTextStyle}>Nazwa biletu: {item.name}</Text>
        {Object.entries(prices).map(([discountName, price], index) => {
          return (
            <DiscountPrices
              key={`${discountName}${index}`} //klucza nie da się wyświetlić, ulgowy0, ulgowy1
              discountName={discountName}
              ticketName={item.name}
              price={price}
              removeDiscount={() =>
                handleRemoveDiscount(item.name, discountName)
              }
              onAmountChange={amount =>
                handleAmountChange(
                  ticketTypeId,
                  item.name,
                  discountName,
                  amount,
                )
              }
            />
          );
        })}
      </View>
    );
  };

  const keyExtractor = (item, index) => {
    return index;
  };

  const finishOrder = () => {
    const tickets = parseBoughtTicketsToArray(boughtTickets.current);

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
        Razem do zapłaty : {finalPrice} zł.{' '}
      </Text>
      <Text style={styles.buttonTextStyleDark}>
        <Button
          activeOpacity={2}
          title="Zarezerwuj"
          disabled={isButtonSafeDisabled}
          onPress={() => {
            finishOrder();
          }}
        />
      </Text>
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
    borderColor: '#005b98',
  },
  buttonStyle: {
    backgroundColor: 'white',
    borderColor: '#7DE24E',
    alignItems: 'center',
    borderRadius: 30,
  },
  buttonTextStyle: {
    color: '#005b98',
    paddingVertical: 10,
    fontSize: 18,
  },
  buttonTextStyleDark: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    color: '#015a92',
    paddingVertical: 10,
    fontSize: 18,
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
});
