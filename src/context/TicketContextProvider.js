import React from 'react';
import { createContext} from 'react';
import useTicket from '../hooks/useTicket'

export const TicketContext = createContext([null, false, null]);
const TicketContextProvider = (props) => {
    
    return (

        <TicketContext.Provider value={useTicket()}> 
            {props.children}
        </TicketContext.Provider>
    )
}
export default TicketContextProvider;