//05.12.2022 / sprawdzić jak daty wyświetlają się gdzie indziej i zrobić tak samo.
//12/12/2022/zmienić inputy dat na kalendarz i czas.
import React, {useContext, useState} from 'react';
import {
  View,
  Linking,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {getTournamentFromContext} from '../common/context-methods';
import {TournamentContext} from '../context/TournamentContextProvider';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
//import { useTournamentTicketTypes } from '../hooks/useTournamentTicketTypes';
import {modifyTournament} from '../tournaments-examples';
import {validateTournament} from '../fireBase/firestore-model-validators';
import {getDateFromTimestamp} from '../fireBase/firestore-Helper';
import {getEventDuration} from './common/tournament-methods';
import {formatDate, parseEventDurationTime} from '../common/date-time-methods';

const parseTournamentToDisplayable = tournament => {
  console.log(tournament);
  const endDate = getDateFromTimestamp(tournament.endDate);
  const startDate = getDateFromTimestamp(tournament.startDate);

  return {
    ...tournament,
    endDate: formatDate(endDate, 'DD/MM/YYYY HH:mm'),
    startDate: formatDate(startDate, 'DD/MM/YYYY HH:mm'),
    eventDuration: parseEventDurationTime(tournament),
  };
};

const ModifyTournamentScreen = ({route}) => {
  const tournamentContext = useContext(TournamentContext);
  const contextTournament = getTournamentFromContext(
    tournamentContext,
    route.params.id,
  );
  const tournament = parseTournamentToDisplayable(contextTournament);
  const id = tournament.id;
  console.log('tournament input', tournament);
  const [nameInput, setNameInput] = useState(tournament.name);
  const [dateInput, setDateInput] = useState(tournament.endDate);
  const [startTimeInput, setStartTimeInput] = useState(tournament.startDate);
  const [intervalInput, setIntervalInput] = useState(tournament.eventDuration);
  const [placeInput, setPlaceInput] = useState(tournament.place);
  const [linkInput, setLinkInput] = useState(tournament.link);
  const [tournamentCategoryInput, setTournamentCategoryInput] = useState(
    tournament.tournamentCategory,
  );
  // const [ticketTypesData, setTicketTypesData] = useTournamentTicketTypes(tournament);
  /* onUpdate(){
        modifyTournament(tournament) // zdefiniowana w tournament-examples.js
    }*/
  console.log('tournament', tournament);
  const clearInputs = () => {
    setNameInput('');
    setDate(new Date());
    setPlaceInput('');
    setTournamentCategoryInput('Kategoria');
    clearTicketTypes();
    setLinkInput('');
  };

  const onUpdate = () => {
    //parsowanie ze stringów na int - do zrobienia_12.04.2022
    //const parsedInterval = parseInt(intervalInput);
    if (isNaN(parsedInterval)) {
      Alert.alert('Wystąpił błąd', `Prosze wprowadzić liczbę`, [{text: 'Ok'}]);
      return undefined;
    }
    try {
      const tournamentInput = {
        name: nameInput,
        date: dateInput,
        startTime: startTimeInput,
        interval: intervalInput,
        place: placeInput,
        tournamentCategory: tournamentCategoryInput,
        link: linkInput,
      };

      validateTournament(tournamentInput);
      modifyTournament(id, tournamentInput)
        .then(() => {
          clearInputs();
        })

        .catch(function (err) {
          console.log('catch error in promise.catch:', err);
          Alert.alert(
            'Wystąpił błąd',
            `Przepraszamy mamy problem z serwerem, prosze spróbować później`,
            [{text: 'Ok'}],
          );
        });

      // const promiseResult = await addNewTournamentToCollection({},[]); // async/await sugar syntax for promise
      // console.log(promiseResult);
    } catch (error) {
      Alert.alert(
        'Wystąpił błąd',
        `Przepraszamy mamy problem z serwerem, prosze spróbować później`,
        [{text: 'Ok'}],
      );
      console.log('try/catch blad: ', error.message); //wyświetlić text błędu
    }
  };
  return (
    <View>
      <ScrollView>
        <Text style={styles.textDark}>Edycja wydarzenia: </Text>

        <Picker
          selectedValue={tournamentCategoryInput}
          style={{height: 50, width: 150, color: '#005b98'}}
          onValueChange={itemValue => setTournamentCategoryInput(itemValue)}>
          <Picker.Item
            label={tournamentCategoryInput}
            value={tournamentCategoryInput}
          />
          <Picker.Item label="Kultura" value="kultura" />
          <Picker.Item label="Sport" value="sport" />
        </Picker>
        <View style={styles.input}>
          <TextInput
            style={styles.textDark}
            onChangeText={setNameInput}
            value={nameInput}
            placeholder="Nazwa..."
          />
        </View>
        <TextInput
          style={styles.textDark}
          onChangeText={setPlaceInput}
          value={placeInput}
          placeholder="Miejsce..."
        />
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
          style={styles.textDark}
          onChangeText={setIntervalInput}
          value={intervalInput}
          placeholder="Czas trwania..."
        />
        <TextInput
          style={styles.input}
          onChangeText={setLinkInput}
          value={linkInput}
          placeholder="Link do strony..."
        />
        <Text>Bilety</Text>
        {/* <TextInput
                    style={styles.textDark}
                    onChangeText={(text) => handleStateChange("name", text)}
                    value={ticketTypesData.name}
                    placeholder="Nazwa biletu..."
                />
                <TextInput
                    style={styles.textDark}
                    onChangeText={(text) => handleStateChange("price", text)}
                    value={ticketTypesData.price}
                    placeholder="Cena biletu..."
                />
                <TextInput
                    style={styles.textDark}
                    onChangeText={(text) => handleStateChange("slots", text)}
                    value={ticketTypesData.slots}
                    placeholder="Ilość miejsc..."
                /> */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            onUpdate();
          }}>
          <Text style={styles.textButton}>Zapisz wydarzenie</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
export default ModifyTournamentScreen;
const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    //justifyContent: 'center',
    backgroundColor: '#015a92',
  },
  text: {
    color: 'white',
    fontSize: 20,
    padding: 10,
  },
  textDark: {
    color: '#005b98',
    fontSize: 16,
  },
  container: {
    flex: 1,
  },
  listStyle: {
    padding: 20,
    marginBottom: 5,
    color: '#005b98',
    backgroundColor: 'white',
    marginRight: 20,
    marginLeft: 20,

    textAlign: 'left',
    fontSize: 16,
  },
  linkStyle: {
    color: '#fbb713',
    height: 40,
  },
  buttonStyle: {
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
  },
  buttonTextStyle: {
    paddingVertical: 10,
    color: '#005b98',
    fontSize: 16,
  },
  modalView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    elevation: 5,
    margin: '10%',
  },
  twoButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {height: 70, width: 70, flexBasis: '20%'},
  icon: {height: 30, width: 30, flexBasis: '20%'},
  input: {
    flex: 1,
    flexDirection: 'row',
  },
});
