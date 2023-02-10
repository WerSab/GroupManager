//28 11.2022 - wydzielić osobne pliki na stack contenery Error, Loading, Player, Manager, log out - niezalogowany)
//Szczegóły zamówienia pobrane z orderContext - przekzane w roucie to ekranu ze szczegółami i tam rozpakowane referencje z contextu.
import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import ManagerScreen from '../screens/ManagerScreen';
import PasswordRecoveryScreen from '../screens/PasswordRecoveryScreen';
import PlayerScreen from '../screens/PlayerScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ActivityIndicatorScreen from '../screens/ActivityIndicatorScreen';
import LogoTitle from './LogoTitle';
import {FIRESTORE_ROLES} from '../config';
import {UserContext} from '../context/UserContextProvider';
import TournamentsScreen from '../screens/TournamentsScreen';
import TournamentDetailsScreen from '../screens/TournamentDetailsScreen';
import UsersScreen from '../screens/UsersScreen';
import MyTicketsScreen from '../screens/MyTicketsScreen';
import MyBookingsScreen from '../screens/MyProfileScreen';
import MyMessagesScreen from '../screens/MyMessagesScreen';
import {SCREEN} from './screens';
import {TournamentContext} from '../context/TournamentContextProvider';
import {Text} from 'react-native';
import ErrorComponent from '../screens/ErrorScreen';
import MyTournamentsListScreen from '../screens/MyTournamentsListScreen';
import BookingsListScreen from '../screens/BookingsListScreen';
import MessagesListScreen from '../screens/MessagesListScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import ModifyTournamentScreen from '../screens/ModifyTournamentScreen';
import MyTournamentDetails from '../screens/MyTournamentDetailsScreen';
import TicketOrderingScreen from '../screens/TicketOrderingScreen';
import TicketPaymentSummaryScreen from '../screens/TicketPaymentSummaryScreen';
import MyConfirmedTicketsScreen from '../screens/MyConfirmedTicketsScreen';
import PaidTicketListScreen from '../screens/PaidTicketsListScreen';
import TournamentCreator from '../screens/TournamentCreator';
import {TicketTypeCreator} from '../screens/TicketTypeCreator';
import {TicketBasket} from '../screens/TicketBasket';
import OrderContextProvider from '../context/OrderContextProvider';

const Stack = createNativeStackNavigator();

const options = {};

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
              }}>
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

    if (userContext.initializing) {
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
    } else {
      if (userContext.user) {
        switch (userContext.data.role) {
          case FIRESTORE_ROLES.PLAYER: {
            return (
              <OrderContextProvider>
                <NavigationContainer>
                  <Stack.Navigator>
                    <Stack.Screen
                      name={SCREEN.PLAYER}
                      component={PlayerScreen}
                      options={{
                        headerBackVisible: false,
                        headerTitle: props => <LogoTitle {...props} />,
                        headerTitleAlign: 'center',
                      }}
                    />
                    <Stack.Screen
                      name={SCREEN.PLAYER_TAB.MY_TICKETS}
                      component={MyTicketsScreen}
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
                    <Stack.Screen
                      name={SCREEN.PLAYER_TAB.MY_CONFIRMED_TICKETS}
                      component={MyConfirmedTicketsScreen}
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
                    <Stack.Screen
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
                    <Stack.Screen
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
                    <Stack.Screen
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
                    <Stack.Screen
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
                    <Stack.Screen
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
                    <Stack.Screen
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
                    <Stack.Screen
                      name={SCREEN.TICKET_BASKET}
                      component={TicketBasket}
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
                  </Stack.Navigator>
                </NavigationContainer>
              </OrderContextProvider>
            );
          }
          case FIRESTORE_ROLES.MANAGER: {
            return (
              <NavigationContainer>
                <Stack.Navigator>
                  <Stack.Screen
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
                  <Stack.Screen
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

                  <Stack.Screen
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
                  <Stack.Screen
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
                  <Stack.Screen
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
                  <Stack.Screen
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
                  <Stack.Screen
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
                  <Stack.Screen
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
                  <Stack.Screen
                    name={SCREEN.MANAGER_TAB.PAID_TICKETS_LIST}
                    component={PaidTicketListScreen}
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
                  <Stack.Screen
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
                  <Stack.Screen
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
                </Stack.Navigator>
              </NavigationContainer>
            );
          }
        }
      } else {
        return (
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
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
              <Stack.Screen
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
              <Stack.Screen
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
            </Stack.Navigator>
          </NavigationContainer>
        );
      }
    }
  };

  return getNavigationContainerBasedOnRole();
}
export default StackContainer;
