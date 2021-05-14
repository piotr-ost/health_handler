import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import ViewFullPlan from '../components/ViewFullPlan'
import common from '../common.style'


const MealPlanCard = ({ mealPlan }) => {
  const urlBase = 'http://localhost:7000/meals/'
  const [meals, setMeals] = useState({
    breakfast: null,
    dinner: null,
    lunch: null,
    snackOne: null,
    snackTwo: null
  })
  useEffect(() => {
    fetch(urlBase + mealPlan.breakfast)
      .then(r => r.json())
      .then(r => console.log(r))
      .then(r => setMeals({ ...meals, breakfast: r })) 
    fetch(urlBase + mealPlan.dinner)
      .then(r => r.json())
      .then(r => setMeals({ ...meals, dinner: r }))
    fetch(urlBase + mealPlan.lunch)
      .then(r => r.json())
      .then(r => setMeals({ ...meals, lunch: r }))
    fetch(urlBase + mealPlan.snack_one)
      .then(r => r.json())
      .then(r => setMeals({ ...meals, snackOne: r }))
    fetch(urlBase + mealPlan.snack_two)
      .then(r => r.json())
      .then(r => setMeals({ ...meals, snackTwo: r }))
      .then(console.log(meals))
  }, [])
  return (
    <View>
      <Image 
        style={styles.snackTwo}
        source={require('../assets/ribs.png')} 
      />
      <Image 
        style={styles.dinner}
        source={require('../assets/ribs.png')} 
      />
      <Image 
        style={styles.lunch}
        source={require('../assets/ribs.png')} 
      />
      <Image 
        source={require('../assets/ribs.png')} 
        style={styles.snackOne}
      />
      <Image 
        style={styles.breakfast}
        source={require('../assets/ribs.png')} 
      />
        <Text>huj</Text>
      <View style={styles.infoCard}>
        <View>
          <Text style={styles.subText}>Jude Cornish's</Text>
          <Text style={styles.headingText}>
            High Protein Cheat Day
          </Text>
          <View style={{marginTop: 20}}>
            <Text style={styles.descriptionText}>
              Cheat days are necessary - we’ve created the perfect 
              high-protein cheat day meal plan for you. 
              Keep in line with your goals while enjoying some 
              great food.
            </Text>
          </View>
        </View>
        <ViewFullPlan onPress={() => {}} />
        <View style={styles.bottomRow}>
          <Image source={require('../assets/dislike.png')} />
          <Image source={require('../assets/report.png')} />
          <Image source={require('../assets/share.png')} />
          <Image source={require('../assets/like.png')} />
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
    paddingHorizontal: 37
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
    marginTop: 10,
    marginHorizontal: 20,
  }
})

export default MealPlanCard
