import React from'react';
import {Image, Text}  from "react-native";
import AppLogo_2 from '../assets/icons/AppLogo_2.png'

const LogoTitle =()=>{

    return (
        <Image style={{alignItems: 'center', backgroundColor: '#1a112b', height: 30, width: 70, }}
            source={AppLogo_2}/>
      );
}
export default LogoTitle;