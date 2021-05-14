import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import MealPlanCard from '../components/MealPlanCard'
import common from '../common.style'


const SwipeScreen = ({ route, navigation }) => {
  const [mealPlans, setMealPlans] = useState([
    {
      "breakfast": 2,
      "creator_address": "1",
      "dinner": 5,
      "lunch": 1,
      "meal_plan_id": 1,
      "snack_one": 0,
      "snack_two": 0,
    },
  ])
  //useEffect(() => {
  //  fetch('https://handler.health/meal-plans')
  //    .then(r => r.json())
  //    .then(r => console.log(r))
  //}, [])
  return (
    <View> 
      <MealPlanCard mealPlan={mealPlans.length && mealPlans[0]} />
    </View>
  )
}

export default SwipeScreen

