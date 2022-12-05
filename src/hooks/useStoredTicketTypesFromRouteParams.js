import {useEffect, useState} from 'react';

const useStoredTicketTypesFromRouteParams = (route, paramName) => {
  const [ticketTypes, setTicketTypes] = useState([]);
  console.log('Test_useStoredTicketTypesFromRouteParams', ticketTypes);
  useEffect(() => {
    if (route.params && route.params[paramName]) {
      // route.params?.ticketType
      // to wtedy dodac rodzaj biletu na stan
      // [ticketType1, ticketType2] - wszystko przekazac do funkcji zapisującej turniej
      setTicketTypes([...ticketTypes, route.params[paramName]]);
    }
  }, [route.params]);

  const clearTicketTypes = () => {
    setTicketTypes([]);
  };
  return {ticketsBasket: ticketTypes, clearTicketTypes};
};
export default useStoredTicketTypesFromRouteParams;
