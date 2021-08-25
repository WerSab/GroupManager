import React, { useContext } from 'react';
import 'react-native-gesture-handler';
import FirebaseUserProvider, { FirebaseUserContext } from './src/context/FireBaseUserProvider';

const App = () =>
{

  const firebaseUser = useContext(FirebaseUserContext);

  

return (
  <FirebaseUserProvider>
    <LoginComponent></LoginComponent>
    <DrawerNavigator />
  </FirebaseUserProvider>
 
)
}
export default App;