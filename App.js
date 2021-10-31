import React, { useEffect } from 'react';
import StackContainer from './src/navigation/StackContainer';
import UserContextProvider from './src/context/UserContextProvider';
import { getTournaments } from './src/tournaments-examples';


const App = () => {

  useEffect(function () {
    setTimeout(function () {
      getTournaments().then(function(result) {
        console.log(result);
      })
    }, 1500)
  }, []);


  return (

    <UserContextProvider>
      <StackContainer />
    </UserContextProvider>


  );
};
export default App;

