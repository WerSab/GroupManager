import React, {useState, useEffect} from 'react';
import {getTournaments} from '../tournaments-examples';

export function useTournaments() {
  const [tournamentList, setTournamentList] = useState();
  const [isLoaded, setisLoaded] = useState(false);
  const [error, setError] = useState();

  const requeryTournaments = () => {
    setisLoaded(false);
    getTournaments()
      .then(result => {
        setTournamentList(result);
        setisLoaded(true);
      })
      .catch(error => {
        setError(error);
      });
  };

  useEffect(() => {
    requeryTournaments();
  }, []);
  return [tournamentList, isLoaded, error, requeryTournaments];
}
