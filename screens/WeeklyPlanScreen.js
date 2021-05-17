import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import SmallLogo from '../components/SmallLogo'
import MealTile from '../components/MealTile'
import Meal from '../components/Meal'
import common from '../common.style'


const WeeklyPlanScreen = ({ route, navigation }) => {
  const { selectedMealPlans } = route.params
  return (
    <View sytle={common.screen}>
      <View style={[common.flexRow, { marginTop: 50 }]}>
        <TouchableOpacity>
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
  return (
    <View>
      <MealTile
        navigation={navigation} 
        meal={mealPlan.breakfast} 
        mealType={'Breakfast'}
      />
      <MealTile 
        navigation={navigation} 
        meal={mealPlan.snackOne} 
        mealType={'First Snack'}
      />
      <MealTile 
        navigation={navigation} 
        meal={mealPlan.lunch} 
        mealType={'Lunch'}
      />
      <MealTile 
        navigation={navigation} 
        meal={mealPlan.snackTwo} 
        mealType={'Second Snack'}
      />
      <MealTile
        navigation={navigation} 
        meal={mealPlan.dinner} 
        mealType={'Dinner'}
      />
    </View>
  )
}

export default WeeklyPlanScreen
