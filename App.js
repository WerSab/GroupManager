import React, { useEffect } from 'react';
import StackContainer from './src/navigation/StackContainer';
import UserContextProvider from './src/context/UserContextProvider';
import { addParticipantToTournament, getTournaments } from './src/tournaments-examples';
import TournamentContextProvider from './src/context/TournamentContextProvider';
import { getUsers } from './src/users-examples';
import SelectedUserContextProvider from './src/context/SelectedUserContextProvider';
import firestore from '@react-native-firebase/firestore';
import { getUserTickets } from './src/ticket-examples';
import { extractTicketsInfo } from './src/ticket-examples';
import { getFirestoreTimestampFromDate, getFirestoreTimestampFromMillis } from './src/fireBase/firestoreHelper';


const App = () => {

  useEffect(function () {
    setTimeout(function () {
         const x = getFirestoreTimestampFromDate(new Date());
         const y = getFirestoreTimestampFromMillis(1643827618000);
         console.log('x', x);
         
         console.log('y', y);
    }, 1500)
  }, []);

  // setState();
  // tournament.get().then(result => {
  //   setTournament(result);
  //   setState(false);
  // });

  return (

    <UserContextProvider>
      <TournamentContextProvider>
        <SelectedUserContextProvider>
          <StackContainer />
        </SelectedUserContextProvider>
      </TournamentContextProvider>
    </UserContextProvider>


  );
};
export default App;

