import React, {useContext, useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {FIRESTORE_COLLECTION} from '../config';
import {
  getCollection,
  getFirestoreTimestampFromDate,
} from '../fireBase/firestore-Helper';
import {deleteTicket} from '../ticket-examples';
import {SCREEN} from '../navigation/screens';
import {useNavigation} from '@react-navigation/core';

const TicketPaymentSummaryScreen = ({route}) => {
  const navigation = useNavigation();
  const [ticketOrder, setTicketOrder] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const {tickets} = route.params;
  console.log('TicketPaymentSummaryScreen_tickets', tickets);
  // const ticketOrderDocumentId = ticketOrderDocumentReference.id;
  // const ticketID = ticketOrderDocumentId.toString();
  // const presentDate = getFirestoreTimestampFromDate().seconds;
  // const unpackTicketOrderDocumentReference = useCallback(
  //   function () {
  //     return ticketOrderDocumentReference.get().then(documentData => {
  //       setTicketOrder(documentData.data());
  //       setIsLoading(false);
  //     });
  //   },
  //   [ticketOrderDocumentReference],
  // );

  // useEffect(() => {
  //   unpackTicketOrderDocumentReference();
  // }, []);

  return (
    <>
      {/*<CustomHeader/>*/}
      <View style={styles.mainBody}>
        <Text style={styles.text}>Podsumowanie zamówienia</Text>

        {isLoading ? (
          <Text>Is loading...</Text>
        ) : (
          <>
            <Text style={styles.text}>
              Kwota do zapłaty: {ticketOrder.price} zł.
            </Text>
          </>
        )}
        {/* <Text style={styles.text}>Kod zamówienia: {ticketOrderDocumentId}</Text> */}
        <View style={styles.buttonContainer}>
          <View style={styles.singleButtonView}>
            <Button
              activeOpacity={2}
              color="#47b8ce"
              title="Kopiuj kod"
              onPress={() => {
                Clipboard.setString(ticketID);
                Alert.alert('Kod zamówienia został pomyslnie skopiowany');
              }}
            />
          </View>
          <View style={styles.singleButtonView}>
            <Button
              activeOpacity={2}
              color="#47b8ce"
              disabled={isDisabled}
              title="Usuń rezerwację"
              onPress={() => {
                deleteTicket(ticketOrderDocumentId)
                  .then(() => {
                    setIsDisabled(true);
                    Alert.alert('Zamówienie zostało pomyślnie anulowane');
                    navigation.navigate(SCREEN.PLAYER_TAB.MY_TOURNAMENTS);
                  })
                  .catch(function (err) {
                    Alert.alert(
                      'Wystąpił błąd',
                      `Przepraszamy mamy problem z serwerem, prosze spróbować później`,
                      [{text: 'Ok'}],
                    );
                    console.log('Deleting ticket Error error: ', err);
                  });
              }}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.singleButtonView}>
            <Button
              activeOpacity={2}
              color="#47b8ce"
              title="Zamknij"
              onPress={() => {
                navigation.navigate(SCREEN.PLAYER);
              }}
            />
          </View>
        </View>
      </View>
    </>
  );
};
export default TicketPaymentSummaryScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: '#015a92',
  },
  text: {
    color: 'white',
    fontSize: 18,
    padding: 10,
  },
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    paddingVertical: 10,
  },
  singleButtonView: {
    paddingHorizontal: 10,
  },
  listStyle: {
    padding: 40,
    marginBottom: 5,
    color: '#27046d',
    backgroundColor: 'white',
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 5,
    borderWidth: 1,
    textAlign: 'left',
    fontSize: 20,
  },
  buttonStyle: {
    backgroundColor: 'white',
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
  },
  buttonTextStyle: {
    color: '#015a92',
    paddingVertical: 10,
    fontSize: 16,
  },
});

// function xxx() {

// }

// const asyncFn = () => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve({
//           title: "Hello World"
//         });
//       }, 4000);
//     });
//   };

//   export default function App() {
//     const [state, setState] = useState();
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//       asyncFn().then((value) => {
//         setState(value);
//         setLoading(false);
//       });
//     }, []);

//     return (
//       <div className="App">
//         <h1>{loading ? 'loading...' :  state.title}</h1>
//       </div>
//     );
//   }
// const v = xxx;
// v();
