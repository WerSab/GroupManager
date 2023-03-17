import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {StyleSheet, Text, View, TextInput, Alert} from 'react-native';

//TODO: 27.02.2023 - styles/FrameOnBlurTicket i reszta komponentow powinna byc w katalogu np. components
//TODO: 27.02.2023 - wyrenderowac w TicketTypeCreator (chyba) elementy stanu discounts czyli nasze ramki - funkcja .map() bedzie przydatna
//musimy wyrenderowac tyle ramek ile zmian stanow
//Sprawdzanie ktora ramka jest modyfikowana moze sie odbywac przy pomocy indeksu przekazanego do metody handleDiscountAdd()
const FrameOnBlurTicketOrder = (props, ref) => {
  const [type, setType] = useState(props.type ?? '');
  const [price, setPrice] = useState(props.price ?? '');

  const handleTypeChange = text => {
    setType(text);
  };

  const handlePriceChange = text => {
    setPrice(text);
  };

  const handleTypeBlur = () => {
    if (price.length > 0) {
      props.onDiscountChange(type, price);
    }
  };

  const handlePriceBlur = () => {
    if (type.length > 0 && price.length > 0) {
      props.onDiscountChange(type, price);
      if (props.shouldClearInputsAfterBlur === true) {
        clearInputs();
      }
    }
  };

  const clearInputs = () => {
    setPrice('');
    setType('');
  };

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

  return (
    <View style={styles.newTicketFrameStyle}>
      <View style={styles.frameInputStyle}>
        <Text style={styles.textDark}>Typ biletu:</Text>
        <TextInput
          placeholder="Normalny\ulgowy\inny..."
          style={styles.inputStyle}
          onChangeText={handleTypeChange}
          value={type}
          underlineColorAndroid="#f000"
          placeholderTextColor="#8b9cb5"
          onBlur={handleTypeBlur}
        />
      </View>
      <View style={styles.frameInputStyle}>
        <Text style={styles.textDark}>Cena biletu:</Text>
        <TextInput
          placeholder="Cena biletu..."
          style={styles.inputStyle}
          onChangeText={handlePriceChange}
          value={price}
          underlineColorAndroid="#f000"
          placeholderTextColor="#8b9cb5"
          onBlur={handlePriceBlur}
        />
      </View>
    </View>
  );
};

export default forwardRef(FrameOnBlurTicketOrder);

const styles = StyleSheet.create({
  newTicketFrameStyle: {
    flexDirection: 'column',
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#005b98',
  },
  textDark: {
    color: '#005b98',
    fontSize: 18,
  },
  textDarkBold: {
    color: '#005b98',
    fontSize: 18,
  },
  inputStyle: {
    color: '#015a92',
    backgroundColor: 'white',
    paddingHorizontal: 5,
    paddingLeft: 15,
    fontSize: 18,
    width: '70%',
  },

  frameInputStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    justifyContent: 'space-between',
  },
});
