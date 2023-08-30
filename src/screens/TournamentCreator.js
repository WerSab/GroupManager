//19.01.23 - validacja turnieju przy dodawaniu nowego turnieju
//wyświetlić listę istniejących biletów
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
  TextInput,
  Alert,
  Linking,
} from 'react-native';
import InputSpinner from 'react-native-input-spinner';
import {FIREBASE_STORAGE_DIRS} from '../config';
import addIcon from '../assets/icons/add.png';
import clearIcon from '../assets/icons/clear.png';
import safeIcon from '../assets/icons/safe.png';
import searchIcon from '../assets/icons/search.png';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import {addNewTournamentToCollection} from '../firebase/firestore-tournament-methods';
import {TicketTypeCreator} from './TicketTypeCreator';
import {validateTournament} from '../firebase/firestore-model-validators';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SCREEN} from '../navigation/screens';
import {TournamentContext} from '../context/TournamentContextProvider';
import useStoredTicketTypesFromRouteParams from '../hooks/useStoredTicketTypesFromRouteParams';
import {useTournamentHandler} from './common/hooks/useTournamentHandler';
import FrameOnBlurTicketOrder from '../styles/FrameOnBlurTicketOrder';
import {color, log} from 'react-native-reanimated';
import addDarkIcon from '../assets/icons/addDark.png';
import {TICKET_TYPE_NAMES} from '../config';
import {putFirebaseFile, selectImage} from '../firebase/storage-methods';
import {launchImageLibrary} from 'react-native-image-picker';
const MIN_EVENT_DURATION_IN_MILLIS = 60 * 1000;

// wrzucic tego typu funkcje do np. utils/stringUtils.js
export const capitalizeFirstLetter = value => {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
};

const initDefaultTicketTypeNames = () => {
  const ticketTypeNamesDisplayable = Object.values(TICKET_TYPE_NAMES).map(
    capitalizeFirstLetter,
  );
  return ticketTypeNamesDisplayable;
};

const allTicketTypeNames = initDefaultTicketTypeNames();

