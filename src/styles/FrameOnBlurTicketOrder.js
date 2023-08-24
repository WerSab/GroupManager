import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import InputSpinner from 'react-native-input-spinner';
import {TouchableOpacity} from 'react-native-gesture-handler';
import cleanIcon from '../assets/icons/clean.png';
import {TICKET_TYPE_NAMES} from '../config';
import {capitalizeFirstLetter} from '../screens/TournamentCreator';

//TODO: 27.02.2023 - styles/FrameOnBlurTicket i reszta komponentow powinna byc w katalogu np. components
//TODO: 27.02.2023 - wyrenderowac w TicketTypeCreator (chyba) elementy stanu discounts czyli nasze ramki - funkcja .map() bedzie przydatna
//musimy wyrenderowac tyle ramek ile zmian stanow
//Sprawdzanie ktora ramka jest modyfikowana moze sie odbywac przy pomocy indeksu przekazanego do metody handleDiscountAdd()
const FrameOnBlurTicketOrder = (props, ref) => {
  const {allowedTicketTypeNames} = props;
  const [type, setType] = useState(props.type ?? '');
  const [price, setPrice] = useState(props.price ?? '');
  console.log('type', type);
  console.log('price', price);

  function handleTypeAndPriceBlur(_type, _price) {
    console.log('handlePriceBlur');
    if (_type && _price) {
      props.onDiscountChange(_type, _price);
      console.log('propsonDiscountChange_price');
    }
  }

  const clearInputs = () => {
    setPrice('');
    setType('');
  };

  const handleTypeChange = type => {
    setType(type);
  };
  const handlePriceChange = price => {
    setPrice(price);
  };

  useEffect(() => {
    handleTypeAndPriceBlur(type, price);
  }, [price, type]);

  // zeby to zadzialalo to:
  // element musi byc wyeksportowany (komponent) przy uzyciu: forwardRef(FrameOnBlurTicketOrder)

  useImperativeHandle(
    ref,
    () => (
      {
        clearInputs: () => {
          console.log('(clearInputs) czyszczę inputy');
        },
      },
      []
    ),
  );

  const shouldDiscountNameBeVisible = discountName => {
    return allowedTicketTypeNames.includes(discountName);
  };

  const renderPickerValues = () => {
    const values = [];
    values.push(<Picker.Item label="Wybierz" value="" />);
    const ticketTypeNameItems = Object.values(TICKET_TYPE_NAMES)
      .map(capitalizeFirstLetter)
      .map(name => {
        return (
          <Picker.Item
            key={name}
            label={name}
            value={name}
            enabled={shouldDiscountNameBeVisible(name)}
          />
        );
      });
    values.push(ticketTypeNameItems);
    return values;
  };

  return (
    <>
      <View style={styles.inputStyle}>
        <Text style={styles.textDark}>Typ biletu:</Text>
        <Picker
          selectedValue={type}
          style={{height: 50, width: 150, color: 'grey'}}
          onValueChange={handleTypeChange}
        >
          {renderPickerValues()}
        </Picker>
      </View>
      <View style={styles.inputStyle}>
        <Text style={styles.textDark}>Cena biletu (zł):</Text>

        <InputSpinner
          width={75}
          type={'float'}
          color={'#40c5f4'}
          textColor={'#005b98'}
          max={500}
          min={0}
          step={1}
          colorMax={'#f04048'}
          colorMin={'#005b98'}
          value={price}
          onChange={handlePriceChange}
        ></InputSpinner>
      </View>
    </>
  );
};

export default forwardRef(FrameOnBlurTicketOrder);

const styles = StyleSheet.create({
  newTicketFrameStyle: {
    padding: 5,
    borderRadius: 5,
    //backgroundColor: '#005b98',
  },
  textContainer: {
    textAlign: 'center',
    flexBasis: '70%',
    backgroundColor: '#005b98',
  },
  textDark: {
    color: '#005b98',
    fontSize: 18,
  },
  textLightBold: {
    color: '#005b98',
    fontSize: 18,
  },
  button: {
    backgroundColor: 'white',
    width: '30%',
    alignItems: 'center',
    borderRadius: 5,
    margin: 2,
    justifyContent: 'center',
    padding: 4,
  },
  sectionStyle: {
    flexDirection: 'column',
    margin: 10,
  },

  inputStyle: {
    flex: 1,
    flexDirection: 'row',
    color: '#005b98',
    padding: 30,
    borderRadius: 5,
    borderColor: 'white',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  textLightButton: {
    color: '#005b98',
    fontSize: 12,
    padding: 5,
  },
  roundButton2: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'white',
    opacity: 0.7,
    margin: 10,
  },
  centerItemView: {
    justifyContent: 'flex-end',
  },
  buttonTextStyleDark: {
    color: '#005b98',
    paddingVertical: 10,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  icon: {
    height: 25,
    width: 25,
  },
});
