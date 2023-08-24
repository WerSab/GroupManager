import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigateWithParams} from '../hooks/useNavigateWithParams';
import FrameOnBlurTicketOrder from '../styles/FrameOnBlurTicketOrder';
import {ScrollView} from 'react-native-gesture-handler';

import safeIcon from '../assets/icons/safe.png';

function TicketTypeCreator({route, navigation}) {
  const {allowedTicketTypeNames} = route.params;
  const {navigateWithPrevParams} = useNavigateWithParams(route);
  const [ticketType, setTicketType] = useState({
    prices: null,
  });

  console.log('ticketType', ticketType);
  const [discounts, setDiscounts] = useState([]);
  console.log('usestate_discounts', discounts);

  const [error, setError] = useState({
    price: null,
    type: null,
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
    // const result = {
    //   prices: parseDiscountsToPrices(discounts),
    // };

    if (!discount) {
      return navigation.goBack();
    }
    navigateWithPrevParams(
      route.params.fromScreenName,
      {
        ticketType: discount,
      },
      ['fromScreenName'],
    );
  };

  const handleStateChange = (field, text) => {
    setTicketType(prev => ({
      ...prev,
      [field]: text,
    }));
  };

  useEffect(() => {
    console.log('discounts:', discounts);
  }, [discounts]);

  const [discount, setDiscount] = useState();

  const handleDiscountAdd = (type, price) => {
    setDiscount({
      type,
      price,
    });
    // setDiscounts(prevDiscounts => {
    //   const foundDiscount = prevDiscounts.find(
    //     element => element.type === type,
    //   );
    //   if (!foundDiscount) {
    //     const newDiscount = {type, price};
    //     return [...prevDiscounts, newDiscount];
    //   }
    //   return prevDiscounts.map(prevDiscount => {
    //     if (prevDiscount.type === type) {
    //       return {
    //         ...prevDiscount,
    //         price,
    //       };
    //     }
    //     return prevDiscount;
    //   });
    // });
  };

  const frameOnBlurTicketOrderRef = useRef();

  return (
    <View style={styles.mainBody}>
      <ScrollView>
        <View>
          {error && <Text style={styles.textHeader}>Nowy bilet</Text>}
        </View>

        <View style={styles.sectionStyle}>
          <FrameOnBlurTicketOrder
            onDiscountChange={handleDiscountAdd}
            ref={frameOnBlurTicketOrderRef}
            shouldClearInputsAfterBlur={true}
            allowedTicketTypeNames={allowedTicketTypeNames}
          />
        </View>

        <View style={styles.rowMenu}>
          <TouchableOpacity
            style={styles.roundButtonDark}
            onPress={handleAddTicketType}
          >
            <Image source={safeIcon} style={styles.icon} />
            <Text style={styles.textButton}>Dodaj bilet do koszyka</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
export default TicketTypeCreator;
const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#C5EEFF',
    alignItems: 'center',
    //justifyContent: 'space-between',
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

  roundButtonDark: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#005b98',
    //opacity: 0.7,
    margin: 10,
  },

  textButton: {
    color: 'white',
    paddingVertical: 10,
    fontSize: 16,
    marginStart: 5,
    marginEnd: 5,
    textAlign: 'center',
  },

  inputStyle: {
    flex: 1,
    flexDirection: 'row',
    color: '#005b98',
    paddingLeft: 15,
    paddingRight: 5,
    paddingVertical: 20,
    borderRadius: 5,
    borderColor: 'white',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionStyle: {
    flexDirection: 'column',
    margin: 10,
  },
  button: {
    backgroundColor: '#005b98',
    alignItems: 'center',
    borderRadius: 5,
    margin: 2,
    justifyContent: 'center',
    height: 40,
  },
  rowMenu: {
    flexDirection: 'row',
    color: '#005b98',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 25,
    width: 25,
  },
});
