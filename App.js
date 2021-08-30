import React, {useContext} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {Text} from 'react-native';
import FirebaseUserProvider, {
  FirebaseUserContext,
} from './src/context/FireBaseUserProvider';
import LoginScreen from './src/screens/LoginScreen';
//import Navigation from './src/navigation/Navigation';

const App = () => {
  //tylko wewnątrz komponentu FirebaseUserProvider
  //const firebaseUser = useContext(FirebaseUserContext);

  return (
    <NavigationContainer>
      <FirebaseUserProvider>
        <LoginScreen/>
      </FirebaseUserProvider>
    </NavigationContainer>
  );
};
export default App;
