import React from 'react';
import StackContainer from './src/navigation/StackContainer';
import UserContextProvider from './src/context/UserContextProvider';
import TournamentContextProvider from './src/context/TournamentContextProvider';
import UserListContextProvider from './src/context/UserListContextProvider';
import MessagesContextProvider from './src/context/MessageContextProvider';

const App = () => {
  return (
    <UserContextProvider>
      <TournamentContextProvider>
        <UserListContextProvider>
          <MessagesContextProvider>
            <StackContainer />
          </MessagesContextProvider>
        </UserListContextProvider>
      </TournamentContextProvider>
    </UserContextProvider>
  );
};
export default App;
