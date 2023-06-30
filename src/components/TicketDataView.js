import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

//const userTickets = getUserTickets();
//const extractedUserTickets = extractTicketsInfo(userTickets).catch(er => console.log('blad', er));

// unpackReference[0].ticket.get().then((result) => {
//     setTicketList(result);
// })
//     .catch((error) => {
//         setError(error);
//     })

export const TicketDataView = props => {
  const {ticketData, ticketId} = props;
  console.log('ticketData', ticketData);

  const renderItem = item => {
    return (
      <View style={styles.mainBody} key={item.id}>
        <View style={styles.itemStyle}>
          <Text style={styles.textDark}>
            Nazwa biletu:
            <Text style={styles.textDarkBold}> {item.name}</Text>
          </Text>
          <Text style={styles.textDark}>
            Typ biletu:
            <Text style={styles.textDarkBold}> {item.type}</Text>
          </Text>
          <Text style={styles.textDark}>
            Ilość biletów:
            <Text style={styles.textDarkBold}> {item.amount}</Text>
          </Text>
        </View>
      </View>
    );
  };

  const renderTicket = ticketData?.map(ticketRender =>
    renderItem(ticketRender),
  );
  return <View>{renderTicket}</View>;
};

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    backgroundColor: '#C5EEFF',
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

  textDark: {
    color: '#005b98',
    fontSize: 16,
    padding: 10,
    flexDirection: 'column',
  },
  textDarkBold: {
    color: '#005b98',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    flexDirection: 'column',
  },
});
