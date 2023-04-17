import React from 'react';
import {useCallback} from 'react';
import {Alert} from 'react-native';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import deleteIcon from '../assets/icons/delete.png';

//27

const PriceDisplayable = () => {};

const PricesDisplayable = props => {
  // petla i w petli:
  // <PriceDisplayable {...params} />;

  const priceValues = Object.values(props.prices);
  console.log('props.prices', props.prices);
  return (
    <>
      <Text>{priceValues}</Text>
    </>
  );
};

export const TournamentTicketType = props => {
  const {ticketType, onTicketTypeDelete} = props;
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
        <Text style={styles.textDark}>Nazwa: {ticketType.name}</Text>
        <Text style={styles.textDark}>Ilość: {ticketType.slots}</Text>
        <PricesDisplayable prices={ticketType.prices} />
      </View>
      <View style={{backgroundColor: 'pink'}}>
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
    justifyContent: 'flex-start',
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
