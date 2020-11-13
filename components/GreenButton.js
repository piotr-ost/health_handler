import React from 'react';
import {LinearGradient} from 'react-native-linear-gradient';
import {TouchableOpacity, Text} from "react-native";

export const GreenButton = ({title, onPress}) => {
  return (
    <LinearGradient colors={['#4EB849', '#FFFFFF']} style={{width: 160, height: 46}}>
      <Text>{title}</Text>
    </LinearGradient>
  )
}
// TODO this fucker doesnt work, fix
