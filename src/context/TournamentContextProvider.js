/* 
    1. Start aplikacji
    2. Laduje turnieje i wszystkie pozostoale niezbedne dane
     do globalnego kontekstu
    3. Odczytuje dane z kontekstu za pomoca hook'a useContext()
    we wszystkich miejscach gdzie tego potrzebuje czyli np. TorunamentsScreen
*/
import React from 'react';
import { createContext } from 'react';
import { useTournaments } from '../hooks/useTournaments';

export const TournamentContext = createContext({
    tournamentList: undefined,
    isLoaded: undefined,
    error: undefined,
    actions:undefined,
});

const TournamentContextProvider = (props) => {
    const [tournamentList, isLoaded, error, requeryTournaments] = useTournaments();
    const providerValue = {
        tournamentList,
        isLoaded,
        error,
        actions: {
            requeryTournaments: requeryTournaments,
        },
    };

    return (

        <TournamentContext.Provider value={providerValue}>
            {props.children}
        </TournamentContext.Provider>
    )
}
export default TournamentContextProvider;