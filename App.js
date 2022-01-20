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


const App = () => {

  useEffect(function () {
    setTimeout(function () {
      
      getUserTickets('2yMVk3a2ovS9QvWLdy1l4U3HH773')
        .then(result => {
           return extractTicketsInfo(result);//to jest promise
        })
        .then(extractedTickets => {                 //to jest rozpakowana wartość promisa
            console.log("extractedTickets", extractedTickets)
        })
        .catch(err => console.log('blad', err))
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

