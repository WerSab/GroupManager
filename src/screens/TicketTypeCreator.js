import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SCREEN} from '../navigation/screens';

export function TicketTypeCreator() {
  const navigation = useNavigation();
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
    setTicketType(prev => ({
      ...prev,
      [field]: text,
    }));
  };

  // const text = "3.14"
  // isNaN(text) {
  //     // ustawiamy blad
  // } else {
  //     const price = parseFloat(text); // 3.14, a nie "3.14"
  // }

  //zrobić warunki do błedów price i slot niezależnie, wyłączyć przycisk jak pole jest puste
  return (
    <View>
      {error && <Text style={{color: 'red'}}>{JSON.stringify(error)}</Text>}

      <TextInput
        style={styles.textDark}
        onChangeText={text => handleStateChange('name', text)}
        value={ticketType.name}
        placeholder="Nazwa biletu..."
      />
      <TextInput
        style={styles.textDark}
        onChangeText={text => handleStateChange('type', text)}
        value={ticketType.type}
        placeholder="Normalny/ulgowy..."
      />

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

      <View style={styles.ticketStyle}>
        <TouchableOpacity
          style={styles.buttonTextStyle}
          onPress={() => {
            navigation.navigate(SCREEN.TOURNAMENT_CREATOR, {
              ticketType: {
                name: ticketType.name,
                type: ticketType.type,
                price: parseFloat(ticketType.price),
                slots: parseInt(ticketType.slots),
              },
            });
          }}>
          <Text style={styles.textButton}>Dodaj bilet</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#015a92',
  },
  text: {
    color: 'white',
    fontSize: 20,
    padding: 40,
  },
  textDark: {
    color: '#005b98',
    fontSize: 18,
    padding: 10,
  },
  container: {
    flex: 1,
  },
  listStyle: {
    padding: 40,
    marginBottom: 5,
    color: '#27046d',
    backgroundColor: 'white',
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 5,
    borderWidth: 1,
    textAlign: 'left',
    fontSize: 20,
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
  textButton: {
    color: 'white',
    fontSize: 15,
    padding: 10,
  },
  buttonTextStyle: {
    backgroundColor: '#005b98',
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
    color: 'white',
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
});
