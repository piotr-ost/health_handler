import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import MealPlanCard from '../components/MealPlanCard'
import common from '../common.style'


const SwipeScreen = ({ route, navigation }) => {
  const [mealPlans, setMealPlans] = useState([])
  useEffect(() => {
    fetch('https://handler.health/meal-plans')
      .then(r => r.json())
      .then(r => setMealPlans(r))
  }, [])
  return (
    <View> 
      <MealPlanCard mealPlan={mealPlans.length && mealPlans[0]} />
    </View>
  )
}

export default SwipeScreen

