import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import SmallLogo from '../components/SmallLogo'
import MealTile from '../components/MealTile'
import Meal from '../components/Meal'
import common from '../common.style'


const WeeklyPlanScreen = ({ route, navigation }) => {
  const { selectedMealPlans } = route.params
  return (
    <View sytle={common.screen}>
      <View style={[common.flexRow, { marginTop: 50 }]}>
        <TouchableOpacity onPress={() => null}>
          <Image source={require('../assets/return.png')} />
        </TouchableOpacity>
        <SmallLogo />
      </View>
      <View style={common.flexRow}>
        <Text style={[
          common.headingMain, 
          { fontSize: 25, lineHeight: 37.5 }
        ]}>
          Weekly Plan
        </Text>
        <Image source={require('../assets/cart.png')} />
      </View>
      <View>
        {
          selectedMealPlans.length ?
            selectedMealPlans.map((mealPlan, index) => 
              <MealPlanRow 
                key={index} 
                navigation={navigation} 
                mealPlan={mealPlan}
              />
            )
            : <Text> Laduje sie tera </Text>
        }
      </View>
    </View>
  )
}

const MealPlanRow =({ navigation, mealPlan }) => {
  const urlBase = 'https://handler.health/meals/'
  const productsUrlBase = 'https://handler.health/products/'
  const [meals, setMeals] = useState({
    breakfast: null,
    dinner: null,
    lunch: null,
    snackOne: null,
    snackTwo: null
  })

  useEffect(() => {
    const breakfast = fetch(urlBase + mealPlan.breakfast)
    const dinner = fetch(urlBase + mealPlan.dinner)
    const lunch = fetch(urlBase + mealPlan.lunch)
    const snackOne = fetch(productsUrlBase + mealPlan.snack_one)
    const snackTwo = fetch(productsUrlBase + mealPlan.snack_two)
    Promise.all([breakfast, dinner, lunch, snackOne, snackTwo])
      .then(
        async ([breakfast, dinner, lunch, snackOne, snackTwo]) => {
          setMeals({
            breakfast: await breakfast.json(),
            dinner: await dinner.json(),
            lunch: await lunch.json(),
            snackOne: await snackOne.json(),
            snackTwo: await snackTwo.json()
          })
        }
      )
      .catch(err => console.log(err))
  }, [])

  return (
      <View style={{height: 300, width: '100%'}}>
        <ScrollView 
          style={{flex: 1, flexDirection: 'row'}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
      {
        meals.breakfast &&
        <MealTile
          navigation={navigation} 
          meal={meals.breakfast} 
          mealType={'Breakfast'}
        />
      }
      {
        meals.snackOne &&
        <MealTile 
          navigation={navigation} 
          meal={meals.snackOne} 
          mealType={'First Snack'}
        />
      }
      {
        meals.lunch && 
        <MealTile 
          navigation={navigation} 
          meal={meals.lunch} 
          mealType={'Lunch'}
        />
      }
      {
        meals.snackTwo &&
        <MealTile 
          navigation={navigation} 
          meal={meals.snackTwo} 
          mealType={'Second Snack'}
        />
      }
      {
        meals.dinner && 
        <MealTile
          navigation={navigation} 
          meal={meals.dinner} 
          mealType={'Dinner'}
        />
      }
        </ScrollView>
      </View>
  )
}

export default WeeklyPlanScreen
