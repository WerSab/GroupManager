import React from 'react';
import {Picker} from '@react-native-picker/picker';
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import {color} from 'react-native-reanimated';

export const toggleOrder = order => {
  const newOrder = order === 'ASC' ? 'DESC' : 'ASC';
  setOrder(newOrder);
};

export const filterList = (list, keyword) => {
  const filteredList = list.filter(item =>
    item.category.toLowerCase().includes(keyword.toLowerCase()),
  );
  console.log('pofiltrowana lista', filteredList);
  return filteredList;
};

export const listSorted = () => {
  listFiltered.sort((a, b) => {
    if (order === 'ASC') {
      return a.name.localCompare(b.name);
    }
    return b.name.localCompare(a.name);
  });
};
export const renderFilterOrderPicker = () => {
  return (
    <View style={styles.newTicketFrameStyle}>
      <Text>Text Input</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  newTicketFrameStyle: {
    flexDirection: 'column',
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#005b98',
  },
  textDark: {
    color: '#005b98',
    fontSize: 18,
  },
  textDarkBold: {
    color: '#005b98',
    fontSize: 18,
  },
  inputStyle: {
    color: '#015a92',
    backgroundColor: 'white',
    paddingHorizontal: 5,
    paddingLeft: 15,
    fontSize: 18,
    width: '70%',
  },

  frameInputStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    justifyContent: 'space-between',
  },
});
