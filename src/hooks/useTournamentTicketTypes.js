import React, { useEffect, useState } from 'react';
import { getTicketTypesFromTournament } from "../tournaments-examples";


export const useTournamentTicketTypes = (tournament) => {
    const [ticketTypesLoading, setTicketTypesLoading] = useState(true);
    const [ticketTypesError, setTicketTypesError] = useState();
    const [ticketTypesData, setTicketTypesData] = useState();

    //odczytać promisa, użyc than i catch
    //użyć useEffecta
    const requeryTicketTypes = () => {
        getTicketTypesFromTournament(tournament)
            .then((result) => {
                setTimeout(() => {
                    setTicketTypesData(result);
                    setTicketTypesLoading(false);
                }, 1000);
            })
            .catch((ticketTypesError) => {
                setTicketTypesError(ticketTypesError);
                setTicketTypesLoading(false);
            })
            
    }
    useEffect(() => {
        requeryTicketTypes();
    }, []);
    //console.log('ticketTypesData', ticketTypesData)
    return [ticketTypesData, ticketTypesLoading, ticketTypesError];
}

