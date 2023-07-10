import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {UserContext} from '../context/UserContextProvider';
import {SCREEN} from './screens';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import PasswordRecoveryScreen from '../screens/PasswordRecoveryScreen';
import LogoTitle from './LogoTitle';
const StackAuthorization = createNativeStackNavigator();

function StackAuthorizationContainer() {
  return (
    <NavigationContainer>
      <StackAuthorization.Navigator>
        <StackAuthorization.Screen
          name={SCREEN.LOGIN}
          component={LoginScreen}
          options={{
            headerBackVisible: false,
            headerTitle: props => <LogoTitle {...props} />,
            headerStyle: {
              backgroundColor: 'white',
              flex: 1,
              alignSelf: 'center',
              height: 100,
            },
            headerTitleAlign: 'center',
          }}
        />
        <StackAuthorization.Screen
          name={SCREEN.REGISTER}
          component={RegisterScreen}
          options={{
            headerBackVisible: false,
            headerTitle: props => <LogoTitle {...props} />,
            headerStyle: {
              backgroundColor: 'white',
              flex: 1,
              alignSelf: 'center',
              height: 100,
            },
            headerTitleAlign: 'center',
          }}
        />
        <StackAuthorization.Screen
          name={SCREEN.PASSWORDRECOVERY}
          component={PasswordRecoveryScreen}
          options={{
            headerBackVisible: false,
            headerTitle: props => <LogoTitle {...props} />,
            headerStyle: {
              backgroundColor: 'white',
              flex: 1,
              alignSelf: 'center',
              height: 100,
            },
            headerTitleAlign: 'center',
          }}
        />
      </StackAuthorization.Navigator>
    </NavigationContainer>
  );
}
export default StackAuthorizationContainer;
