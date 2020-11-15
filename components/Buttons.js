import React from 'react';
import {Text} from "react-native";
import {Icon} from 'react-native-elements';
import {LinearGradient} from 'expo-linear-gradient';

const GREEN = '#4EB849'

export const ReturnButton = ({onPress}) => {
  return (
    <Icon onPress={onPress} type="font-awesome" name="arrow-left" color={GREEN} />
  );
}
