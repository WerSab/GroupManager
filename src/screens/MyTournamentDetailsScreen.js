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
  Modal,
} from 'react-native';
import linkIcon from '../assets/icons/link.png';
import basket from '../assets/icons/basket.png';
import {TournamentContext} from '../context/TournamentContextProvider';
import {useTournamentTicketTypes} from '../hooks/useTournamentTicketTypes';
import {getTournamentFromContext} from '../common/context-methods';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../navigation/screens';
import {formatDate, parseEventDurationTime} from '../common/date-time-methods';
import useStoredTicketTypesFromRouteParams from '../hooks/useStoredTicketTypesFromRouteParams';
//koszyk=ticketTypes

const MyTournamentDetails = ({navigation, route}) => {
  const tournamentContext = useContext(TournamentContext);
  console.log('route.params', route.params);
  const tournamentId = route.params.tournamentId;
  const tournament = getTournamentFromContext(tournamentContext, tournamentId);
  const startTimeFormated = formatDate(
    tournament.startDate,
    'DD/MM/YYYY HH:mm',
  );
  const eventDuration = parseEventDurationTime(tournament);
  const {ticketsBasket, clearTicketTypes} = useStoredTicketTypesFromRouteParams(
    route,
    'ticketType',
  );
  console.log('tournamentticketTypesContext', ticketsBasket);

  return (
    <View style={styles.mainBody}>
      <ScrollView>
        <Text style={styles.title}>{tournament.name}</Text>
        <Text style={styles.listStyle}>
          <View>
            <Text style={styles.textDark}>Miejsce: {tournament.place}</Text>
            <Text style={styles.textDark}>
              Godzina rozpoczęcia: {startTimeFormated}
            </Text>
            <Text style={styles.textDark}>Czas trwania: {eventDuration}</Text>
            <TouchableOpacity
              onPress={() => Linking.openURL(tournament.link)} //(then i catch/ obsłużyć w promisie/sprawdzić Regex/https://regex101.com/https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url#:~:text=javascript%3Avoid%20%280%29%20is%20valid%20URL%2C%20although%20not%20an,DNS%29%20https%3A%2F%2Fexample..com%20is%20valid%20URL%2C%20same%20as%20above
            >
              <Text style={styles.linkStyle}>
                <Image source={linkIcon} style={styles.icon} />
                Link do wydarzenia
              </Text>
            </TouchableOpacity>
            <Button
              activeOpacity={2}
              onPress={() => {
                navigation.navigate(SCREEN.TICKET_ORDERING, {
                  tournamentId: tournamentId,
                });
              }}
              title="Rezerwacja biletów"
            />
          </View>
        </Text>
      </ScrollView>
    </View>
  );
};
export default MyTournamentDetails;
const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#C5EEFF',
  },
  title: {
    color: '#005b98',
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
    paddingVertical: 20,
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
    borderColor: '#005b98',
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
