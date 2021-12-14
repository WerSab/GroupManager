import React from 'react';
import { createContext} from 'react';
import { useUsers } from '../hooks/useUsers';

export const SelectedUserContext = createContext([null, false, null]);
const SelectedUserContextProvider = (props) => {
    
    return (

        <SelectedUserContext.Provider value={useUsers()}> 
            {props.children}
        </SelectedUserContext.Provider>
    )
}
export default SelectedUserContextProvider;