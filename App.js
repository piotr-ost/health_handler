import * as React from 'react';
import HomeScreen from './screens/HomeScreen.js';
import InputScreen from './screens/InputScreen.js';
import {Provider, defaultTheme} from "@adobe/react-spectrum";
// import { createStackNavigator } from '@react-navigation/stack'; this dont work on snack 

export default function App() {
  return (
    <Provider theme={defaultTheme}>
      <InputScreen />
    </Provider>
    )
  //  <HomeScreen />
}
