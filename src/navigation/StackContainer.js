
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
import { FirebaseUserContext } from '../context/FireBaseUserProvider';
import { FirestoreDataContext } from '../context/FirestoreDataProvider';




const Stack = createNativeStackNavigator();

function StackContainer() {

  const userContext = useContext(FirebaseUserContext);
  const firestoreData = useContext(FirestoreDataContext);
  const initializing = userContext[1];
  const authUser = userContext[0];


  const getStackScreenBasedOnRole = () => {
    console.log('firestoreAuth: ', authUser)
console.log('FirestoreData: ', firestoreData)
    if (initializing) {
      return <Stack.Screen
        name="ActivityIndicatorScreen"
        component={ActivityIndicatorScreen}
        options={{
          headerBackVisible: false, headerTitle: props => <LogoTitle {...props} />,
          headerTitleAlign: 'center'
        }}
      />

    } else {
      if (authUser) {
        switch (firestoreData) {
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
          
          case FIRESTORE_ROLES.MANAGER:{
            return <Stack.Screen
              name="ManagerScreen"
              component={ManagerScreen}
              options={{
                headerBackVisible: false, headerTitle: props => <LogoTitle {...props} />,
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
                headerTitleAlign: 'center'
              }}
            />
            <Stack.Screen
              name="RegisterScreen"
              component={RegisterScreen}
              options={{
                headerBackVisible: false, headerTitle: props => <LogoTitle {...props} />,
                headerTitleAlign: 'center'
              }}
            />
            <Stack.Screen
              name="PasswordRecoveryScreen"
              component={PasswordRecoveryScreen}
              options={{
                headerBackVisible: false, headerTitle: props => <LogoTitle {...props} />,
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


        {/* {
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
        }*/}

      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default StackContainer;
