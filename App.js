import React from 'react';
import InputScreen from './screens/InputScreen.js';
import HomeScreen from './screens/HomeScreen.js';
import MealPlanScreen from './screens/MealPlanScreen.js';
import ConsumptionScreen from "./screens/ConsumptionScreen";
import ShoppingListScreen from "./screens/ShoppingListScreen";
import RecipeDetailsScreen from './screens/RecipeDetailsScreen'
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
        {/*<Stack.Screen name="InputScreen" component={InputScreen}*/}
        {/*              options={{headerShown: false}} />*/}
        <Stack.Screen name="MealPlanScreen" component={MealPlanScreen}
                      options={{headerShown: false}} />
        <Stack.Screen name="RecipeDetailsScreen" component={RecipeDetailsScreen}
                      options={{headerShown: false}}/>
        {/*<Stack.Screen name="ConsumptionScreen" component={ConsumptionScreen}*/}
        {/*              options={{headerShown: false}} />*/}
        {/*<Stack.Screen name="ShoppingListScreen" component={ShoppingListScreen}*/}
        {/*              options={{headerShown: false}} />*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/* TODO's and thoughts
    - above throwing a 405; might be my not having no more api tokens or sth else will see tmr
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
    - make global colors, dimensions etc; make sure that those scale right on any device dims
    - the meal plan has to be up for the whole week basically up until the user changes, it so this
     has to be done some way, realm, async storage or smh, not sure
    - add custom font to be used for all of the screens
    - add icons to the sliders
    - make the dropdown bit work using react animations
    - add metric/us to the RecipeDetailsScreen, add width / height scaling using expo dimensions
*/