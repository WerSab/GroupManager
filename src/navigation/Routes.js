import React, {useContext, useState, useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from '../screens/LoginScreen';

const Routes =()=>{
    return(
        <NavigationContainer>
            <LoginScreen/>
        </NavigationContainer>
    )
};
export default Routes;