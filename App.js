import React, { useEffect } from 'react';
import StackContainer from './src/navigation/StackContainer';
import UserContextProvider from './src/context/UserContextProvider';
import { addParticipantToTournament, getTournaments } from './src/tournaments-examples';
import TournamentContextProvider from './src/context/TournamentContextProvider';
import { getUsers } from './src/users-examples';
import SelectedUserContextProvider from './src/context/SelectedUserContextProvider';


const App = () => {

  // useEffect(function () {
  //   setTimeout(function () {
  //     getUsers().then((result) => {
  //       console.log('Users:\n',result);
  //     })
  //     .catch(error => console.log(error));
  //   }, 1500)
  // }, []);


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

