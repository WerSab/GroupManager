
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import ManagerScreen from '../screens/ManagerScreen';
import PasswordRecoveryScreen from '../screens/PasswordRecoveryScreen';
import PlayerScreen from '../screens/PlayerScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ActivityIndicatorScreen from '../screens/ActivityIndicatorScreen';
import LogoTitle from './LogoTitle';
import { FIRESTORE_ROLES } from '../config';
import { UserContext } from '../context/UserContextProvider';

//Źle przekazywany jest authContext, to nie wina emulatora. 
//Trzeba przekazać authUser jako kopię albo użyć kontekstu tak jak to było wcześniej.

const Stack = createNativeStackNavigator();

function StackContainer() {

  const userContext = useContext(UserContext);

  const getStackScreenBasedOnRole = () => {

    if (userContext.initializing) {
      return <Stack.Screen
        name="ActivityIndicatorScreen"
        component={ActivityIndicatorScreen}
        options={{
          headerBackVisible: false, headerTitle: props => <LogoTitle {...props} />,
          headerTitleAlign: 'center'
        }}
      />

    } else {
      if (userContext.user) {
        switch (userContext.data) {

          case FIRESTORE_ROLES.PLAYER: {
            return <Stack.Screen
              name="PlayerScreen"
              component={PlayerScreen}
              options={{
                headerBackVisible: false, headerTitle: props => <LogoTitle {...props} />,
                headerTitleAlign: 'center'
              }}
            />
          }
          case FIRESTORE_ROLES.MANAGER: {
            return <Stack.Screen
              name="ManagerScreen"
              component={ManagerScreen}
              options={{
                headerBackVisible: false, headerTitle: props => <LogoTitle {...props} />,
                headerStyle: { backgroundColor: '#1a112b', flex: 1, alignSelf: 'center', height: 60 },
                headerTitleAlign: 'center'
              }}
            />
          }
        }
      } else {

        return (
          <>
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{
                headerBackVisible: false, headerTitle: props => <LogoTitle {...props} />,
                headerStyle: { backgroundColor: '#1a112b', flex: 1, alignSelf: 'center', height: 60 },
                headerTitleAlign: 'center'
              }}
            />
            <Stack.Screen
              name="RegisterScreen"
              component={RegisterScreen}
              options={{
                headerBackVisible: false, headerTitle: props => <LogoTitle {...props} />,
                headerStyle: { backgroundColor: '#1a112b', flex: 1, alignSelf: 'center', height: 60 },
                headerTitleAlign: 'center'
              }}
            />
            <Stack.Screen
              name="PasswordRecoveryScreen"
              component={PasswordRecoveryScreen}
              options={{
                headerBackVisible: false, headerTitle: props => <LogoTitle {...props} />,
                headerStyle: { backgroundColor: '#1a112b', flex: 1, alignSelf: 'center', height: 60 },
                headerTitleAlign: 'center'
              }}
            />
          </>
        )

      }
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {getStackScreenBasedOnRole()}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default StackContainer;


/* {
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
        }*/
