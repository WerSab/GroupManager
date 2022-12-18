// this.state = {
//     selectedStartDate: null,
// }; -> odpowiednik funkcyjny -> const [selectedStartDate, setSelectedStartDate] = useState(null);

import React, {useContext, useState} from 'react';
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
} from 'react-native';
import linkIcon from '../assets/icons/link.png';
import {useEffect} from 'react/cjs/react.production.min';
import {TournamentContext} from '../context/TournamentContextProvider';
import {UserContext} from '../context/UserContextProvider';
import {useTournamentTicketTypes} from '../hooks/useTournamentTicketTypes';
import {
  updateBookingsToTournament,
  getTournaments,
  bookingsCounter,
} from '../tournaments-examples';
import {getTournamentFromContext} from '../common/context-methods';
import {NavigationContainer, useNavigation} from '@react-navigation/core';
import {SCREEN} from '../navigation/screens';
import {CustomButton} from '../styles/CustomButton';
import TicketOrderingScreen from './TicketOrderingScreen';
import {parseEventDurationTime} from '../common/date-time-methods';
import {getDateFromTimestamp} from '../fireBase/firestore-Helper';
import dayjs from 'dayjs';

const PriceDisplayable = () => {
  const priceEntries = Object.entries(element.prices);
  return (
    <View>
      {/* Tutaj korzystajac z priceEntries mozemy wyswietlic ceny biletow -> normalny, ulgowy itd */}
    </View>
  );
};

function parsedTicketTypesDataView(element) {
  // [['ulgowy', 10]]- zmapować i wyświetlić tekst-
  console.log('priceEntries', priceEntries);
  // na przyklad mozna to zrobic tak:
  <View>
    <Text>{element.name}</Text>
    <Text>{element.slots}</Text>
    <PriceDisplayable prices={element.prices} />
  </View>;
  return (
    <Text style={styles.listStyle} key={element.id}>
      {`${element.name}:   
        Cena: ${priceEntries.toString()}  
        Ilość biletów: ${element.slots}
        Ilość zajętych miejsc: ${element.slotsTaken}`}
    </Text>
  );
}

const TournamentDetails = ({route}) => {
  //const { id } = route.params;- ten lub poniższy sposób
  const tournamentContext = useContext(TournamentContext);
  const tournamentId = route.params.id;
  const tournament = getTournamentFromContext(tournamentContext, tournamentId);
  const [ticketTypesData, loading, error] =
    useTournamentTicketTypes(tournamentId);
  console.log('Test_useTournamentTicketTypes_ticketTypesData', ticketTypesData);
  const navigation = useNavigation();
  const parsedTicketTypesData = ticketTypesData?.map(parsedTicketTypesDataView);
  const startTime = getDateFromTimestamp(tournament.startDate);
  const startTimeFormated = dayjs(startTime).format('DD/MM/YYYY HH:mm');
  const eventDuration = parseEventDurationTime(tournament);
  console.log('ticketTypesData', ticketTypesData);
  return (
    <View style={styles.mainBody}>
      <ScrollView>
        <Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(SCREEN.MODIFY_TOURNAMENT, {id: tournamentId})
            }>
            <Text>Edit</Text>
          </TouchableOpacity>
        </Text>

        <Text style={styles.text}>{tournament.name}</Text>

        <Text style={styles.listStyle}>
          <View>
            <Text style={styles.textDark}>Miejsce: {tournament.place}</Text>
            <Text style={styles.textDark}>Termin: {startTimeFormated}</Text>
            <Text style={styles.textDark}>Czas trwania: {eventDuration}</Text>
            <Text style={styles.textDark}>
              Sprzedane bilety: {tournament.interval}
            </Text>
            <Text style={styles.textDark}>
              Rezerwacje: {tournament.interval}
            </Text>
            <Text style={styles.textDark}>
              Ilość wolnych miejsc: {tournament.interval}
            </Text>
            <TouchableOpacity
              onPress={() => Linking.openURL(tournament.link)} //(then i catch/ obsłużyć w promisie/sprawdzić Regex/https://regex101.com/https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url#:~:text=javascript%3Avoid%20%280%29%20is%20valid%20URL%2C%20although%20not%20an,DNS%29%20https%3A%2F%2Fexample..com%20is%20valid%20URL%2C%20same%20as%20above
            >
              <Text style={styles.linkStyle}>
                <Image source={linkIcon} style={styles.icon} />
                Link do wydarzenia
              </Text>
            </TouchableOpacity>
          </View>
        </Text>

        {loading ? (
          <Text style={styles.text}>Ładuje się ...</Text>
        ) : error ? (
          <Text>Blad pobierania biletów {!!error}</Text>
        ) : (
          <View style={styles.listStyle}>
            <Text style={styles.textDark}> Bilety:</Text>
            <Text> {parsedTicketTypesData}</Text>
          </View>
        )}
      </ScrollView>
    </View>
    //{JSON.stringify(tournament, null, 2)}
  );
};
export default TournamentDetails;
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
});
