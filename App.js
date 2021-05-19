import React from 'react'
import HomeScreen from './screens/HomeScreen'
import SignInScreen from './screens/SignInScreen'
import SignUpScreen from './screens/SignUpScreen'
import StartScreen from './screens/StartScreen'
import RequirementsScreen from './screens/RequirementsScreen'
import SwipeInstructionScreen from './screens/SwipeInstructionScreen'
import SwipeScreen from './screens/SwipeScreen'
import WeeklyPlanScreen from './screens/WeeklyPlanScreen'
import MealScreen from './screens/MealScreen'
import ShoppingListScreen from './screens/ShoppingListScreen'

import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'

const Stack = createStackNavigator()

const Theme = {
  ...DefaultTheme,
  colors: {...DefaultTheme.colors, background: '#FFFFFF'}
}

export default function App() {
  let [fontsLoaded] = useFonts({
    PoppinsRegular: require('./assets/fonts/Poppins-Regular.ttf'),
    PoppinsLight: require('./assets/fonts/Poppins-Light.ttf'),
    PoppinsBold: require('./assets/fonts/Poppins-Bold.ttf')
  })
  if (!fontsLoaded) 
    return <AppLoading />
  return (
    <NavigationContainer theme={Theme}>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="SignInScreen"
          component={SignInScreen}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="StartScreen"
          component={StartScreen}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name="RequirementsScreen"
          component={RequirementsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SwipeInstructionScreen"
          component={SwipeInstructionScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SwipeScreen"
          component={SwipeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="WeeklyPlanScreen"
          component={WeeklyPlanScreen}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name="MealScreen"
          component={MealScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ShoppingListScreen"
          component={ShoppingListScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

