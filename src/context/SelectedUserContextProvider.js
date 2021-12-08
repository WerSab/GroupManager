import React from 'react';
import { createContext} from 'react';
import { useUsers } from '../hooks/useUsers';

export const SelectedUserContext = createContext([null, false, null]);
/*własciwości przekazywane do komponentu z góry z App.js*/
const SelectedUserContextProvider = (props) => {
    
    return (

        <SelectedUserContext.Provider value={useUsers()}> 
            {props.children}
        </SelectedUserContext.Provider>
    )
}
export default SelectedUserContextProvider;