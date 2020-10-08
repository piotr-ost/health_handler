import React from 'react';
import {Button} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

// todo fix the gradient
const GreenButton = ({title}) => {
  return (
  <LinearGradient colors={['#6FBF44', '#4EB849']} style={{borderRadius: 12}}>
    <Button title={title}></Button>
  </LinearGradient>
  )
}

export default Button;
