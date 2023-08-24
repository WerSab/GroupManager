import React, {useContext, useState, useCallback, useRef} from 'react';
import {useNavigation} from '@react-navigation/core';
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
} from 'react-native';
import addIcon from '../assets/icons/add.png';
import searchIcon from '../assets/icons/search.png';
import deleteIcon from '../assets/icons/delete.png';
import {SCREEN} from '../navigation/screens';
import {deleteTournament} from '../firebase/firestore-tournament-methods';
import {TournamentContext} from '../context/TournamentContextProvider';
import {RENDER_ITEM_COLORS, TOURNAMENT_CATEGORIES} from '../config';
import dayjs from 'dayjs';

const TournamentsScreen = () => {
  // Zaznaczanie takich samych wystąpień -> ctrl+d
  // ctrl+z -> cofnij
  const {tournamentList, isLoaded, error, actions} =
    useContext(TournamentContext);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [categoryFilterInputValue, setCategoryFilterInputValue] = useState('');
  const [isModalSearchVisible, setIsModalSearchVisible] = useState(false);
  const [tournamentListToRender, setTournamentListToRender] =
    useState(tournamentList);
  const [filterSportPressed, setFilterSportPressed] = useState(false);
  const categoryCulture = TOURNAMENT_CATEGORIES.CULTURE;
  const categorySport = TOURNAMENT_CATEGORIES.SPORT;
  console.log('tournamentListToRender', tournamentListToRender);

  const clearInputs = () => {
    setTournamentListToRender(tournamentList);
    setSearchInputValue('');
  };
  // const changeColorPressedMenuButtons = ()=>{
  //   if
  // }

  const deleteAlert = (id, name) => {
    Alert.alert('Delete alert', `Do You want to delete ${name}?`, [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
      {
        text: 'Ok',
        onPress: () => {
          deleteTournament(id)
            .then(() => {
              actions.requeryTournaments();
            })
            .catch(function (err) {
              Alert.alert('Spróbuj ponownie później');
            });
        },
      },
    ]);
  };

  const navigation = useNavigation();

  const searchFunction = text => {
    const newData = tournamentListToRender?.filter(item => {
      const itemData = item.name.toLowerCase().trim();
      const textData = text.toLowerCase();
      return itemData.includes(textData);
    });
    setSearchInputValue(text);
    setTournamentListToRender(newData);
  };

  const categoryFilterFunction = selectedCategory => {
    const newData = tournamentListToRender?.filter(item => {
      const itemData = item.category;
      return itemData === selectedCategory;
    });
    setTournamentListToRender(newData);
  };

  const renderItem = item => {
    const startTimeFormated = dayjs(item.startDate).format('DD/MM/YYYY HH:mm');
    const eventImage = item.url;
    console.log('eventImage', item);
    return (
      <View style={styles.listStyle}>
        <TouchableOpacity
          style={styles.itemStyle}
          onPress={() => {
            navigation.navigate(SCREEN.TOURNAMENTDETAILS, {
              id: item.id,
            });
          }}
        >
          <Image source={{uri: eventImage}} style={styles.image} />
          <View>
            <Text style={styles.text}>
              <Text>{item.name}</Text>
            </Text>
            <Text style={styles.textMenu}>{startTimeFormated}</Text>
            <Text style={styles.textMenu}>{item.place}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteAlert(item.id, item.name)}>
          <Image source={deleteIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <View style={styles.mainBody}>
        <View style={styles.title}>
          <Text style={styles.textHeader}>Wydarzenia </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setIsModalSearchVisible(true);
            }}
          >
            <Image source={searchIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>
        {isModalSearchVisible && (
          <Modal
            animationType="slide"
            transparent={true}
            onRequestClose={() => setIsModalSearchVisible(false)}
            onBackdropPress={() => setIsModalSearchVisible(false)}
            onBackButtonPress={() => setIsModalSearchVisible(false)}
          >
            <View style={styles.modalView}>
              <TextInput
                inlineImageLeft="search_icon"
                inlineImagePadding={5}
                clearButtonMode="while-editing"
                value={searchInputValue}
                onChangeText={text => {
                  searchFunction(text);
                }}
                placeholder="Wyszukaj..."
                placeholderTextColor="grey"
                backgroundColor="white"
                borderColor="#005b98"
                borderWidth={0.5}
                borderRadius={5}
                width={250}
                style={styles.textMenu}
                marginBottom={10}
              />
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    setIsModalSearchVisible(false);
                  }}
                >
                  <Text style={styles.textWhite}>Zamknij</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    setIsModalSearchVisible(false);
                    setSearchInputValue('');
                  }}
                >
                  <Text style={styles.textWhite}>Pokaż listę</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}

        <View style={styles.rowMenu}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setFilterSportPressed(false);
              setFilterCulturePressed(true);
              categoryFilterFunction(categoryCulture);
            }}
          >
            <Text style={styles.textMenu}>Kultura</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setFilterCulturePressed(false);
              setFilterSportPressed(true);
              categoryFilterFunction(categorySport);
            }}
          >
            <Text style={styles.textMenu}>Sport</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              clearInputs();
            }}
          >
            <Text style={styles.textMenu}>Pokaż wszystko</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={tournamentListToRender}
          renderItem={({item}) => renderItem(item)} //do renderItem przekazujemy wartośc funkcji renderItem
          keyExtractor={(item, index) => index.toString()}
          withSearchbar={true}
        />
        <TouchableOpacity
          style={styles.roundButtonDark}
          onPress={() => navigation.navigate(SCREEN.TOURNAMENT_CREATOR)}
        >
          <Image source={addIcon} style={styles.icon} />
          <Text style={styles.textButton}>Dodaj turniej</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default TournamentsScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#C5EEFF',
  },
  image: {height: 100, width: 100, borderRadius: 5},

  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#C5EEFF',

    width: '90%',
    alignItems: 'center',
    margin: 10,
  },
  textHeader: {
    color: '#005b98',
    fontSize: 25,
    padding: 10,
  },
  text: {
    color: '#005b98',
    fontSize: 20,
    padding: 5,
  },

  textMenu: {
    color: '#005b98',
    fontSize: 18,
    padding: 5,
  },
  textWhite: {
    color: 'white',
    fontSize: 18,
    padding: 5,
  },
  textButton: {
    color: 'white',
    fontSize: 12,
    padding: 5,
    flexDirection: 'column',
  },

  listStyle: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: 'black',
    elevation: 20,
    alignItems: 'center',
  },
  itemStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '85%',
    padding: 2,
    marginBottom: 5,
    color: '#005b98',
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 16,
    alignItems: 'center',
    shadowColor: 'black',
    elevation: 20,
  },
  deleteStyle: {
    justifyContent: 'flex-end',
    borderWidth: 0.5,
    borderColor: 'blue',
  },

  icon_1: {
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
    margin: 2,
  },

  modalView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#005b98',
    borderRadius: 5,
    margin: '2%',
    marginVertical: '80%',
    opacity: 0.9,
  },
  button: {
    alignItems: 'center',
    borderRadius: 5,
    margin: 2,
    justifyContent: 'center',
  },
  buttonDark: {
    backgroundColor: '#005b98',
    borderWidth: 1,
    borderColor: '#005b98',

    alignItems: 'center',
    borderRadius: 5,
    margin: 10,
    justifyContent: 'center',
  },
  roundButtonDark: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#005b98',
    //opacity: 0.7,
    margin: 10,
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
  datePicker: {
    paddingVertical: 40,
  },

  rowMenu: {
    flexDirection: 'row',
    color: '#005b98',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
});
