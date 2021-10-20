import React from 'react';
import StackContainer from './src/navigation/StackContainer';
import UserContextProvider from './src/context/UserContextProvider';


const App = () => {

  return (

    <UserContextProvider>
      <StackContainer />
    </UserContextProvider>

  );
};
export default App;

