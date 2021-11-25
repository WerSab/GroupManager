/* 
    1. Start aplikacji
    2. Laduje turnieje i wszystkie pozostoale niezbedne dane
     do globalnego kontekstu
    3. Odczytuje dane z kontekstu za pomoca hook'a useContext()
    we wszystkich miejscach gdzie tego potrzebuje czyli np. TorunamentsScreen
*/
import React from 'react';
import { createContext} from 'react';
import { useTournaments } from '../hooks/useTournaments';

export const TournamentContext = createContext([null, false, null]);
/*własciwości przekazywane do komponentu z góry z App.js*/
const TournamentContextProvider = (props) => {
    
    return (

        <TournamentContext.Provider value={useTournaments()}> 
            {props.children}
        </TournamentContext.Provider>
    )
}
export default TournamentContextProvider;