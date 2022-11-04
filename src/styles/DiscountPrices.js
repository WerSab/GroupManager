import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

export default DiscountPrices = props => {
  const [amount, setAmount] = useState('');
  const discountName = props.discountName;
  const ticketName = props.ticketName;
  const maxAmount = props.maxAmount;
  const price = props.price;
  const onChangeText = text => {
    if (!isNaN(text)) {
      setAmount(text);
    }
  };
  const isMounted = useRef(false); //sprawdzamy czy komponent jest zamontowany

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    if (amount !== '') {
      // "" -> false
      const parsedAmount = parseInt(amount);
      if (parsedAmount === 0) {
        props.removeDiscount();
        return; //return przerywa działanie funkcji
      }
      props.onAmountChange(parsedAmount);
    } else {
      props.removeDiscount();
    }
  }, [amount]);

  return (
    <View style={styles.whiteBackgroundStyle}>
      <View>
        <Text style={styles.textDark}>{discountName}: </Text>
        <Text style={styles.textDarkBold}>{price}zł.</Text>
      </View>
      <View>
        <TextInput
          placeholder="0"
          style={styles.inputStyle}
          onChangeText={onChangeText}
          value={amount}
          underlineColorAndroid="#f000"
          placeholderTextColor="#8b9cb5"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  whiteBackgroundStyle: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    marginBottom: 5,
    color: '#005b98',
    backgroundColor: 'white',
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 5,
    fontSize: 16,
    justifyContent: 'space-evenly',
    alignContent: 'space-between',
  },
  textDark: {
    color: '#005b98',
    fontSize: 16,
  },
  textDarkBold: {
    color: '#005b98',
    fontSize: 18,
  },
  inputStyle: {
    color: '#015a92',
    paddingHorizontal: 5,
    paddingLeft: 15,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#015a92',
    fontSize: 18,
  },
  rowStyle: {
    flexDirection: 'row',
    padding: 5,
  },
});
// key={`${discountName}${index}`} // ulgowy0, ulgowy1
// discountName={discountName}
// price={price}
// handleAmountChange={undefined
// }