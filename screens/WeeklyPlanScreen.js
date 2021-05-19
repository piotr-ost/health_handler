import React, { useState, useEffect } from 'react'
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView 
} from 'react-native'
import SmallLogo from '../components/SmallLogo'
import MealTile from '../components/MealTile'
import Meal from '../components/Meal'
import common from '../common.style'


const WeeklyPlanScreen = ({ route, navigation }) => {
  const { selectedMealPlans } = route.params
  /*
  let d = new Date()
  const days = [
    ...week.slice(d.getDay()),
    ...week.slice(0, d.getDay())
  ] 
  TODO use days instead
  */
  const days = [
    'Monday', 'Tuesday', 'Wednesday', 
    'Thursday', 'Friday', 'Saturday', 'Sunday'
  ]
  return (
    <View style={common.screen}>
      <View style={[
        common.flexRow, 
        {marginTop: 50}
      ]}>
        <Text style={[
          common.headingMain, 
          { fontSize: 25, lineHeight: 37.5 }
        ]}>
          Weekly Plan
        </Text>
        <Image 
          style={{marginTop: 30}}
          source={require('../assets/cart.png')} 
        />
      </View>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            selectedMealPlans.length && 
              selectedMealPlans.map((mealPlan, index) => 
                <MealPlanRow 
                  day={days[index]}
                  key={index} 
                  navigation={navigation} 
                  mealPlan={mealPlan}
                />
              )
          }
          <View style={{height: 150}} />
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

const MealPlanRow =({ day, navigation, mealPlan }) => {
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
      <View style={{height: 200, width: '100%'}}>
        <View style={{marginLeft: 10}}>
          <Text style={common.text}>{day}</Text>
        </View>
        <ScrollView 
          style={{flex: 1, flexDirection: 'row'}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {
            meals.breakfast &&
            <View style={{marginLeft: 10}}>
              <MealTile
                navigation={navigation} 
                meal={meals.breakfast} 
                mealType={'Breakfast'}
              />
            </View>
          }
          {
            meals.snackOne &&
            <View style={{marginLeft: 25}}>
              <MealTile 
                navigation={navigation} 
                meal={meals.snackOne} 
                mealType={'First Snack'}
              />
            </View>
          }
          {
            meals.lunch && 
            <View style={{marginLeft: 25}}>
              <MealTile 
                navigation={navigation} 
                meal={meals.lunch} 
                mealType={'Lunch'}
              />
            </View>
          }
          {
            meals.snackTwo &&
            <View style={{marginLeft: 25}}>
              <MealTile 
                navigation={navigation} 
                meal={meals.snackTwo} 
                mealType={'Second Snack'}
              />
            </View>
          }
          {
            meals.dinner && 
            <View style={{marginLeft: 25}}>
              <MealTile
                navigation={navigation} 
                meal={meals.dinner} 
                mealType={'Dinner'}
              />
            </View>
          }
        </ScrollView>
      </View>
  )
}

export default WeeklyPlanScreen
