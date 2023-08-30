// this.state = {
//     selectedStartDate: null,
// }; -> odpowiednik funkcyjny -> const [selectedStartDate, setSelectedStartDate] = useState(null);

import React, {useCallback, useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity,
  Alert,
  ScrollView,
  Button,
  useColorScheme,
} from 'react-native';
import linkIcon from '../assets/icons/link.png';
import {TournamentContext} from '../context/TournamentContextProvider';
import {UserContext} from '../context/UserContextProvider';
import {useTournamentTicketTypes} from '../hooks/useTournamentTicketTypes';
import {
  updateBookingsToTournament,
  getTournaments,
  bookingsCounter,
  deleteTicketType,
  addTicketType,
} from '../firebase/firestore-tournament-methods';
import {getTournamentFromContext} from '../common/context-methods';
import {NavigationContainer, useNavigation} from '@react-navigation/core';
import {SCREEN} from '../navigation/screens';
import {CustomButton} from '../styles/CustomButton';
import TicketOrderingScreen from './TicketOrderingScreen';
import {parseEventDurationTime} from '../common/date-time-methods';
import {getDateFromTimestamp} from '../firebase/firestore-helpers';
import dayjs from 'dayjs';
import {ThemeContext} from '../../App';
import addDarkIcon from '../assets/icons/addDark.png';

import editIcon from '../assets/icons/edit.png';
import {TournamentTicketType} from '../components/TournamentTicketType';
import {useNavigateWithParams} from '../hooks/useNavigateWithParams';
import {openLinkfromURL} from '../common/linking-methods';

const SUPPORTED_TICKET_TYPE_ACTION = {
  ADD: 'ADD',
  DELETE: 'DELETE',
};

const TICKET_TYPE_ACTION = {
  [SUPPORTED_TICKET_TYPE_ACTION.ADD]: addTicketType,
  [SUPPORTED_TICKET_TYPE_ACTION.DELETE]: deleteTicketType,
};

