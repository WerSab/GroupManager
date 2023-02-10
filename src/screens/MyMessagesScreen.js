import React, {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {
  View,
  Image,
  Linking,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';

import {SCREEN} from '../navigation/screens';
import {MessagesContext} from '../context/MessageContextProvider';

const MyMessagesScreen = () => {
  const navigation = useNavigation();
  const {messagesList, isLoaded, error, actions} = useContext(MessagesContext);
  const [isModalAddMessageVisible, setIsModalAddMessageVisible] =
    useState(false);
  const [messageContentInput, setContentMessageInput] = useState('');
  const [messageCategoryInput, setMessageCategoryInput] = useState('Kategoria');
  console.log('messagesList', messagesList);

  const renderItem = item => {
    return (
      <View style={styles.listStyle}>
        <Text style={styles.itemStyle}>
          <Text>{item.category}: </Text>
          <Text>{item.content}</Text>
        </Text>
      </View>
    );
  };

  return (
    <>
      {/*<CustomHeader/>*/}
      <View style={styles.mainBody}>
        <View style={styles.title}>
          <Text style={styles.textDark}>Wiadomości </Text>
        </View>

        <FlatList
          data={messagesList}
          renderItem={({item}) => renderItem(item)} //do renderItem przekazujemy wartośc funkcji renderItem
          keyExtractor={(item, index) => index.toString()}
          style={styles.container}
          withSearchbar={true}
        />
      </View>
    </>
  );
};

export default MyMessagesScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    backgroundColor: '#C5EEFF',
    alignItems: 'center',
  },
  image: {height: 70, width: 110, flexBasis: '20%'},
  textContainer: {
    textAlign: 'center',
    flexBasis: '70%',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#C5EEFF',
    width: '100%',
  },
  textHeader: {
    color: '#005b98',
    fontSize: 20,
    padding: 10,
  },
  text: {
    color: '#005b98',
    fontSize: 16,
    padding: 10,
  },
  textDark: {
    color: '#005b98',
    fontSize: 20,
    padding: 10,
    flexDirection: 'column',
  },
  textButton: {
    color: 'white',
    fontSize: 15,
    padding: 10,
  },
  container: {
    flex: 2,
  },
  listStyle: {
    flexDirection: 'row',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemStyle: {
    flexDirection: 'row',
    width: 250,
    padding: 2,
    marginBottom: 5,
    color: '#005b98',
    backgroundColor: 'white',
    marginRight: 2,
    marginLeft: 2,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 16,
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
    // elevation: 5,
    margin: '2%',
  },
  button: {
    backgroundColor: '#005b98',
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
    justifyContent: 'center',
  },
  ticketStyle: {
    backgroundColor: '#e3ecf2',
    alignItems: 'center',
    borderRadius: 15,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
    margin: 10,
    justifyContent: 'center',
    borderRadius: 20,
  },
});
