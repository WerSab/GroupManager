import React, {useContext} from 'react';
import 'react-native-gesture-handler';
//import {NavigationContainer} from '@react-navigation/native';
import { Text } from 'react-native';
import FirebaseUserProvider, {
  FirebaseUserContext,
} from './src/context/FireBaseUserProvider';
//import Navigation from './src/navigation/Navigation';

const App = () => {
  //tylko wewnątrz komponentu FirebaseUserProvider
  //const firebaseUser = useContext(FirebaseUserContext);

  return (
    
      <FirebaseUserProvider>
       { /*<NavigationContainer>*/}
        <Text> Hello  </Text>
        {/*<Navigation />*/}
       { /*</NavigationContainer>*/}
      </FirebaseUserProvider>
   
  );
};
export default App;