const TournamentDetails = ({route}) => {
  const theme = useContext(ThemeContext);
  const {navigateWithPrevParams} = useNavigateWithParams(route);
  const tournamentContext = useContext(TournamentContext);
  const tournamentId = route.params.id;

  const tournament = getTournamentFromContext(tournamentContext, tournamentId);
  const [ticketTypesData, loading, error, actions] =
    useTournamentTicketTypes(tournamentId);
  console.log('aaaaaaaaa', ticketTypesData);
  console.log('bbbbbbbbbbbbbb', tournament);
  const navigation = useNavigation();

  useEffect(() => {
    if (!route.params.ticketType) {
      return;
    }

    handleTicketTypeAction(
      SUPPORTED_TICKET_TYPE_ACTION.ADD,
      route.params.ticketType,
    );
  }, [route.params.ticketType]);

  const displaySuccessAlert = action => {
    action == SUPPORTED_TICKET_TYPE_ACTION.ADD
      ? Alert.alert('Bilet został pomyślnie dodany')
      : Alert.alert('Bilet został pomyślnie usunięty');
  };

  // TODO: 26.01.2023
  // 1. Obsluzyc alert po zapisaniu/usunieciu biletu ze wzgledu na wykonywana akcje
  // 2. Poczytac i ew. sprobowac zrobic upgrade react-native (0.70.x)
  // 3. Obsluga wyjatkow w aplikacji (globalnie i storowanie ich) - crashlytics (firebase) / sanity

  const handleTicketTypeAction = async (action, arg) => {
    const actionFn = TICKET_TYPE_ACTION[action];
    if (!actionFn) {
      throw new Error('Unsupported action');
    }
    try {
      await actionFn(tournamentId, arg);
      actions.requeryTicketTypes();
      displaySuccessAlert(action);
    } catch (error) {
      Alert.alert('Spróbuj ponownie później');
    }
  };

  const parsedTicketTypesData = ticketTypesData?.map(ticketType => (
    <TournamentTicketType
      key={ticketType.id.toString()}
      ticketType={ticketType}
      tournamentId={tournamentId}
      onTicketTypeDelete={() =>
        handleTicketTypeAction(
          SUPPORTED_TICKET_TYPE_ACTION.DELETE,
          ticketType.id,
        )
      }
    />
  ));

  console.log('parsedTicketTypesData', parsedTicketTypesData);
  const startTimeFormated = dayjs(tournament.startDate).format(
    'DD/MM/YYYY HH:mm',
  );
  const endTimeFormated = dayjs(tournament.endDate).format('DD/MM/YYYY HH:mm');
  const eventDuration = parseEventDurationTime(tournament);
  console.log('ticketTypesData', ticketTypesData);
  return (
    <>
      <View style={styles.mainBody}>
        <ScrollView>
          <View style={styles.itemStyle}>
            <View style={styles.title}>
              <Text style={styles.textHeader}>{tournament.name}</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(SCREEN.MODIFY_TOURNAMENT, {
                    id: tournamentId,
                  })
                }
              >
                <Image style={styles.icon_1} source={editIcon} />
              </TouchableOpacity>
            </View>
            <Text style={styles.textDark}>Miejsce: {tournament.place}</Text>
            <Text style={styles.textDark}>
              Termin rozpoczęcia: {startTimeFormated}
            </Text>
            <Text style={styles.textDark}>
              Termin zakończenia: {endTimeFormated}
            </Text>
            <Text style={styles.textDark}>Czas trwania: {eventDuration}</Text>
            <Text style={styles.textDark}>
              Ilość sprzedanych biletów: {tournament.interval}
            </Text>
            <Text style={styles.textDark}>
              Ilość rezerwacji: {tournament.interval}
            </Text>
            <Text style={styles.textDark}>
              Ilość miejsc: {tournament.slots}
            </Text>
            <TouchableOpacity
              onPress={() => openLinkfromURL(tournament.link)} //https://reactnative.dev/docs/linking//(then i catch/ obsłużyć w promisie/sprawdzić Regex/https://regex101.com/https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url#:~:text=javascript%3Avoid%20%280%29%20is%20valid%20URL%2C%20although%20not%20an,DNS%29%20https%3A%2F%2Fexample..com%20is%20valid%20URL%2C%20same%20as%20above
            >
              <Text style={styles.linkStyle}>
                <Image source={linkIcon} style={styles.icon} />
                Link do wydarzenia
              </Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <Text style={styles.text}>Ładuje się ...</Text>
          ) : error ? (
            <Text>Blad pobierania biletów {!!error}</Text>
          ) : (
            <View>
              <View style={styles.itemStyle}>
                <View style={styles.title}>
                  <Text style={styles.textHeader}> Bilety:</Text>
                </View>
                {parsedTicketTypesData}
              </View>
              <View style={styles.rowMenu}>
                <TouchableOpacity
                  style={styles.roundButtonWhite}
                  onPress={() => {
                    navigateWithPrevParams(SCREEN.TICKETTYPE_CREATOR, {
                      fromScreenName: SCREEN.TOURNAMENTDETAILS,
                    }); //zmienić przekierowanie na takie z parametrem
                  }}
                >
                  <Image style={styles.icon} source={addDarkIcon} />
                  <Text style={styles.buttonTextStyle}>Dodaj Bilet</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </>
    //{JSON.stringify(tournament, null, 2)}
  );
};
export default TournamentDetails;
const styles = StyleSheet.create({
  mainBody: {
    flex: 1,

    backgroundColor: '#C5EEFF',
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
    alignItems: 'center',
    borderRadius: 5,
  },
  textHeader: {
    color: 'white',
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
    textAlign: 'left',
    fontSize: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
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
    borderColor: '#005b98',
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
  roundButtonWhite: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'white',
    borderWidth: 0.5,
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
  rowMenu: {
    flexDirection: 'row',
    color: '#005b98',
    alignItems: 'center',
    justifyContent: 'center',
  },

  datePicker: {
    paddingVertical: 40,
  },
});
