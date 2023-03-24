import React, {useEffect, useState} from 'react';
import {getTicketTypesForTournamentId} from '../firebase/firestore-tournament-methods';

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
        setTicketTypesData(result);
        setTicketTypesLoading(false);
      })
      .catch(ticketTypesError => {
        setTicketTypesError(ticketTypesError);
        setTicketTypesLoading(false);
      });
  };

  const actions = {
    requeryTicketTypes,
  };
  useEffect(() => {
    requeryTicketTypes();
  }, []);
  //console.log('ticketTypesData', ticketTypesData)
  return [ticketTypesData, ticketTypesLoading, ticketTypesError, actions];
};
