import React  from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import FirebaseUserProvider from './src/context/FireBaseUserProvider';
import LoginScreen from './src/screens/LoginScreen';
//import AuthStackNavigator from './src/navigation/StackNavigator.js'
//import { FirebaseUserContext } from './src/context/FireBaseUserProvider';

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
