//05.12.2022 / sprawdzić jak daty wyświetlają się gdzie indziej i zrobić tak samo.
//12/12/2022/zmienić inputy dat na kalendarz i czas.

// 21.12.2022
// 2. fixnac wywolania dat na obiekcie tournament w calej aplikacji (wskazowka: useContext(TournamentContext))

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
import {
  addNewTournamentToCollection,
  modifyTournament,
} from '../firebase/firestore-tournament-methods';
import {validateTournament} from '../firebase/firestore-model-validators';
import {getDateFromTimestamp} from '../firebase/firestore-helpers';
import {getEventDuration} from './common/tournament-methods';
import {formatDate, parseEventDurationTime} from '../common/date-time-methods';
import {useTournamentHandler} from './common/hooks/useTournamentHandler';

const parseTournamentToDisplayable = tournament => {
  return {
    ...tournament,
    endDate: formatDate(tournament.endDate, 'DD/MM/YYYY HH:mm'),
    startDate: formatDate(tournament.startDate, 'DD/MM/YYYY HH:mm'),
    eventDuration: parseEventDurationTime(tournament),
  };
};

const ModifyTournamentScreen = ({navigation, route}) => {
  const tournamentContext = useContext(TournamentContext);
  const contextTournament = getTournamentFromContext(
    tournamentContext,
    route.params.id,
  );
  const tournament = parseTournamentToDisplayable(contextTournament);

  const id = tournament.id;
  const {inputs, onConfirm} = useTournamentHandler(contextTournament);
  const [nameInput, setNameInput] = inputs.name;
  const [placeInput, setPlaceInput] = inputs.place;
  const [linkInput, setLinkInput] = inputs.link;
  const [tournamentCategoryInput, setTournamentCategoryInput] = inputs.category;
  const [startDateInput, setStartDateInput] = inputs.startDate;
  const [endDateInput, setEndDateInput] = inputs.endDate;

  const onUpdate = async () => {
    const tournament = onConfirm();
    try {
      await modifyTournament(id, tournament);
      tournamentContext.actions.requeryTournaments();
      navigation.goBack();
    } catch (error) {
      Alert.alert(
        'Wystąpił błąd',
        `Przepraszamy mamy problem z serwerem, prosze spróbować później`,
        [{text: 'Ok'}],
      );
    }
  };
  return (
    <View style={styles.mainBody}>
      <ScrollView>
        <View style={styles.itemStyle}>
          <Text style={styles.text}>Edycja wydarzenia: </Text>

          <Picker
            selectedValue={tournamentCategoryInput}
            style={{height: 50, width: 150, color: '#005b98'}}
            onValueChange={itemValue => setTournamentCategoryInput(itemValue)}>
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
          <Text style={styles.textDark}>Data rozpoczęcia:</Text>
          <DatePicker
            date={startDateInput}
            onDateChange={date => {
              console.log(
                'Aktuializacja daty:',
                date,
                date instanceof Date,
                typeof Date,
              );
              setStartDateInput(date);
            }}
            minimumDate={new Date()}
          />

          <Text style={styles.textDark}>Data zakończenia:</Text>

          <DatePicker
            date={endDateInput}
            onDateChange={setEndDateInput}
            minimumDate={startDateInput}
          />

          <TextInput
            style={styles.linkStyle}
            onChangeText={setLinkInput}
            value={linkInput}
            placeholder="Link do strony..."
          />

          <TouchableOpacity style={styles.button} onPress={onUpdate}>
            <Text style={styles.textDark}>Zapisz wydarzenie</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
export default ModifyTournamentScreen;
const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    backgroundColor: '#C5EEFF',
  },
  text: {
    color: '#005b98',
    fontSize: 20,
    padding: 10,
  },
  textDark: {
    color: '#005b98',
    fontSize: 16,
  },

  itemStyle: {
    flexDirection: 'column',
    padding: 15,
    marginStart: 20,
    marginEnd: 20,
    marginTop: 20,
    color: '#005b98',
    backgroundColor: 'white',
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 5,
    fontSize: 16,
  },
  linkStyle: {
    color: 'blue',
    height: 40,
    fontSize: 16,
  },

  input: {
    flex: 1,
    flexDirection: 'row',
  },
});
