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
import addIcon from '../assets/icons/add.png';
import {SCREEN} from '../navigation/screens';
import deleteIcon from '../assets/icons/delete.png';
import {Picker} from '@react-native-picker/picker';
import {MessagesContext} from '../context/MessageContextProvider';
import {
  addNewMessageToCollection,
  deleteMessage,
} from '../firebase/firestore-message-methods';

const MessagesListScreen = () => {
  const navigation = useNavigation();
  const messagesContextValue = useContext(MessagesContext);
  const [isModalAddMessageVisible, setIsModalAddMessageVisible] =
    useState(false);
  const [messageContentInput, setContentMessageInput] = useState('');
  const [messageCategoryInput, setMessageCategoryInput] = useState('Kategoria');
  console.log('messagesContextValue', messagesContextValue);
  //requeryMessages();
  //    const[message, ]
  //     const messagesContextValue = context;
  //     messagesContextValue.messagesList;
  const requeryMessages = messagesContextValue.actions.requeryMessages;
  const messagesList = messagesContextValue.messagesList;
  //
  const clearInputs = () => {
    setContentMessageInput('');
    setMessageCategoryInput('Kategoria');
  };

  const deleteAlert = id => {
    Alert.alert('Delete alert', `Do You want to delete message?`, [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
      {
        text: 'Ok',
        onPress: () => {
          deleteMessage(id)
            .then(() => {
              requeryMessages();
            })
            .catch(function (err) {
              Alert.alert('Spróbuj ponownie później');
            });
        },
      },
    ]);
  };
  const onSavePress = () => {
    try {
      const message = {
        content: messageContentInput,
        category: messageCategoryInput,
      };

      addNewMessageToCollection(message)
        .then(() => {
          setIsModalAddMessageVisible(!isModalAddMessageVisible);
          clearInputs();
          requeryMessages();
        })

        .catch(function (err) {
          console.log('catch error in promise.catch:', err);
          Alert.alert(
            'Wystąpił błąd',
            `Przepraszamy mamy problem z serwerem, prosze spróbować później`,
            [{text: 'Ok'}],
          );
        });
    } catch (error) {
      console.log('try/catch blad: ', error.message); //wyświetlić text błędu
    }
  };

  const renderItem = item => {
    return (
      <View style={styles.listStyle}>
        <TouchableOpacity
          style={styles.itemStyle}
          // onPress={() => {
          //     navigation.navigate(SCREEN.MANAGER_TAB.MESSAGES_LIST, {
          //         id: item.id
          //     });
          // }}
        >
          <Text style={styles.textDark}>
            <Text>{item.category}: </Text>
            <Text>{item.content}</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteAlert(item.id)}>
          <Image source={deleteIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      {/*<CustomHeader/>*/}
      <View style={styles.mainBody}>
        <View style={styles.title}>
          <Text style={styles.text}>Wiadomości </Text>
          <TouchableOpacity onPress={() => setIsModalAddMessageVisible(true)}>
            <Image style={styles.icon_1} source={addIcon} />
          </TouchableOpacity>
        </View>
        {isModalAddMessageVisible && (
          <Modal
            animationType="slide"
            transparent={true}
            onRequestClose={() => setIsModalAddMessageVisible(false)}
            onBackdropPress={() => setIsModalAddMessageVisible(false)}
            onBackButtonPress={() => setIsModalAddMessageVisible(false)}>
            <View style={styles.modalView}>
              <Text style={styles.textHeader}>Dodaj nową wiadomość</Text>
              <ScrollView>
                <Picker
                  selectedValue={messageCategoryInput}
                  style={{height: 50, width: 150, color: '#005b98'}}
                  onValueChange={itemValue =>
                    setMessageCategoryInput(itemValue)
                  }>
                  <Picker.Item label="Kategoria" value="  " />
                  <Picker.Item label="News" value="news" />
                  <Picker.Item label="Ogłoszenie" value="ogłoszenie" />
                </Picker>

                <TextInput
                  style={styles.input}
                  onChangeText={setContentMessageInput}
                  value={messageContentInput}
                  placeholder="Treść wiadomości..."
                />

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    width: '100%',
                    padding: 10,
                  }}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      setIsModalAddMessageVisible(!isModalAddMessageVisible);
                    }}>
                    <Text style={styles.textButton}>Zamknij</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      clearInputs();
                    }}>
                    <Text style={styles.textButton}>Wyczyść</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      onSavePress();
                    }}>
                    <Text style={styles.textButton}>Zapisz wydarzenie</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </Modal>
        )}

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

export default MessagesListScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
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
    fontSize: 20,
    padding: 10,
  },
  textDark: {
    color: '#005b98',
    fontSize: 16,
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
