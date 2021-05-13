import React from 'react'
import InputScreen from './screens/InputScreen'
import HomeScreen from './screens/HomeScreen'
import MealPlanScreen from './screens/MealPlanScreen'
import ShoppingListScreen from './screens/ShoppingListScreen'
import RecipeScreen from './screens/RecipeScreen'
import StartScreen from './screens/StartScreen'
import SignInScreen from './screens/SignInScreen'
import SignUpScreen from './screens/SignUpScreen'
import SwipeInstructionScreen from './screens/SwipeInstructionScreen'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { useFonts } from 'expo-font'

const Stack = createStackNavigator()

const Theme = {
  ...DefaultTheme,
  colors: {...DefaultTheme.colors, background: '#FFFFFF'}
}

export default function App() {
  useFonts({
    PoppinsRegular: require('./assets/fonts/Poppins-Regular.ttf'),
    PoppinsLight: require('./assets/fonts/Poppins-Light.ttf'),
    PoppinsBold: require('./assets/fonts/Poppins-Bold.ttf')
  })
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
          name="InputScreen"
          component={InputScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SwipeInstructionScreen"
          component={SwipeInstructionScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MealPlanScreen"
          component={MealPlanScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RecipeDetailsScreen"
          component={RecipeScreen}
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

