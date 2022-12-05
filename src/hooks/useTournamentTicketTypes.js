import React, {useEffect, useState} from 'react';
import {getTicketTypesForTournamentId} from '../tournaments-examples';

export const useTournamentTicketTypes = tournamentId => {
  const [ticketTypesLoading, setTicketTypesLoading] = useState(true);
  const [ticketTypesError, setTicketTypesError] = useState();
  const [ticketTypesData, setTicketTypesData] = useState();
  console.log('Test_ticketTypesData', tournamentId);
  //odczytać promisa, użyc than i catch
  //użyć useEffecta
  const requeryTicketTypes = () => {
    getTicketTypesForTournamentId(tournamentId)
      .then(result => {
        // TODO: settimeout should be removed in the future for release
        setTimeout(() => {
          setTicketTypesData(result);
          setTicketTypesLoading(false);
        }, 1000);
      })
      .catch(ticketTypesError => {
        setTicketTypesError(ticketTypesError);
        setTicketTypesLoading(false);
      });
  };
  useEffect(() => {
    requeryTicketTypes();
  }, []);
  //console.log('ticketTypesData', ticketTypesData)
  return [ticketTypesData, ticketTypesLoading, ticketTypesError];
};
