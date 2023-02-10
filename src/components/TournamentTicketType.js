import React from 'react';
import {useCallback} from 'react';
import {Alert} from 'react-native';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import deleteIcon from '../assets/icons/delete.png';

const PriceDisplayable = props => {
  //const priceEntries = Object.entries(props.prices);
  console.log('props.prices', props.prices);
  return (
    <>
      <Text>{props.prices}</Text>
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
    <View>
      <ScrollView>
        <View style={styles.listStyle} key={ticketType.id}>
          <Text style={styles.textDark}>
            <TouchableOpacity onPress={deleteAlert}>
              <Image source={deleteIcon} style={styles.icon} />
            </TouchableOpacity>{' '}
            Nazwa: {ticketType.name}, Typ: {ticketType.type}, Ilość:
            {ticketType.slots}, Cena:
            <PriceDisplayable prices={ticketType.price} />,
          </Text>
        </View>
      </ScrollView>
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
