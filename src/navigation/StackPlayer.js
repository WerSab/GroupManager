import React, {useContext} from 'react';
import OrderContextProvider from '../context/OrderContextProvider';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import MyOrdersScreen from '../screens/MyOrdersScreen';
import PlayerScreen from '../screens/PlayerScreen';
import MyConfirmedOrdersScreen from '../screens/MyConfirmedOrdersScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import MyMessagesScreen from '../screens/MyMessagesScreen';
import MyTournamentsListScreen from '../screens/MyTournamentsListScreen';
import MyTournamentDetails from '../screens/MyTournamentDetailsScreen';
import TicketOrderingScreen from '../screens/TicketOrderingScreen';
import TicketPaymentSummaryScreen from '../screens/TicketPaymentSummaryScreen';
import LogoTitle from './LogoTitle';
import {SCREEN} from './screens';
const StackPlayer = createNativeStackNavigator();

function StackPlayerContainer() {
  return (
    <OrderContextProvider>
      <NavigationContainer>
        <StackPlayer.Navigator>
          <StackPlayer.Screen
            name={SCREEN.PLAYER}
            component={PlayerScreen}
            options={{
              headerBackVisible: false,
              headerTitle: props => <LogoTitle {...props} />,
              headerTitleAlign: 'center',
            }}
          />
          <StackPlayer.Screen
            name={SCREEN.PLAYER_TAB.MY_TICKETS}
            component={MyOrdersScreen}
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
          <StackPlayer.Screen
            name={SCREEN.PLAYER_TAB.MY_CONFIRMED_ORDERS}
            component={MyConfirmedOrdersScreen}
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
          <StackPlayer.Screen
            name={SCREEN.PLAYER_TAB.MY_PROFILE}
            component={MyProfileScreen}
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
          <StackPlayer.Screen
            name={SCREEN.PLAYER_TAB.MY_MESSAGES}
            component={MyMessagesScreen}
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
          <StackPlayer.Screen
            name={SCREEN.PLAYER_TAB.MY_TOURNAMENTS}
            component={MyTournamentsListScreen}
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
          <StackPlayer.Screen
            name={SCREEN.MY_TOURNAMENTDETAILS}
            component={MyTournamentDetails}
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
          <StackPlayer.Screen
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
          <StackPlayer.Screen
            name={SCREEN.TICKET_PAYMENT_SUMMARY}
            component={TicketPaymentSummaryScreen}
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
        </StackPlayer.Navigator>
      </NavigationContainer>
    </OrderContextProvider>
  );
}
export default StackPlayerContainer;
