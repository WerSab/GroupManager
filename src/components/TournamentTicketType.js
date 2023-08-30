import React from 'react';
import {useCallback} from 'react';
import {Alert} from 'react-native';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import deleteIcon from '../assets/icons/delete.png';

const PricesDisplayable = props => {
  console.log('props', props);
  const priceValues = props.price;
  const typeValues = props.type;
  console.log('props.prices', props.price);
  return (
    <View style={styles.listStyle}>
      <Text style={styles.textDark}>
        Typ: {typeValues}, Cena: {priceValues} zł.
      </Text>
    </View>
  );
};

export const TournamentTicketType = props => {
  const {ticketType, onTicketTypeDelete} = props;
  console.log('ticketType.props', props);
  const deleteAlert = useCallback(() => {
    const onDialogueConfirm = () => {
      onTicketTypeDelete();
    };

    Alert.alert('Delete alert', `Do You want to delete ${ticketType.name}?`, [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
      {
        text: 'Ok',
        onPress: onDialogueConfirm,
      },
    ]);
  }, []);

  return (
    <View style={styles.listStyle}>
      <View style={styles.listStyle}>
        <PricesDisplayable price={ticketType.price} type={ticketType.type} />
      </View>
      <View>
        <TouchableOpacity onPress={deleteAlert}>
          <Image source={deleteIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 3,
    alignItems: 'center',
    shadowColor: 'black',
    elevation: 20,
  },
  textDark: {
    color: '#005b98',
    fontSize: 16,
    padding: 10,
    flexDirection: 'column',
  },
  icon: {
    height: 25,
    width: 25,
  },
});
