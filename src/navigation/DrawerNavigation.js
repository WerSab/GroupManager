import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../CustomDrawer';
import {MainStackNavigator} from './StackNavigator';
import {AuthStackNavigator} from './StackNavigator';
import {TeamStackNavigator} from './StackNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawer}
      initialRouteName="LoginScreen"
      drawerStyle={{color: 'white'}}>
      <Drawer.Screen name="LoginScreen" component={AuthStackNavigator} />
      <Drawer.Screen name="RegisterScreen" component={AuthStackNavigator} />
      <Drawer.Screen name="Main" component={AuthStackNavigator} />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;
