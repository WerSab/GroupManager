import React, {useState, useEffect} from 'react';
import {getTournaments} from '../firebase/firestore-tournament-methods';

export function useTournaments() {
  const [tournamentList, setTournamentList] = useState();
  const [isLoaded, setisLoaded] = useState(false);
  const [error, setError] = useState();

  const requeryTournaments = () => {
    getTournaments()
      .then(result => {
        setTournamentList(result);
        setisLoaded(true);
      })
      .catch(error => {
        setError(error);
      });
  };

  // w przypadku usuniecia biletu, wiemy dla jakiego turnieju zostal usuniety wiec nie musimy uderzac do firestore (sieci)
  // mozemy po prostu modyfikowac dane w pamieci (czyli context - TournamentContext)
  // const bhjhghjh = () => {
  //   getTournaments()
  //     .then(result => {
  //       setTournamentList(result);
  //       setisLoaded(true);
  //     })
  //     .catch(error => {
  //       setError(error);
  //     });
  // };

  useEffect(() => {
    requeryTournaments();
  }, []);
  return [tournamentList, isLoaded, error, requeryTournaments];
}
