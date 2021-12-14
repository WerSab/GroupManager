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
import ActivityIndicatorScreen from '../screens/ActivityIndicatorScreen';
import ErrorComponent from '../screens/ErrorScreen';



export const TournamentContext = createContext([null, false, null]);

const TournamentContextProvider = (props) => {

    const [tournamentList, isLoaded, error, requeryTournaments] = useTournaments();
    
    const contextObj = {
        tournamentList: tournamentList,
        requeryTournaments: requeryTournaments,
    }

    if (error) {
        return <ErrorComponent errorMessage={error}/>;
    }
    if (!isLoaded) {
        return <ActivityIndicatorScreen/>;
    }
    return (

        <TournamentContext.Provider value={contextObj}>
            {props.children}
        </TournamentContext.Provider>
    )
}
export default TournamentContextProvider;