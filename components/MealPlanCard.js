import React, { useState, useEffect } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  Image
} from 'react-native'
import ViewFullPlan from '../components/ViewFullPlan'
import common from '../common.style'
import { 
  GradientSwipeLeft,
  GradientSwipeRight 
} from '../screens/SwipeInstructionScreen'


const MealPlanCard = ({ mealPlan, onPressLeft, onPressRight }) => {
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
    <View>
      {
        meals.snackTwo &&
        <Image 
          style={styles.snackTwo}
          source={{
            cache: 'force-cache', 
            uri: meals.snackTwo.img_url
          }} 
        />
      }
      {
        meals.dinner &&
        <Image 
          style={styles.dinner}
          source={{
            cache: 'force-cache', 
            uri: meals.dinner.img
          }} 
        />
      }
      {
        meals.lunch &&
        <Image 
          style={styles.lunch}
          source={{
            cache: 'force-cache', 
            uri: meals.lunch.img
          }} 
        />
      }
      {
        meals.snackOne &&
        <Image 
        source={{
          uri: meals.snackOne.img_url,
          cache: 'force-cache', 
        }} 
          style={styles.snackOne}
        />
      }
      {
        meals.breakfast &&
        <Image 
          style={styles.breakfast}
          source={{
            uri: meals.breakfast.img,
            cache: 'force-cache'
          }} 
        />
      }
      <View style={styles.infoCard}>
        <View>
          <Text style={styles.subText}>
            {mealPlan.creator_name}
          </Text>
          <Text style={styles.headingText}>
            {mealPlan.title}
          </Text>
          <SafeAreaView style={{marginTop: 20}}>
            <ScrollView style={{height: 95}}>
              <Text style={styles.descriptionText}>
                {mealPlan.description}
              </Text>
            </ScrollView>
          </SafeAreaView>
        </View>
        <View style={styles.bottomRow}>
          <TouchableOpacity onPress={onPressLeft}>
            <GradientSwipeLeft />
          </TouchableOpacity>
          <View style={{marginBottom: 30}}>
            <ViewFullPlan onPress={() => {}} />
          </View>
          <TouchableOpacity onPress={onPressRight}>
            <GradientSwipeRight />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  breakfast: {
    width: 287, 
    height: 287, 
    position: 'absolute',
    left: -68,
    top: -52,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    borderRadius: 250
  },
  lunch: {
    height: 326,
    width: 326,
    left: 143,
    top: 41,
    position: 'absolute',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    borderRadius: 250
  },
  dinner: {
    width: 354, 
    height: 354, 
    position: 'absolute',
    left: -104,
    top: 176,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    borderRadius: 250
  },
  snackOne: {
    width: 220,
    height: 220,
    left: 183,
    top: -96,
    position: 'absolute',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    borderRadius: 250
  },
  snackTwo: {
    width: 220,
    height: 220,
    left: 188,
    top: 316,
    position: 'absolute',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    borderRadius: 250
  },
  infoCard: {
    width: '100%',
    height: 450,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: '#FDFDFF',
    top: 445,
    paddingVertical: 36,
    paddingHorizontal: 37,
  },
  subText: {
    ...common.text,
    fontSize: 14,
    lineHeight: 16,
    color: '#858585'
  },
  headingText: {
    ...common.headingMain,
    fontSize: 21,
    lineHeight: 29,
    marginTop: 5
  },
  descriptionText: {
    ...common.text,
    fontSize: 12,
    lineHeight: 17,
  },
  bottomRow: {
    ...common.flexRow,
    marginHorizontal: 30,
    height: 80,
    position: 'absolute',
    bottom: 130,
    alignSelf: 'center',
    width: '90%'
  }
})

export default MealPlanCard
