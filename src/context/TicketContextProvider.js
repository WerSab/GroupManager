import React, { useMemo } from 'react';
import { createContext} from 'react';
import { getTicketsOrdersList, getUserTickets } from '../ticket-examples';


export const TicketContext = createContext({
    ticketOrdersList: undefined,
    isLoaded: false,
    error: null,
    actions: {
        requeryTicketOrdersList: ()=>undefined,
    }
});
const TicketContextProvider = (props) => {
    const [ticketOrdersList, isLoaded, error, requeryTicketOrdersList] = useTicket();
    const providerValue = useMemo(() =>{
        return{
            ticketOrdersList,
            isLoaded,
            error,
            actions: {
                requeryTicketOrdersList: requeryTicketOrdersList,
            }
        }
    }, [ticketOrdersList, isLoaded,error, requeryTicketOrdersList])
    return (

        <TicketContext.Provider value={providerValue}> 
            {props.children}
        </TicketContext.Provider>
    )
}
export default TicketContextProvider;