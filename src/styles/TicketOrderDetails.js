import React from 'react';
import {StyleSheet, Text, View, Alert, Button} from 'react-native';

export default TicketOrderDetails = props => {
  const {orderId, tournamentName, ticketList, finalPrice, orderEndDate} = props;

  return (
    <View style={styles.listStyle}>
      <Text style={styles.itemStyle}>
        <View>
          <Text style={styles.textDark}>{tournamentName}: </Text>
          <Text style={styles.textDark}>{ticketList}: </Text>
          <Text style={styles.textDark}>{finalPrice}zł.</Text>
          <Text style={styles.textDark}>{orderEndDate}: </Text>
          <Text style={styles.textDark}>{orderId}: </Text>
          <View style={styles.singleButtonView}>
            <Button
              // activeOpacity={2}
              color="#47b8ce"
              title="Kopiuj kod"
              onPress={() => {
                Clipboard.setString(orderId);
                Alert.alert('Kod zamówienia został pomyslnie skopiowany');
              }}
            />
          </View>
        </View>
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#005b98',
    alignItems: 'center',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#005b98',
    width: '100%',
  },
  singleButtonView: {
    flexDirection: 'row',
    textAlign: 'right',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  text: {
    color: 'white',
    fontSize: 25,
    padding: 10,
  },
  textBold: {
    color: '#005b98',
    fontSize: 16,
    padding: 10,
    fontWeight: 'bold',
  },
  textDark: {
    color: '#005b98',
    fontSize: 20,
    padding: 20,
  },
  container: {
    flex: 2,
  },
  listStyle: {
    flexDirection: 'row',
    padding: 5,
    marginBottom: 5,
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemStyle: {
    flexDirection: 'column',
    width: '95%',
    padding: 7,
    marginBottom: 5,
    color: '#005b98',
    backgroundColor: 'white',
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 5,
    textAlign: 'left',
    fontSize: 15,
    alignItems: 'center',
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
