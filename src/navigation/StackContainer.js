
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/MainScreen';
import LoginScreen from '../screens/LoginScreen';
import ManagerScreen from '../screens/ManagerScreen';
import PasswordRecoveryScreen from '../screens/PasswordRecoveryScreen';
import PlayerScreen from '../screens/PlayerScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LogoTitle from './LogoTitle';
import { FIRESTORE_ROLES } from '../config';




const Stack = createNativeStackNavigator();

function StackContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          FIRESTORE_ROLES === 'player' ? (
            <>
              <Stack.Screen 
              name="PlayerScreen" 
              component={PlayerScreen} 
              options={{ headerBackVisible: false, headerTitle: props => <LogoTitle {...props}/>, 
              headerStyle: {backgroundColor: '#1a112b',  flex:1, alignSelf: 'center', height: 60 },
              headerTitleAlign: 'center'}} 
              />

            </>
          ) : (
            <>
              <Stack.Screen 
              name="ManagerScreen" 
              component={ManagerScreen} 
              options={{ headerBackVisible: false, headerTitle: props => <LogoTitle {...props}/>, 
              headerStyle: {backgroundColor: '#1a112b',  flex:1, alignSelf: 'center', height: 60 },
              headerTitleAlign: 'center',
            }} 
          
              />
              
            </>
          )
        }
        <Stack.Screen name="Home" component={MainScreen} />
              
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default StackContainer;
