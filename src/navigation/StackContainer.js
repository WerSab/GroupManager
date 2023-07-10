//28 11.2022 - wydzielić osobne pliki na stack contenery Error, Loading, Player, Manager, log out - niezalogowany)
//Szczegóły zamówienia pobrane z orderContext - przekzane w roucie to ekranu ze szczegółami i tam rozpakowane referencje z contextu.
import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ActivityIndicatorScreen from '../screens/ActivityIndicatorScreen';
import LogoTitle from './LogoTitle';
import {FIRESTORE_ROLES} from '../config';
import {UserContext} from '../context/UserContextProvider';
import {SCREEN} from './screens';
import {TournamentContext} from '../context/TournamentContextProvider';
import ErrorComponent from '../screens/ErrorScreen';
import StackPlayerContainer from './StackPlayer';
import StackManagerContainer from './StackManager';
import StackAuthorizationContainer from './StackAuthorization';

const Stack = createNativeStackNavigator();

function StackContainer() {
  const userContext = useContext(UserContext);
  const {isLoaded, error} = useContext(TournamentContext);

  const getNavigationContainerBasedOnRole = () => {
    if (error) {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name={SCREEN.ERROR}
              options={{
                headerBackVisible: false,
                headerTitle: props => <LogoTitle {...props} />,
                headerTitleAlign: 'center',
              }}
            >
              {props => <ErrorComponent {...props} errorMessage={error} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    if (!isLoaded) {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="ActivityIndicatorScreen"
              component={ActivityIndicatorScreen}
              options={{
                headerBackVisible: false,
                headerTitle: props => <LogoTitle {...props} />,
                headerTitleAlign: 'center',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    if (!userContext.user) {
      return <StackAuthorizationContainer />;
    }
    switch (userContext.data.role) {
      case FIRESTORE_ROLES.PLAYER:
        return <StackPlayerContainer />;
      case FIRESTORE_ROLES.MANAGER:
        return <StackManagerContainer />;
    }
  };
  return getNavigationContainerBasedOnRole();
}
export default StackContainer;
