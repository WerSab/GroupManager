import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import InputSpinner from 'react-native-input-spinner';
export default DiscountPrices = props => {
  const [amount, setAmount] = useState();

  const ticketName = props.ticketName;
  const maxAmount = props.maxAmount;
  const price = props.price;

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
    <View style={styles.sectionStyle}>
      <View style={styles.whiteBackgroundStyle}>
        <Text style={styles.textDark}>
          {ticketName} <Text style={styles.textDarkBold}>{price}</Text> zł.
        </Text>

        <View>
          <InputSpinner
            width={130}
            color={'#40c5f4'}
            textColor={'#005b98'}
            max={500}
            min={0}
            step={1}
            colorMax={'#f04048'}
            colorMin={'#005b98'}
            value={amount}
            onChange={setAmount}
          ></InputSpinner>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  whiteBackgroundStyle: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: '#005b98',
    padding: 5,
    borderRadius: 5,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  sectionStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textDark: {
    color: '#005b98',
    fontSize: 20,
  },
  textDarkBold: {
    color: '#005b98',
    fontSize: 25,
    fontWeight: 'bold',
  },

  rowStyle: {
    flexDirection: 'row',
    padding: 5,
  },
});
