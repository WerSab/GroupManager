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
        <Text style={styles.textDarkBold}>
          {ticketName} {price}zł.
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
    width: '90%',
    marginTop: 10,
    marginVertical: 20,
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
    marginStart: 20,
    justifyContent: 'center',
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
