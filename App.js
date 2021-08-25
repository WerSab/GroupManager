import React, {useContext} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import FirebaseUserProvider, {
  FirebaseUserContext,
} from './src/context/FireBaseUserProvider';
import Navigation from './src/components/Navigation';
import {decode, encode} from 'base-64';
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const App = () => {
  
  const firebaseUser = useContext(FirebaseUserContext);

  return (
    <NavigationContainer>
      <FirebaseUserProvider>
      <Navigation />
      </FirebaseUserProvider>
    </NavigationContainer>
  );
};
export default App;
