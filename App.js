import React, { useEffect } from 'react';
import StackContainer from './src/navigation/StackContainer';
import UserContextProvider from './src/context/UserContextProvider';
import { addParticipantToTournament, getTournaments } from './src/tournaments-examples';
import TournamentContextProvider from './src/context/TournamentContextProvider';
import { getUsers } from './src/users-examples';
import SelectedUserContextProvider from './src/context/SelectedUserContextProvider';
import firestore from '@react-native-firebase/firestore';


const App = () => {

  useEffect(function () {
    setTimeout(function () {
    //  getTournaments()
    //  .then(results => {
    //     results.forEach(element => {
    //       firestore().collection('tournaments').doc(element.id).update({
    //       numberOfBookings:0
    //     });
    //   })
    //   })
    }, 1500)
  }, []);


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

