import React, {createContext} from 'react';
import StackContainer from './src/navigation/StackContainer';
import UserContextProvider from './src/context/UserContextProvider';
import TournamentContextProvider from './src/context/TournamentContextProvider';
import UserListContextProvider from './src/context/UserListContextProvider';
import MessagesContextProvider from './src/context/MessageContextProvider';
import {useColorScheme} from 'react-native';

export const ThemeContext = createContext();
const ThemeProvider = ({children}) => {
  const scheme = useColorScheme();
  return (
    <ThemeContext.Provider value={scheme}>{children}</ThemeContext.Provider>
  );
};

const App = () => {
  return (
    <UserContextProvider>
      <TournamentContextProvider>
        <UserListContextProvider>
          <MessagesContextProvider>
            <ThemeProvider>
              <StackContainer />
            </ThemeProvider>
          </MessagesContextProvider>
        </UserListContextProvider>
      </TournamentContextProvider>
    </UserContextProvider>
  );
};
export default App;
