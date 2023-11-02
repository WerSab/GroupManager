//przerobić modal z wyszukiwanie na input poniżej i ukrycie lupy - wykorzystać use Throttle (komponent renderuje się dopiero po określonym czasie, a nie po każdej zmianie stanu (np. po wpisaniu całego hasła))
import React, {
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';
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
import {
  FIREBASE_STORAGE_DIRS,
  TOURNAMENT_CATEGORIES,
} from '../config';
import dayjs from 'dayjs';
import {getFirebaseFileURL} from '../firebase/storage-methods';
import {Tab} from 'react-native-elements';
import _debounce from 'lodash/debounce';

//pamięć: https://developer.android.com/training/data-storage
const TournamentsScreen = () => {
 
  const {tournamentList, isLoaded, error, actions} =
    useContext(TournamentContext);
  const [searchInputValue, setSearchInputValue] = useState('');
   const [tournamentListToRender, setTournamentListToRender] =
    useState(tournamentList);
  const [filterCulturePressed, setFilterCulturePressed] = useState(false);
  const [filterSportPressed, setFilterSportPressed] = useState(false);
  const [tournamentImages, setTournamentImages] = useState({});
  const categoryCulture = TOURNAMENT_CATEGORIES.CULTURE;
  const categorySport = TOURNAMENT_CATEGORIES.SPORT;
  console.log('tournamentListToRender', tournamentListToRender);

  const searchFunction = text => {
    console.log('Searching for:', text);
    setSearchInputValue(text);
   
  };

  useEffect(() => {
    const inputValue = searchInputValue.trim().toLocaleLowerCase();
    if(inputValue.length == 0) {
     return setTournamentListToRender(tournamentList);
    }
    const newData = tournamentListToRender?.filter(item => {
      const itemData = item.name.toLowerCase().trim();
      return itemData.includes(inputValue);
    });
    setTournamentListToRender(newData);
  }, [searchInputValue])
  

  const debouncedSearchFunction = _debounce(searchFunction, 500);

  const handleInputChange = text => {
    setSearchInputValue(text);
       debouncedSearchFunction(text);
  };

  useEffect(() => {
    setTournamentListToRender(tournamentList);
  }, [tournamentList]);

  useEffect(() => {
    for (const tournament of tournamentListToRender) {
      const {id} = tournament;
      getFirebaseFileURL(FIREBASE_STORAGE_DIRS.TOURNAMENTS, id).then(
        resolvedValue => {
          setTournamentImages(prev => ({
            ...prev,
            [id]: resolvedValue,
          }));
        },
      );
    }
  }, [tournamentListToRender]);

 
  const clearInputs = () => {
    setTournamentListToRender(tournamentList);
    setSearchInputValue('');
  };
 

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

  

  const categoryFilterFunction = selectedCategory => {
    try {
      clearInputs();
      filterCulturePressed
        ? setFilterSportPressed(false)
        : setFilterSportPressed(true);
      const newData = tournamentListToRender?.filter(item => {
        const itemData = item.category;
        return itemData === selectedCategory;
      });
      setTournamentListToRender(newData);
    } catch (error) {
      Alert.alert(error);
    }
  };

  const renderItem = item => {
    const startTimeFormated = dayjs(item.startDate).format('DD/MM/YYYY, g.HH:mm');
    return (
      <View style={styles.listStyle}>
        <TouchableOpacity
          style={styles.itemStyle}
          onPress={() => {
            navigation.navigate(SCREEN.TOURNAMENTDETAILS, {
              id: item.id,
              url: item.url,
            });
          }}
        >
          <Image
            source={{uri: tournamentImages[item.id]}}
            style={styles.image}
          />

          <View>
            <Text style={styles.text}>
              <Text>{item.name}</Text>
            </Text>
            <Text style={styles.textMenu}>{item.place}, {startTimeFormated}</Text>
            <Text style={styles.textMenu}></Text>
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
          
        </View>
        <View style={styles.searchInputStyle}>
              
              <TextInput
                inlineImageLeft="search_icon"
                clearButtonMode="while-editing"
                value={searchInputValue}
                onChangeText={handleInputChange}
                placeholder="Wyszukaj..."
                placeholderTextColor="grey"
                backgroundColor="white"
                borderRadius={5}
                width={250}
                style={styles.textMenu}
               
              />
             <Image source={searchIcon} style={styles.icon} />
                          </View>
              

        <View style={styles.rowMenu}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setFilterCulturePressed(true);
              categoryFilterFunction(categoryCulture);
            }}
          >
            <Text style={styles.textMenu}>Kultura</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
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
            <Text style={styles.textMenu}>Wyczyść filtry</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={tournamentListToRender}
          renderItem={({item}) => renderItem(item)} 
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
  image: {height:55, width: 55, borderRadius: 5},

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
    fontSize: 16,
    paddingLeft: 5,
  },

  textMenu: {
    color: '#005b98',
    fontSize: 14,
    paddingLeft: 5,
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
    marginBottom: 5,
    shadowColor: 'black',
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '85%',
    color: '#005b98',
    backgroundColor: 'white',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 16,
    alignItems: 'center',
 
  },
  searchInputStyle:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    color: '#005b98',
    backgroundColor: 'white',
    borderRadius: 5,
    textAlign: 'center',
    alignItems: 'center',
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

    button: {
    alignItems: 'flex-end',
    borderRadius: 5,
    margin: 2,
    justifyContent: 'flex-end',
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
    padding: 5,
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
    justifyContent: 'space-between',
    margin: 10,
  },
});
