import React, {useContext, useEffect, useMemo} from 'react';
import {createContext} from 'react';
import {getUserOrders} from '../fireBase/firestore-orders-methods';
import {UserContext} from './UserContextProvider';

export const OrderContext = createContext({
  orders: undefined,
  isLoaded: undefined,
  error: undefined,
  actions: undefined,
});

const OrderContextProvider = props => {
  const {user} = useContext(UserContext);
  const contextProviderValue = useMemo(
    () => ({
      orders: undefined,
      isLoaded: undefined,
      error: undefined,
      actions: undefined,
    }),
    [],
  );

  useEffect(() => {
    getUserOrders(user?.uid).then(orders => {
      console.log('orders:', orders);
    });
  }, []);
  console.log('should return');
  return (
    <OrderContext.Provider value={contextProviderValue}>
      {props.children}
    </OrderContext.Provider>
  );
};
export default OrderContextProvider;
