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
} from 'react-native';
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

const MIN_EVENT_DURATION_IN_MILLIS = 60 * 1000;

const TournamentCreator = ({route}) => {
  //const [nameInput, setNameInput] = useState();
  const [placeInput, setPlaceInput] = useState();
  //const [linkInput, setLinkInput] = useState('');
  const [tournamentCategoryInput, setTournamentCategoryInput] =
    useState('Kategoria');
  const [date, setDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [error, setError] = useState();
  const navigation = useNavigation();
  //  const route = useRoute();
  const tournamentActions = useContext(TournamentContext).actions;

  const field = 'ticketType';
  // TODO: 28.11.22:  [TypeError: undefined is not an object (evaluating 'ticketTypes.length')]
  const {ticketsBasket, clearTicketTypes} = useStoredTicketTypesFromRouteParams(
    route,
    'ticketType',
  );
  console.log(
    'Test_useStoredTicketTypesFromRouteParams_ticketTypes',
    ticketsBasket,
  );
  const minimumEndDate = new Date(
    date.getTime() + MIN_EVENT_DURATION_IN_MILLIS,
  );
  const {inputs, onConfirm, clearInputs} = useTournamentHandler();
  const [nameInput, setNameInput] = inputs.name;
  const [linkInput, setLinkInput] = inputs.link;
  //19.12.2022 - dorobić resztę inputów

  useEffect(() => {
    console.log('inputs.val:', inputs.validationError);
  }, [inputs.validationError]);

  const handleTournamentSavePress = () => {
    try {
      const tournament = onConfirm();
      onSavePress(tournament, ticketsBasket);
    } catch (error) {
      console.log('handleTournamentSavePress error:', error);
    }
  };

  const onSavePress = tournament => {
    // cdezaktywuje przycisk
    addNewTournamentToCollection(tournament, ticketsBasket)
      .then(() => {
        clearInputs();
        tournamentActions.requeryTournaments();
        //aktywuję przycisk onsavepress
      })
      .catch(function (err) {
        console.log('catch error in promise.catch:', err);
        Alert.alert(
          'Wystąpił błąd',
          `Przepraszamy mamy problem z serwerem, prosze spróbować później`,
          [
            {text: 'Ok'},
            //aktywuję przycisk onsavepress
          ],
        );
      });
    // const promiseResult = await addNewTournamentToCollection({},[]); // async/await sugar syntax for promise
    // console.log(promiseResult);
  };

  return (
    <View style={styles.mainBody}>
      <ScrollView>
        <Text style={styles.textHeader}>Nowy Turniej</Text>
        <Picker
          selectedValue={tournamentCategoryInput}
          style={{height: 60, width: 150, color: '#005b98'}}
          onValueChange={itemValue => setTournamentCategoryInput(itemValue)}>
          <Picker.Item label="Kategoria" value="  " />
          <Picker.Item label="Kultura" value="kultura" />
          <Picker.Item label="Sport" value="sport" />
        </Picker>
        <TextInput
          style={styles.text}
          onChangeText={setNameInput}
          value={nameInput}
          placeholder="Nazwa..."
        />
        <TextInput
          style={styles.text}
          onChangeText={setPlaceInput}
          value={placeInput}
          placeholder="Miejsce..."
        />
        <Text style={styles.text}>Data rozpoczęcia</Text>

        <DatePicker
          date={date}
          onDateChange={setDate}
          minimumDate={new Date()}
        />

        <Text style={styles.text}>Data zakończenia</Text>

        <DatePicker
          date={minimumEndDate}
          onDateChange={setEndDate}
          minimumDate={minimumEndDate}
        />

        <TextInput
          style={styles.text}
          onChangeText={setLinkInput}
          value={linkInput}
          placeholder="Link do strony..."
        />
        <View style={styles.ticketStyle}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate(SCREEN.TICKETTYPE_CREATOR, {
                fromScreeName: SCREEN.TOURNAMENT_CREATOR,
              })
            }>
            <Text style={styles.textDark}>Dodaj bilet </Text>
          </TouchableOpacity>
        </View>
        {/* warunek który sprawdza czy error istnieje i jeżeli istnieje to renderuje nam view z textem jsx */}
        {error && (
          <View>
            <Text>{error}</Text>
          </View>
        )}
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
              clearInputs();
            }}>
            <Text style={styles.textDark}>Wyczyść</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleTournamentSavePress}>
            <Text style={styles.textDark}>Zapisz wydarzenie</Text>
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
  textContainer: {
    textAlign: 'center',
    flexBasis: '70%',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#005b98',
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
    fontSize: 16,
    padding: 10,
    flexDirection: 'column',
  },
  listStyle: {
    flexDirection: 'row',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
  },
  button: {
    backgroundColor: 'white',
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
});
