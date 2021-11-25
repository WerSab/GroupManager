
import React, { useState, useEffect } from 'react';
import { getTournaments } from '../tournaments-examples';

export function useTournaments() {
    const [tournamentList, setTournamentList] = useState();
    const [isLoaded, setisLoaded] = useState(false);
    const [error, setError] = useState();

    // Sprobowac uzyc useEffect hook'a w celu zaciagniecia turniejow 
    // i zwrocic z funkcji tablice ze stanami  
    useEffect(() => {
        console.log("xxx")
        getTournaments()
        .then((result) => {
            
            setTournamentList(result);

        })
        .catch((error) => {
            setError(error);
        })
        .finally(() => {
            setisLoaded (true);
        });
    },[]);
    return [tournamentList, isLoaded, error];

};

//useEffect: trzy przypadki:
//1. Brak tablicy - wywołuje się przy każdym re-renderze
//2. Pusta tablica - wywołuje się raz
//3. Tablica ze zmiennymi, useefekt wywołuje się za każdym razem gdy zmienią się zmienne