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
import AsyncStorage from '@react-native-async-storage/async-storage'
import MaskedView from '@react-native-masked-view/masked-view'
import Icon from 'react-native-vector-icons/FontAwesome'
import { LinearGradient } from 'expo-linear-gradient'


const GradientRepeat = () => {
  return (
    <View>
      <MaskedView maskElement={
        <Icon name={'repeat'} size={40} />
      }>
        <LinearGradient colors={['#5AD710', '#22E4CD']}>
          <Icon name={'repeat'} style={{opacity: 0}} size={40} />
        </LinearGradient>
      </MaskedView>
    </View>
  )
}

const WeeklyPlanScreen = ({ route, navigation }) => {
  const { selectedMealPlans, setSelectedMealPlans } = route.params
  const [shoppingList, setShoppingList] = useState({})
  /*
  let d = new Date()
  const arrangedDays = [
    ...days.slice(d.getDay()),
    ...days.slice(0, d.getDay())
  ] 
  */
  useEffect(() => {
    const saveSelectedMealPlans = async (selectedMealPlans) => {
      try {
        const jsonVal = JSON.stringify(selectedMealPlans)
        await AsyncStorage.setItem('@selectedMealPlans', jsonVal)
      } catch (err) {
        console.log(err)
      }
    } 
    saveSelectedMealPlans(selectedMealPlans)
  }, [])
  const days = [
    'Monday', 'Tuesday', 'Wednesday', 
    'Thursday', 'Friday', 'Saturday', 'Sunday'
  ]
  return (
    <View style={common.screen}>
      <View style={[
        common.flexRow, 
        {marginTop: 30, marginBottom: 10, justifyContent: 'space-between', alignItems: 'center'}
      ]}>
        <TouchableOpacity 
          style={{marginTop: 25, marginLeft: 15}}
          onPress={() => {
            navigation.navigate('StartScreen')
          }}
        >
            <GradientRepeat />
        </TouchableOpacity>
        <Text style={[
          common.headingMain, 
          { fontSize: 25, lineHeight: 37.5, marginLeft: 12 }
        ]}>
          Weekly Plan
        </Text>
        <TouchableOpacity onPress={() => {
          navigation.navigate('ShoppingListScreen', {
            shoppingList: shoppingList
          }) 
        }}>
          <Image 
            style={{marginTop: 30}}
            source={require('../assets/cart.png')} 
          />
        </TouchableOpacity>
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
                  setShoppingList={setShoppingList}
                />
              )
          }
          <View style={{height: 150}} />
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

const MealPlanRow =({ 
  day,
  navigation, 
  mealPlan, 
  setShoppingList 
}) => {
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
        async (
          [_breakfast, _dinner, _lunch, _snackOne, _snackTwo]
        ) => {
          let breakfast = await _breakfast.json()
          let dinner = await _dinner.json()
          let lunch = await _lunch.json()
          let snackOne = await _snackOne.json()
          let snackTwo = await _snackTwo.json()
          setMeals({
            breakfast: breakfast,
            dinner: dinner,
            lunch: lunch,
            snackOne: snackOne,
            snackTwo: snackTwo
          })
          let products = {};
          let courses = [breakfast, dinner, lunch]
          let snacks = [snackOne.product_id, snackTwo.product_id]
          courses.forEach(meal => { 
            meal.products.split(',').forEach(id => { 
              if (!products.id)
                products[id] = 1
              else
                products.id += 1
            })
          })
          snacks.forEach(id => {
            if (!products.id)
              products[id] = 1
            else
              products.id += 1
          })
          setShoppingList(shoppingList => ({ 
            ...shoppingList,
            ...products
          }))
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
