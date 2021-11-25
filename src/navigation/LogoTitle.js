import React from'react';
import {Image, Text}  from "react-native";
import ckis from '../assets/icons/ckis.jpg'

const LogoTitle =()=>{

    return (
        <Image style={{alignItems: 'center', backgroundColor: 'white', height: 50, width: 100, }}
            source={ckis}/>
      );
}
export default LogoTitle;