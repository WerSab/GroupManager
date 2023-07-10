import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import ManagerScreen from '../screens/ManagerScreen';
import TournamentsScreen from '../screens/TournamentsScreen';
import {SCREEN} from './screens';
import UsersScreen from '../screens/UsersScreen';
import BookingsListScreen from '../screens/BookingsListScreen';
import MessagesListScreen from '../screens/MessagesListScreen';
import TournamentDetailsScreen from '../screens/TournamentDetailsScreen';
import ModifyTournamentScreen from '../screens/ModifyTournamentScreen';
import TicketOrderingScreen from '../screens/TicketOrderingScreen';
import PaidOrdersListScreen from '../screens/PaidOrdersListScreen';
import TournamentCreator from '../screens/TournamentCreator';
import TicketTypeCreator from '../screens/TicketTypeCreator';
import LogoTitle from './LogoTitle';
const StackManager = createNativeStackNavigator();

function StackManagerContainer() {
  return (
    <NavigationContainer>
      <StackManager.Navigator>
        <StackManager.Screen
          name={SCREEN.MANAGER}
          component={ManagerScreen}
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
        <StackManager.Screen
          name={SCREEN.MANAGER_TAB.TOURNAMENT_LIST}
          component={TournamentsScreen}
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

        <StackManager.Screen
          name={SCREEN.MANAGER_TAB.USERS_LIST}
          component={UsersScreen}
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
        <StackManager.Screen
          name={SCREEN.MANAGER_TAB.BOOKINGS_LIST}
          component={BookingsListScreen}
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
        <StackManager.Screen
          name={SCREEN.MANAGER_TAB.MESSAGES_LIST}
          component={MessagesListScreen}
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
        <StackManager.Screen
          name={SCREEN.TOURNAMENTDETAILS}
          component={TournamentDetailsScreen}
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
        <StackManager.Screen
          name={SCREEN.MODIFY_TOURNAMENT}
          component={ModifyTournamentScreen}
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
        <StackManager.Screen
          name={SCREEN.TICKET_ORDERING}
          component={TicketOrderingScreen}
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
        <StackManager.Screen
          name={SCREEN.MANAGER_TAB.PAID_ORDERS_LIST}
          component={PaidOrdersListScreen}
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
        <StackManager.Screen
          name={SCREEN.TOURNAMENT_CREATOR}
          component={TournamentCreator}
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
        <StackManager.Screen
          name={SCREEN.TICKETTYPE_CREATOR}
          component={TicketTypeCreator}
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
      </StackManager.Navigator>
    </NavigationContainer>
  );
}
export default StackManagerContainer;
