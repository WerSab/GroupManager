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
import {updateTicketOrdersToTournament} from '../tournaments-examples';
import {addNewTicketOrderToCollection} from '../ticket-examples';
import {updateTicketOrdersToUser} from '../users-examples';
import {UserContext} from '../context/UserContextProvider';
import {TournamentContext} from '../context/TournamentContextProvider';
import {getTournamentFromContext} from '../common/context-methods';
import {getCollection} from '../fireBase/firestore-Helper';
import {FIRESTORE_COLLECTION, TICKET_PAYMENT_STATUS} from '../config';
import {setDateTicketClearedAt} from '../store/localStore';
import useStoredTicketTypesFromRouteParams from '../hooks/useStoredTicketTypesFromRouteParams';
import {FlatList} from 'react-native-gesture-handler';
import {CustomTicketFlatList} from '../styles/CustomTicketFlatList';
import {useTournamentTicketTypes} from '../hooks/useTournamentTicketTypes';
import DiscountPrices from '../styles/DiscountPrices';
import {parseBoughtTicketsToArray} from '../common/ticket-order-methods';

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
    recalculateFinalPrice(boughtTickets.current);
  };

  const recalculateFinalPrice = boughtTickets => {
    const x = Object.entries(boughtTickets).reduce(
      (acc, [, ticketMetaData]) => {
        const ticketTypeId = ticketMetaData.ticketTypeId;
        const {prices} = ticketTypesData.find(
          ticketType => ticketType.id === ticketTypeId,
        );
        return (
          acc +
          Object.entries(ticketMetaData.discounts).reduce(
            (acc, [discountName, amount]) => {
              return acc + prices[discountName] * amount;
            },
            0,
          )
        );
      },
      0,
    );

    // let _finalPrice = 0;
    // Object.entries(boughtTickets).forEach(([, ticketMetaData]) => {
    //   const ticketTypeId = ticketMetaData.ticketTypeId;
    //   const {prices} = ticketTypesData.find(
    //     ticketType => ticketType.id === ticketTypeId,
    //   );
    //   Object.entries(ticketMetaData.discounts).forEach(
    //     ([discountName, amount]) => {
    //       _finalPrice += prices[discountName] * amount;
    //     },
    //   );
    // });
    setFinalPrice(x);
  };

  const handleAmountChange = (
    ticketTypeId,
    ticketName,
    discountName,
    amount,
  ) => {
    console.log(ticketTypeId, ticketName, discountName, amount);
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
    console.log('TOS_boughtTickets', boughtTickets);
    recalculateFinalPrice(boughtTickets.current);
  };

  function foo(x) {}

  function boo(x, y) {}

  x => boo('a', 'b', x);

  const renderTicketItem = ({item}) => {
    const ticketTypeId = item.id;
    const prices = item.prices; // ?? {};
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
    console.log('TOS_tickets', tickets);
    addNewTicketOrderToCollection({
      user: user,
      tournamentId: tournamentId,
      tickets,
      status: 'unpaid',
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
  } else if (loading) {
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
          color="#47b8ce"
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
    justifyContent: 'center',
    backgroundColor: '#015a92',
    alignContent: 'center',
  },
  headline: {
    alignSelf: 'center',
    color: 'white',
    paddingVertical: 6,
    paddingHorizontal: 2,
    fontSize: 22,
  },
  SectionStyle: {
    flex: 1,
    flexDirection: 'column',
    borderColor: '#3175ab',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: 'white',
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: 'white',
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
    borderColor: '#3175ab',
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

//wrzucamy info o biletach (cena, ilość, rodzaj)
//inputy - ilość biletów
//koszyk z info o zakupionych biletach
//const tournament = getTournamentFromContext(tournamentContext, tournamentId);
// const status = useMemo(() => {
//     return ticketType.prices > 0 ? TICKET_PAYMENT_STATUS.UNPAID : TICKET_PAYMENT_STATUS.PAID;
// }, [ticketType]);
// function getCalculatedOrderPrice(discountTicketPrice, discountAmount) {
//   const price = parseInt(discountTicketPrice);
//   const amount = parseInt(discountAmount);
//   return Math.round(price * amount * 100) / 100; //zaokrąglenie
// }

// const handleFinalPriceBlur = () => {
//   const total = getCalculatedOrderPrice() + finalPrice;
//   console.log('totalPrice', total);
//   setFinalPrice(total);
// };
//   const mapCopy = new Map(prices);
//   mapCopy.set('ulgowy', 100);
//   setPrices(mapCopy);
// const bought = {
//   // plyta: {
//   // ticketTypeId: null,
//   // discounts: {
//   //   ulgowy: amount,
//   //   normalny: 1,
//   //}
//   // },
//   // sektorC: {
//   //   ulgowy: 1,
//   // },
// }; //

//setTicketName(mapTicketName);

//setBoughtTicket(bought);
// tutaj aktualizuje tablice na stanie o ten obiekt wynikowy zapisany wyzej
//console.log('boughtTicket', boughtTicket);

// bought[ticketName][discountName] = amount;
// przy parsowaniu sprawdzić czy obiekt posiada jakieś własności - jeżeli nie to go skasować ()
// z obiektu bought, po naciśnięciu zamów wynikiem powinna byc nastepujaca tablica:
// [
//     {
//         name: 'plyta',
//         amount: 1,
//         type: 'normalny'
//     },

// ]
//https://jsfiddle.net/nhwz853s/
// }
//stan z rodzajem biletu i zakupionymi ulgami
// function navigateWithParams(navigation, route, nextParams, screenName) {
//     const prevParams = route.params;
//     navigation.navigate(screenName, {
//         ...prevParams,
//         ...nextParams
//     });
// }

// navigateWithParams(navigation, route, {
//     ticketType: {

//     }
// }, 'nazwaEkranu');
// const onSaveTicketOrders = () => {
//     const parsedTakenSlots = parseInt(takenSlots)
//     if (isNaN(parsedTakenSlots) || parsedTakenSlots <= 0) {
//         Alert.alert('Wystąpił błąd', `Prosze wprowadzić liczbę`, [
//             { text: 'Ok' },
//         ])
//         return;
//     }
//     const tournamentRef = getCollection(FIRESTORE_COLLECTION.TOURNAMENTS).doc(tournamentId);
//     const ticketTypeReference = tournamentRef
//         .collection(FIRESTORE_COLLECTION.SUB_COLLECTION.TICKET_TYPES)
//         .doc(ticketType.id);
//     const userReference = getCollection(FIRESTORE_COLLECTION.USERS)
//         .doc(user.uid)

//     const data = {
//         user: userReference,
//         tournament: tournamentRef,
//         //tickets: ticketsState,
//         tickets: [
//             {
//                 name: ticketType.name,
//                 ticketTypeRef: ticketTypeReference,
//                 amount: takenSlots,
//                 type: ticketType.type,
//             }
//         ],
//         status: status,

//     };

//     setIsButtonSafeDisabled(true);
//     addNewTicketOrderToCollection(data)
//         .then((ticketOrderDocumentReference) => {
//             // navigation.navigate(SCREEN.TICKET_PAYMENT_SUMMARY,
//             //     {
//             //         ticketOrderDocumentReference,
//             //     }
//             // )
//             console.log('zapisano zamowienie');
//             setIsButtonSafeDisabled(false);
//         })
//         .catch(function (err) {
//             Alert.alert('Wystąpił błąd', `Przepraszamy mamy problem z serwerem, prosze spróbować później`, [
//                 { text: 'Ok' },
//             ]);
//             console.log("OrdersScreen error: ", err);
//         });
// }
//  {/* <FlatList
//                     data={ticketTypesData}
//                     renderItem={renderTicketType}
//                 /> */}
//   {/* <Text style={styles.headline} > {tournament.name}</Text>
//                 <Text style={styles.buttonTextStyle} > Cena pojedyńczego biletu : {ticketType.price} zł. </Text> */}
//   {/* <View style={styles.SectionStyle}>
//                     <Text style={styles.buttonTextStyle} > Ilość biletów :  </Text>
//                     <TextInput
//                         onBlur={handleFinalPriceBlur}
//                         style={styles.inputStyle}
//                         onChangeText={(text) =>
//                             setTakenSlots(text)
//                         }
//                         value={takenSlots}
//                         underlineColorAndroid="#f000"
//                         placeholder="Wpisz ilość biletów..."
//                         placeholderTextColor="#8b9cb5"
//                     />
//                 </View> */}
