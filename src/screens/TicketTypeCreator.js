import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import FrameOnBlurTicketOrder from '../styles/FrameOnBlurTicketOrder';
import {FlatList} from 'react-native-gesture-handler';

function TicketTypeCreator({route}) {
  const navigation = useNavigation();
  const {navigateWithPrevParams} = useNavigateWithParams(route);
  const [ticketType, setTicketType] = useState({
    name: '',
    prices: null,
    slots: null,
  });
  const [discounts, setDiscounts] = useState([]);

  const [error, setError] = useState({
    price: null,
    slots: null,
  });
  //23.03 - napisać funkcję do parsowania prices i wywołac ją przy dodawaniu biletu i przy modify/edit
  // 1. FOR LOOP
  const parseDiscountsToPrices = discounts => {
    const prices = {};
    for (let i = 0; i < discounts.length; i++) {
      const element = discounts[i];
      prices[element.type] = element.price;
    }

    return prices;
  };

  const handleAddTicketType = () => {
    const result = {
      name: ticketType.name,
      prices: parseDiscountsToPrices(discounts),
      slots: parseInt(ticketType.slots),
    };

    navigateWithPrevParams(
      route.params.fromScreenName,
      {
        ticketType: result,
      },
      ['fromScreenName'],
    );
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
    }

    setTicketType(prev => ({
      ...prev,
      [field]: text,
    }));
  };

  useEffect(() => {
    console.log('discounts:', discounts);
  }, [discounts]);

  const renderItem = ({item, index}) => {
    const handleDiscountChange = (type, price) => {
      setDiscounts(prevDiscounts => {
        return prevDiscounts.map((prevDiscount, prevDiscountIndex) => {
          if (prevDiscountIndex === index) {
            return {
              type,
              price,
            };
          }
          return prevDiscount;
        });
      });
    };

    return (
      <FrameOnBlurTicketOrder
        type={item.type}
        price={item.price}
        onDiscountChange={handleDiscountChange}
        shouldClearInputsAfterBlur={false}
      />
    );
  };

  const isBlurredElementChanged = (blurredElementIndex, type, price) => {
    const blurredDiscount = discounts[blurredElementIndex];
    if (blurredElementIndex === index) {
      if (blurredDiscount)
        return {
          type,
          price,
        };
    }
  };

  const handleDiscountAdd = (type, price) => {
    setDiscounts(prevArray => {
      return [...prevArray, {type, price}];
    });
  };

  const frameOnBlurTicketOrderRef = useRef();

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
        <View>
          <Text>Dodane bilety:</Text>
          <FlatList
            data={discounts}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.container}
            withSearchbar={false}
          />
          <FrameOnBlurTicketOrder
            onDiscountChange={handleDiscountAdd}
            ref={frameOnBlurTicketOrderRef}
            shouldClearInputsAfterBlur={true}
          />
        </View>

        <TextInput
          style={styles.textDark}
          onChangeText={text => handleStateChange('slots', text)}
          value={ticketType.slots}
          placeholder="Ilość miejsc..."
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
export default TicketTypeCreator;
const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    //justifyContent: 'center',
    backgroundColor: '#C5EEFF',
    //alignItems: 'center',
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
    padding: 20,
    marginBottom: 5,
    color: '#27046d',
    marginRight: 10,
    marginLeft: 10,
  },

  textButton: {
    color: 'white',
    fontSize: 18,
    padding: 10,
  },

  modalView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    // elevation: 5,
    margin: '2%',
  },
  button: {
    backgroundColor: '#005b98',
    alignItems: 'center',
    borderRadius: 5,
    margin: 10,
    justifyContent: 'center',
  },
  ticketFrame: {
    flexDirection: 'column',
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#005b98',
  },
});