const TournamentCreator = ({route}) => {
  const navigation = useNavigation();
  const tournamentActions = useContext(TournamentContext).actions;

  const {ticketsBasket, clearTicketTypes} = useStoredTicketTypesFromRouteParams(
    route,
    'ticketType',
  );
  console.log(
    'Test_useStoredTicketTypesFromRouteParams_ticketTypes',
    ticketsBasket,
  );

  const [allowedTicketTypeNames, setAllowedTicketTypeNames] = useState(
    initDefaultTicketTypeNames,
  );

  useEffect(() => {
    const allowed = allTicketTypeNames.filter(
      allowed => !ticketsBasket.some(discount => discount.type === allowed),
    );
    setAllowedTicketTypeNames(allowed);
  }, [ticketsBasket]);

  const startDateInitialValue = new Date();
  // endDateInitialValue = minEndDate
  const endDateInitialValue = new Date(
    startDateInitialValue.getTime() + MIN_EVENT_DURATION_IN_MILLIS,
  );
  const {inputs, onConfirm, clearInputs} = useTournamentHandler({
    startDate: startDateInitialValue,
    endDate: endDateInitialValue,
  });
  const [nameInput, setNameInput] = inputs.name;
  const [linkInput, setLinkInput] = inputs.link;
  const [urlInput, setUrlInput] = inputs.url;
  const [startDate, setStartDate] = inputs.startDate;
  const [endDate, setEndDate] = inputs.endDate;

  const [category, setCategory] = inputs.category;
  const [place, setPlace] = inputs.place;
  const [slots, setSlots] = inputs.slots;
  const validationError = inputs.validationError;
  const [error, setError] = useState();
  useEffect(() => {
    console.log('inputs.val:', inputs.validationError);
  }, [inputs.validationError]);

  const handleTournamentSavePress = async () => {
    try {
      const tournament = onConfirm();
      await onSavePress(tournament, ticketsBasket);
    } catch (error) {
      console.error('catch error in promise.catch:', error);
      Alert.alert(
        'Wystąpił błąd',
        `Przepraszamy mamy problem z serwerem, prosze spróbować później`,
        [{text: 'Ok'}],
      );
    }
  };

  const clearData = () => {
    clearTicketTypes();
    clearInputs();
  };

  useEffect(() => {
    console.log('end date:', endDate);
  }, [endDate]);
  const onSavePress = async (tournament, ticketsBasket) => {
    await addNewTournamentToCollection(tournament, ticketsBasket);
    console.log('Tournament added');

    tournamentActions.requeryTournaments();
    console.log('torunaments requeried');
    console.log('navigating to tournament list');
    navigation.navigate(SCREEN.MANAGER_TAB.TOURNAMENT_LIST);
  };

  return (
    <View style={styles.mainBody}>
      <ScrollView>
        <Text style={styles.textHeader}>Nowy Turniej</Text>
        <View style={styles.sectionStyle}>
          <View style={styles.inputStyle}>
            <Picker
              selectedValue={category}
              style={{height: 50, width: 210, color: 'grey'}}
              onValueChange={setCategory}
            >
              <Picker.Item label="Wybierz kategorię" value="  "></Picker.Item>
              <Picker.Item label="Kultura" value="kultura" />
              <Picker.Item label="Sport" value="sport" />
            </Picker>
          </View>
        </View>
        <View style={styles.sectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={setNameInput}
            value={nameInput}
            placeholder="Nazwa..."
            placeholderTextColor="grey"
          />
        </View>
        <View style={styles.sectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={setPlace}
            value={place}
            placeholder="Miejsce..."
            placeholderTextColor="grey"
          />
        </View>
        <View style={styles.sectionStyle}>
          <View style={styles.inputRowStyle}>
            <Text style={styles.textGrey}>Ilość miejsc:</Text>
            <InputSpinner
              width={130}
              color={'#40c5f4'}
              textColor={'#005b98'}
              max={500}
              min={0}
              step={1}
              colorMax={'#f04048'}
              colorMin={'#005b98'}
              value={slots}
              onChange={setSlots}
            ></InputSpinner>
          </View>
        </View>
        <View style={styles.sectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={setLinkInput}
            value={linkInput}
            placeholder="Link do strony..."
            placeholderTextColor="grey"
          />
        </View>
        <View style={styles.sectionStyle}>
          <TouchableOpacity
            style={styles.inputStyle}
            onPress={() => selectImage()}
          >
            <Text style={styles.textGrey}>Załaduj obrazek</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>Data rozpoczęcia</Text>

        <View style={styles.sectionStyle}>
          <DatePicker
            date={startDate}
            onDateChange={setStartDate}
            minimumDate={new Date()}
            textColor="#939090"
          />
        </View>

        <Text style={styles.text}>Data zakończenia</Text>

        <View style={styles.sectionStyle}>
          <DatePicker
            style={{justifyContent: 'center'}}
            date={endDate}
            onDateChange={setEndDate}
            minimumDate={startDate}
            textColor="#939090"
          />
        </View>

        <View>
          <Text>{JSON.stringify(ticketsBasket, null, 2)}</Text>
        </View>

        <View style={styles.rowMenu}>
          <TouchableOpacity
            style={styles.roundButtonWhite}
            onPress={() => {
              clearData();
            }}
          >
            <Image style={styles.icon} source={clearIcon} />
            <Text style={styles.buttonTextStyle}>Wyczyść</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.roundButtonWhite}
            onPress={() =>
              navigation.navigate(SCREEN.TICKETTYPE_CREATOR, {
                fromScreenName: SCREEN.TOURNAMENT_CREATOR,
                allowedTicketTypeNames,
              })
            }
          >
            <Image style={styles.icon} source={addDarkIcon} />
            <Text style={styles.buttonTextStyle}>
              {ticketsBasket.length > 0 ? 'Dodaj kolejny bilet' : 'Dodaj bilet'}
            </Text>
          </TouchableOpacity>
        </View>
        {/* warunek który sprawdza czy error istnieje i jeżeli istnieje to renderuje nam view z textem jsx */}
        {error ? (
          <View>
            <Text style={{color: 'black'}}>
              {JSON.stringify(error, null, 2)}
            </Text>
          </View>
        ) : null}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={styles.roundButtonDark}
            onPress={handleTournamentSavePress}
          >
            <Image source={safeIcon} style={styles.icon} />
            <Text style={styles.buttonTextStyleWhite}>Zapisz event</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default TournamentCreator;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#C5EEFF',
    alignItems: 'center',
  },
  image: {height: 70, width: 110, flexBasis: '20%'},
  smallContainer: {
    justifyContent: 'center',
  },

  sectionStyle: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  sectionRowStyle: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  inputStyle: {
    flex: 1,
    color: '#005b98',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  inputRowStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: '#005b98',
    paddingRight: 15,
    borderRadius: 5,
    backgroundColor: 'white',
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
  textGrey: {
    color: 'grey',
    fontSize: 14,
    padding: 10,
  },

  button: {
    borderWidth: 0,
    borderColor: '#005b98',
    height: 40,
    borderRadius: 5,
    marginLeft: 25,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
    margin: 10,
  },
  roundButtonDark: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#005b98',
    margin: 10,
  },
  roundButtonWhite: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: '#005b98',
    backgroundColor: 'white',
    margin: 10,
  },
  buttonTextStyle: {
    color: '#005b98',
    paddingVertical: 10,
    fontSize: 16,
    marginStart: 5,
    marginEnd: 5,
    textAlign: 'center',
  },

  buttonTextStyleWhite: {
    color: 'white',
    paddingVertical: 10,
    fontSize: 16,
    marginStart: 5,
    marginEnd: 5,
    textAlign: 'center',
  },
  buttonSearchLink: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    borderWidth: 0.5,
    backgroundColor: 'white',
    margin: 10,
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
  },

  tekstMenu: {
    color: '#005b98',
    fontSize: 15,
    padding: 5,
  },
  rowMenu: {
    flexDirection: 'row',
    color: '#005b98',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    height: 25,
    width: 25,
  },
});
