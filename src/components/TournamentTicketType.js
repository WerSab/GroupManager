import React from 'react';
import {useCallback} from 'react';
import {Alert} from 'react-native';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import deleteIcon from '../assets/icons/delete.png';

const PriceDisplayable = props => {
  //const priceEntries = Object.entries(props.prices);
  return (
    <View>
      <Text>przykładowe ceny</Text>
    </View>
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
    <View>
      <View style={styles.listStyle} key={ticketType.id}>
        <Text style={styles.textDark}>
          <Text>{ticketType.name}</Text>
          <Text>{ticketType.slots}</Text>
        </Text>
        <PriceDisplayable prices={ticketType.prices} />
        <TouchableOpacity onPress={deleteAlert}>
          <Image source={deleteIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listStyle: {},
  textDark: {},
  icon: {},
});
