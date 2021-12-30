
import React, { useState, useEffect } from 'react';
import { getTournaments } from '../tournaments-examples';


export function useTournaments() {
    const [tournamentList, setTournamentList] = useState();
    const [isLoaded, setisLoaded] = useState(false);
    const [error, setError] = useState();

    const requeryTournaments = () => {
        console.log("xxx")
        getTournaments()
        .then((result) => {
            console.log('result', result)
            setTournamentList(result);

        })
        .catch((error) => {
            setError(error);
        })
        .finally(() => {
            setisLoaded (true);
        });
    }

    
    useEffect(() => {
        requeryTournaments();
    },[]);
    console.log( [tournamentList, isLoaded, error, requeryTournaments])
    return [tournamentList, isLoaded, error, requeryTournaments];

};

