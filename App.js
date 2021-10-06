import React from 'react';
//import 'react-native-gesture-handler';
import FirebaseUserProvider from './src/context/FireBaseUserProvider';
import RegisterScreen from './src/screens/RegisterScreen';
import MainScreen from './src/screens/MainScreen';
import PasswordRecoveryScreen from './src/screens/PasswordRecoveryScreen';
import StackContainer from './src/navigation/StackContainer';

//import AuthStackNavigator from './src/navigation/StackNavigator.js'
//import { FirebaseUserContext } from './src/context/FireBaseUserProvider';

const App = () => {
  //tylko wewnątrz komponentu FirebaseUserProvider
  //const firebaseUser = useContext(FirebaseUserContext);

  return (

    <UserContextProvider>
      <StackContainer/>
    </UserContextProvider>

  );
};
export default App;
//<RegisterScreen/>
//<PasswordRecoveryScreen/>
