import React, { useContext, useState, useNavigation, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native';

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

const TicketPaymentSummaryScreen = ({ route }) => {

    const [ticketOrder, setTicketOrder] = useState();
    const [isLoading, setIsLoading] = useState(true)
    const { ticketOrderDocumentReference } = route.params;
    const ticketOrderDocumentId = ticketOrderDocumentReference.id;
    const unpackTicketOrderDocumentReference = useCallback(function () {
        return ticketOrderDocumentReference.get().then(documentData => {
            setTicketOrder(documentData.data());
            setIsLoading(false);
        });
    }, [ticketOrderDocumentReference])
    console.log('ticketOrder', ticketOrder);

    useEffect(() => {
        unpackTicketOrderDocumentReference();
    }, []);

    //copyticketOrderDocumentId()=()={

    //};
    return (
        <>
            {/*<CustomHeader/>*/}
            <View style={styles.mainBody}>
                <Text style={styles.text}>Podsumowanie płatności</Text>

                {isLoading ? <Text>Is loading...</Text> : (
                    <>
                        <Text style={styles.text}>Kwota do zapłaty: {ticketOrder.price}</Text>
                        <Text style={styles.text}>Termin rezerwacji biletu upłynie za:</Text>
                    </>
                )}

                <Text style={styles.text}>Kod zamówienia: {ticketOrderDocumentId}</Text>
                <Button
                    activeOpacity={2}
                    color='#47b8ce'
                    title="Kopiuj kod"
                    onPress={() => {
                        //copyticketOrderDocumentId();
                    }}
                />


            </View>
        </>
    )

}
export default TicketPaymentSummaryScreen;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#015a92',

    },
    text: {
        color: 'white',
        fontSize: 20,
        padding: 40,
    },
    container: {
        flex: 1,
    },
    listStyle: {
        padding: 40,
        marginBottom: 5,
        color: '#27046d',
        backgroundColor: "white",
        marginRight: 20,
        marginLeft: 20,
        borderRadius: 5,
        borderWidth: 1,
        textAlign: 'left',
        fontSize: 20
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
})