import React, { useEffect } from 'react';
import StackContainer from './src/navigation/StackContainer';
import UserContextProvider from './src/context/UserContextProvider';
import { getTournaments } from './src/tournaments-examples';
import TournamentContextProvider from './src/context/TournamentContextProvider';


const App = () => {

  /*useEffect(function () {
    setTimeout(function () {
      getTournaments().then(function(result) {
        console.log(result);
      })
    }, 1500)
  }, []);*/


  return (

    <UserContextProvider>
      <TournamentContextProvider>
      <StackContainer />
      </TournamentContextProvider>
    </UserContextProvider>


  );
};
export default App;

