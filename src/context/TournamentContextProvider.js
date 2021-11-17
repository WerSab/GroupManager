/* 
    1. Start aplikacji
    2. Laduje turnieje i wszystkie pozostoale niezbedne dane
     do globalnego kontekstu
    3. Odczytuje dane z kontekstu za pomoca hook'a useContext()
    we wszystkich miejscach gdzie tego potrzebuje czyli np. TorunamentsScreen
*/
import React, { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { FIRESTORE_COLLECTION } from '../config';

export const TournamentContext = createContext({
    tournament: null,
    data: null,
});

const TournamentContextProvider = (props) => {

    const [tournamentState, setTournamentState] = useState({

        tournament: null,
        data: null,

    });
    useEffect(() => {

        if (tournament) {
            firestore()
                .collection(FIRESTORE_COLLECTION.TOURNAMENTS)
                .doc(tournaments.uid)
                .get()
                .then(documentSnapshot.exists) {
                setTournamentState({
                    tournament: tournament,
                    data: documentSnapshot.data()
                });
            }
            else {
            console.log('document doesnt exist');
        }

    })
        .catch((error) => {
            console.log('Błąd', error);
        })
}
        else {
    setTournamentState({
        tournament: null,
        data: null,
    })
}
console.log('state', tournamentState)
    }, []);
return (
    <TournamentContextProvider value={tournamentState}>
        {props.children}
    </TournamentContextProvider>
)
export default TournamentContextProvider;