import React from 'react';
import InputScreen from './screens/InputScreen.js';
import HomeScreen from './screens/HomeScreen.js';
import MealPlanScreen from './screens/MealPlanScreen.js';
import ConsumptionScreen from "./screens/ConsumptionScreen";
import ShoppingListScreen from "./screens/ShoppingListScreen";
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, DefaultTheme} from "@react-navigation/native";
import TestScreen from './TestScreen.js'
const Stack = createStackNavigator();

const Theme = {
  ...DefaultTheme,
  colors: {...DefaultTheme.colors, background: '#FFFFFF'}
}
export default function App() {
  return (
    <NavigationContainer theme={Theme}>
      <Stack.Navigator>
        {/*<Stack.Screen name="HomeScreen" component={HomeScreen}*/}
        {/*              options={{headerShown: false}} />*/}
        <Stack.Screen name="InputScreen" component={InputScreen}
                      options={{headerShown: false}} />
        <Stack.Screen name="MealPlanScreen" component={MealPlanScreen}
                      options={{headerShown: false}} />
        <Stack.Screen name="ConsumptionScreen" component={ConsumptionScreen}
                      options={{headerShown: false}} />
        <Stack.Screen name="ShoppingListScreen" component={ShoppingListScreen}
                      options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// TODO use react dotenv to keep the api key secret
