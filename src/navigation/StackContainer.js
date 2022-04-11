
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
import TournamentsScreen from '../screens/TournamentsScreen';
import TournamentDetailsScreen from '../screens/TournamentDetailsScreen'
import UsersScreen from '../screens/UsersScreen';
import MyTicketsScreen from '../screens/MyTicketsScreen';
import MyBookingsScreen from '../screens/MyProfileScreen';
import MyMessagesScreen from '../screens/MyMessagesScreen';
import { SCREEN } from './screens';
import { TournamentContext } from '../context/TournamentContextProvider';
import { Text } from 'react-native'
import ErrorComponent from '../screens/ErrorScreen';
import MyTournamentsListScreen from '../screens/MyTournamentsListScreen';
import BookingsListScreen from '../screens/BookingsListScreen';
import MessagesListScreen from '../screens/MessagesListScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import ModifyTournamentScreen from '../screens/ModifyTournamentScreen';



const Stack = createNativeStackNavigator();

const options = {};

function StackContainer() {

  const userContext = useContext(UserContext);
  const [, { isLoaded, error }] = useContext(TournamentContext);

  const getStackScreenBasedOnRole = () => {

    if (error) {
      return <Stack.Screen
        name={SCREEN.ERROR}
        options={{
          headerBackVisible: false, headerTitle: props => <LogoTitle {...props} />,
          headerTitleAlign: 'center'
        }}
      >
        {props => <ErrorComponent {...props} errorMessage={error} />}
      </Stack.Screen>
    }
    console.log("isLoaded", isLoaded)
    if (!isLoaded) {
      return <Stack.Screen
        name="ActivityIndicatorScreen"
        component={ActivityIndicatorScreen}
        options={{
          headerBackVisible: false, headerTitle: props => <LogoTitle {...props} />,
          headerTitleAlign: 'center'
        }}
      />
    }

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
        switch (userContext.data.role) {

          case FIRESTORE_ROLES.PLAYER: {
            return (
              <>
                <Stack.Screen
                  name={SCREEN.PLAYER}
                  component={PlayerScreen}
                  options={{
                    headerBackVisible: false, headerTitle: props => <LogoTitle {...props} />,
                    headerTitleAlign: 'center'
                  }}
                />
                <Stack.Screen
                  name={SCREEN.PLAYER_TAB.MY_TICKETS}
                  component={MyTicketsScreen}
                  options={{
                    headerBackVisible: false, headerTitle: props => <LogoTitle {...props} />,
                    headerStyle: { backgroundColor: 'white', flex: 1, alignSelf: 'center', height: 100 },
                    headerTitleAlign: 'center'
                  }}
                />
                <Stack.Screen
                  name={SCREEN.PLAYER_TAB.MY_PROFILE}
                  component={MyProfileScreen}
                  options={{
                    headerBackVisible: false, headerTitle: props => <LogoTitle {...props} />,
                    headerStyle: { backgroundColor: 'white', flex: 1, alignSelf: 'center', height: 100 },
                    headerTitleAlign: 'center'
                  }}
                />
                <Stack.Screen
                  name={SCREEN.PLAYER_TAB.MY_MESSAGES}
                  component={MyMessagesScreen}
                  options={{
                    headerBackVisible: false, headerTitle: props => <LogoTitle {...props} />,
                    headerStyle: { backgroundColor: 'white', flex: 1, alignSelf: 'center', height: 100 },
                    headerTitleAlign: 'center'
                  }}
                />
                <Stack.Screen
                  name={SCREEN.PLAYER_TAB.MY_TOURNAMENTS}
                  component={MyTournamentsListScreen}
                  options={{
                    headerBackVisible: false, headerTitle: props => <LogoTitle {...props} />,
                    headerStyle: { backgroundColor: 'white', flex: 1, alignSelf: 'center', height: 100 },
                    headerTitleAlign: 'center'
                  }}
                />
                <Stack.Screen
                  name='Szczegóły turnieju'
                  component={TournamentDetailsScreen}
                  options={{
                    headerBackVisible: false, headerTitle: props => <LogoTitle {...props} />,
                    headerStyle: { backgroundColor: 'white', flex: 1, alignSelf: 'center', height: 100 },
                    headerTitleAlign: 'center'
                  }}
                />
              </>
            )
          }
          case FIRESTORE_ROLES.MANAGER: {
            return (
              <>
                <Stack.Screen
                  name={SCREEN.MANAGER}
                  component={ManagerScreen}
                  options={{
                    headerBackVisible: false, headerTitle: props => <LogoTitle {...props} />,
                    headerStyle: { backgroundColor: 'white', flex: 1, alignSelf: 'center', height: 100 },
                    headerTitleAlign: 'center'
                  }}
                />
                <Stack.Screen
                  name={SCREEN.MANAGER_TAB.TOURNAMENT_LIST}
                  component={TournamentsScreen}
                  options={{
                    headerBackVisible: false, headerTitle: props => <LogoTitle {...props} />,
                    headerStyle: { backgroundColor: 'white', flex: 1, alignSelf: 'center', height: 100 },
                    headerTitleAlign: 'center'
                  }}
                />
                
                <Stack.Screen
                  name={SCREEN.MANAGER_TAB.USERS_LIST}
                  component={UsersScreen}
                  options={{
                    headerBackVisible: false, headerTitle: props => <LogoTitle {...props} />,
                    headerStyle: { backgroundColor: 'white', flex: 1, alignSelf: 'center', height: 100 },
                    headerTitleAlign: 'center'
                  }}
                />
                <Stack.Screen
                  name='Lista rezerwacji'
                  component={BookingsListScreen}
                  options={{
                    headerBackVisible: false, headerTitle: props => <LogoTitle {...props} />,
                    headerStyle: { backgroundColor: 'white', flex: 1, alignSelf: 'center', height: 100 },
                    headerTitleAlign: 'center'
                  }}
                />
                <Stack.Screen
                  name='Lista Wiadomości'
                  component={MessagesListScreen}
                  options={{
                    headerBackVisible: false, headerTitle: props => <LogoTitle {...props} />,
                    headerStyle: { backgroundColor: 'white', flex: 1, alignSelf: 'center', height: 100 },
                    headerTitleAlign: 'center'
                  }}
                />
                <Stack.Screen
                  name={SCREEN.TOURNAMENTDETAILS}
                  component={TournamentDetailsScreen}
                  options={{
                    headerBackVisible: false, headerTitle: props => <LogoTitle {...props} />,
                    headerStyle: { backgroundColor: 'white', flex: 1, alignSelf: 'center', height: 100 },
                    headerTitleAlign: 'center'
                  }}
                />
                <Stack.Screen
                  name={SCREEN.MODIFY_TOURNAMENT}
                  component={ModifyTournamentScreen}
                  options={{
                    headerBackVisible: false, headerTitle: props => <LogoTitle {...props} />,
                    headerStyle: { backgroundColor: 'white', flex: 1, alignSelf: 'center', height: 100 },
                    headerTitleAlign: 'center'
                  }}
                />
              </>
            )
          }
        }
      } else {

        return (
          <>
            <Stack.Screen
              name={SCREEN.LOGIN}
              component={LoginScreen}
              options={{
                headerBackVisible: false, headerTitle: props => <LogoTitle {...props} />,
                headerStyle: { backgroundColor: 'white', flex: 1, alignSelf: 'center', height: 100 },
                headerTitleAlign: 'center'
              }}
            />
            <Stack.Screen
              name={SCREEN.REGISTER}
              component={RegisterScreen}
              options={{
                headerBackVisible: false, headerTitle: props => <LogoTitle {...props} />,
                headerStyle: { backgroundColor: 'white', flex: 1, alignSelf: 'center', height: 100 },
                headerTitleAlign: 'center'
              }}
            />
            <Stack.Screen
              name={SCREEN.PASSWORDRECOVERY}
              component={PasswordRecoveryScreen}
              options={{
                headerBackVisible: false, headerTitle: props => <LogoTitle {...props} />,
                headerStyle: { backgroundColor: 'white', flex: 1, alignSelf: 'center', height: 100 },
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


