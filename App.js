import React from 'react'
import InputScreen from './screens/InputScreen'
import HomeScreen from './screens/HomeScreen'
import MealPlanScreen from './screens/MealPlanScreen'
import ShoppingListScreen from './screens/ShoppingListScreen'
import RecipeScreen from './screens/RecipeScreen'
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
                    name="InputScreen"
                    component={InputScreen}
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

/* TODO's and thoughts
    - python backend bit depends on the generate shopping list but assuming the format is as in the
    spoonacular sample there will have to be an api that will
     1) receive the shopping list POSTed by user
     2) parse out the exact products and quantities in grams ideally
     3) match the products to the ones in the shop, round the quantities but with a margin
     4) generate a shopping list and sum the costs, return a response to the user POST
    - use react dotenv to keep the api key secret
    - not sure about how the api keys are going to be hidden and work from any users app at the same time
    - the swiping functionality could be added using `https://api.spoonacular.com/recipes/{id}/similar`
     we could get 5 similar recipes for each of the meals generated and let the user choose the set of
     products for the meal
    - the meal plan has to be up for the whole week basically up until the user changes, it so this
     has to be done some way, realm, async storage or smh, not sure
    - add custom font to be used for all of the screens
    - add icons to the sliders
    - make the dropdown bit work using react animations
    - scrolling down has to go back
    - use async storage for the input values as well as scrolling down saving state
    - and the meal plan itself too in order for it not have to be re-generated
    - retrieve the meal plan using get meal plan week for each given user, then no need to use async storage for that
    - some of the templates dont work hence the problem with adding some of them
    - finish the user thing
*/
