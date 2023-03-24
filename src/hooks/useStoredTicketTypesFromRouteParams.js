import {useEffect, useState} from 'react';

// [].find(el => el.name === 'nowa-nazwa')?.prices['type'] = cena;

const useStoredTicketTypesFromRouteParams = (route, paramName) => {
  const [ticketTypes, setTicketTypes] = useState([]);

  useEffect(() => {
    if (route.params && route.params[paramName]) {
      setTicketTypes([...ticketTypes, route.params[paramName]]);
    }
  }, [route.params]);

  const clearTicketTypes = () => {
    setTicketTypes([]);
  };
  return {ticketsBasket: ticketTypes, clearTicketTypes};
};
export default useStoredTicketTypesFromRouteParams;
