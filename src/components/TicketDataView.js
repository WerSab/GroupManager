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
      <View style={styles.itemStyle} key={item.id}>
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
    );
  };

  const renderTicket = ticketData?.map(ticketRender =>
    renderItem(ticketRender),
  );
  return <View>{renderTicket}</View>;
};

const styles = StyleSheet.create({
  listStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  itemStyle: {
    flexDirection: 'column',
    padding: 5,
    marginStart: 20,
    marginEnd: 20,
    marginTop: 20,
    color: '#005b98',
    backgroundColor: '#C5EEFF',
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
  icon: {
    height: 25,
    width: 25,
  },
});
