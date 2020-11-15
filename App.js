import * as React from 'react';
import InputScreen from './screens/InputScreen.js';
import HomeScreen from './screens/HomeScreen.js';
import MealPlanScreen from './screens/MealPlanScreen.js';
import ConsumptionScreen from "./screens/ConsumptionScreen";
// import { createStackNavigator } from '@react-navigation/stack'; this dont work on snack

export default function App() {
  return (
    // <MealPlanScreen />
    <ConsumptionScreen />
    // <HomeScreen />
    // <InputScreen />
  )
}
