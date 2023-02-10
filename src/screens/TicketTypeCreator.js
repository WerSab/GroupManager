//19.01.2023 - zrobić wlaściwe przekierowanie na inny ekran (jak przekazać parametry na podstawie których bedzie się wracać do różnych ekranów - ticketTypeCreator, TournamentDetails)
import React, {useCallback, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SCREEN} from '../navigation/screens';
import {useNavigateWithParams} from '../hooks/useNavigateWithParams';
import {Picker} from '@react-native-picker/picker';

export function TicketTypeCreator({route}) {
  const navigation = useNavigation();
  const {navigateWithPrevParams} = useNavigateWithParams(route);
  const [ticketType, setTicketType] = useState({
    name: '',
    price: null,
    slots: null,
    slotsTaken: null,
    type: '',
  });
  const [error, setError] = useState({
    price: null,
    slots: null,
    slotsTaken: null,
  });

  const handleAddTicketType = () => {
    const result = {
      name: ticketType.name,
      type: ticketType.type,
      price: parseFloat(ticketType.price),
      slots: parseInt(ticketType.slots),
    };

    navigateWithPrevParams(
      route.params.fromScreenName,
      {
        ticketType: result,
      },
      ['fromScreenName'],
    );
    // navigation.navigate(route.params.fromScreenName, {
    //   id: route.params.tournamentId,
    //   ticketType: result,
    // });
  };

  const handleStateChange = (field, text) => {
    switch (field) {
      case 'price': {
        if (isNaN(text)) {
          setError(prev => ({
            ...prev,
            price: 'Cena musi być wartością liczbową',
          }));
        } else {
          setError(prev => ({
            ...prev,
            price: null,
          }));
        }
        break;
      }
      case 'slots': {
        if (isNaN(text)) {
          setError(prev => ({
            ...prev,
            slots: 'Ilośc miejsc musi być wartością liczbową',
          }));
        } else {
          setError(prev => ({
            ...prev,
            slots: null,
          }));
        }
        break;
      }
      case 'slotsTaken': {
        if (isNaN(text)) {
          setError(prev => ({
            ...prev,
            slotsTaken: 'Ilośc rezerwacji musi być wartością liczbową',
          }));
        } else {
          setError(prev => ({
            ...prev,
            slotsTaken: null,
          }));
        }
        break;
      }
    }
    console.log('ticketTypeCh:', ticketType);
    setTicketType(prev => ({
      ...prev,
      [field]: text,
    }));
    console.log('ticketTypeChAfter:', ticketType);
  };

  // const text = "3.14"
  // isNaN(text) {
  //     // ustawiamy blad
  // } else {
  //     const price = parseFloat(text); // 3.14, a nie "3.14"
  // }

  //zrobić warunki do błedów price i slot niezależnie, wyłączyć przycisk jak pole jest puste
  return (
    <View style={styles.mainBody}>
      {error && <Text style={styles.textHeader}>Nowy bilet</Text>}
      <View style={styles.listStyle}>
        <TextInput
          style={styles.textDark}
          onChangeText={text => handleStateChange('name', text)}
          value={ticketType.name}
          placeholder="Nazwa biletu..."
        />
        <Text style={{height: 70, width: 'auto', color: 'grey', fontSize: 18}}>
          Wybierz typ biletu:
          <Picker
            selectedValue={'type'}
            style={{height: 50, width: 150, color: '#005b98'}}
            onValueChange={text => handleStateChange('type', text)}>
            <Picker.Item label="Normalny" value="normalny" />
            <Picker.Item label="Ulgowy" value="ulgowy" />
          </Picker>
        </Text>
        <TextInput
          style={styles.textDark}
          onChangeText={text => handleStateChange('price', text)}
          value={ticketType.price}
          placeholder="Cena biletu..."
        />
        <TextInput
          style={styles.textDark}
          onChangeText={text => handleStateChange('slots', text)}
          value={ticketType.slots}
          placeholder="Ilość miejsc..."
        />

        <TextInput
          style={styles.textDark}
          onChangeText={text => handleStateChange('slotsTaken', text)}
          value={ticketType.slotsTaken}
          placeholder="Ilość rezerwacji..."
        />

        <View>
          <TouchableOpacity style={styles.button} onPress={handleAddTicketType}>
            <Text style={styles.textButton}>Dodaj bilet</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#C5EEFF',
    alignItems: 'center',
  },
  textDark: {
    color: '#005b98',
    fontSize: 18,
    padding: 10,
  },
  textHeader: {
    color: '#005b98',
    fontSize: 20,
    padding: 10,
  },

  listStyle: {
    padding: 30,
    marginBottom: 5,
    color: '#27046d',
    marginRight: 20,
    marginLeft: 20,
  },

  textButton: {
    color: '#005b98',
    fontSize: 15,
    padding: 10,
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
    backgroundColor: 'white',
    borderWidth: 0,
    borderColor: '#3175ab',
    height: 40,
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
    margin: 10,
    justifyContent: 'center',
  },
});
