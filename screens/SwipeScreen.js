import React, { useEffect, useState, Component } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import MealPlanCard from '../components/MealPlanCard'
import common from '../common.style'
import CardStack, { Card } from 'react-native-card-stack-swiper'
import { LinearGradient } from 'expo-linear-gradient'

const SwipeScreen = ({ route, navigation }) => {
  const [mealPlans, setMealPlans] = useState([])
  const [selectedMealPlans, setSelectedMealPlans] = useState([])
  const { requirements, redo } = route.params
  const fitsTheRequirements = (mealPlan) => {
    if (
      requirements.vegan === mealPlan.vegan && 
      requirements.vegetarian === mealPlan.vegetarian && 
      requirements.glutenFree === mealPlan.glutenFree && 
      requirements.lactoseFree === mealPlan.lactoseFree
    )
      return true
    else
      return false
  }
  useEffect(() => {
    const fetchStuff = () => {
      const url = 'https://handler.health/meal-plans'
      fetch(url)
        .then(r => r.json())
        .then(r => {
          const filtered = r.filter( 
            mealPlan => fitsTheRequirements(mealPlan)
          )
          setMealPlans(filtered)
        })
        .catch(err => console.log(err))
    }
    fetchStuff()
  }, [])

  useEffect(() => {
    if (selectedMealPlans.length == 7) 
      navigation.navigate('WeeklyPlanScreen', {
        selectedMealPlans: selectedMealPlans,
      })
  }, [selectedMealPlans])

  return (
    <View> 
      { 
        mealPlans.length ? 
          <SwipeBit 
            mealPlans={mealPlans} 
            selectedMealPlans={selectedMealPlans}
            setSelectedMealPlans={setSelectedMealPlans}
          />
          : 
          <View />
      }
      <LinearGradient 
        style={styles.counter} 
        colors={['#5AD710', '#22E4CD']}
      >
        <Text style={styles.counterText}>
          {selectedMealPlans.length} / 7
        </Text>
      </LinearGradient>
    </View>
  )
}

class SwipeBit extends Component {
  constructor(props) {
    super(props)
  }

  onSwipeRight(mealPlan) {
    this.props.setSelectedMealPlans([
      ...this.props.selectedMealPlans,
      mealPlan
    ])
  }

  render() {
    return (
      <View >
        <CardStack
          loop={true}
          verticalSwipe={false}
          renderNoMoreCards={() => null}
          cardContainerStyle={{width: '100%', height: '100%'}}
          ref={swiper => { this.swiper = swiper }}
        >
        {
          this.props.mealPlans.map((mealPlan, index) => (
            <Card 
              key={index} 
              onSwipedRight={() => this.onSwipeRight(mealPlan)}
            > 
              <MealPlanCard 
                mealPlan={mealPlan} 
                onPressLeft={() => this.swiper.swipeLeft()}
                onPressRight={() => this.swiper.swipeRight()}
              />
            </Card>
          ))
        }
        </CardStack>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  counter: {
    width: 84,
    height: 64,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    position: 'absolute',
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    borderRadius: 10
  },
  counterText: {
    ...common.headingMain,
    fontSize: 20,
    lineHeight: 30,
    letterSpacing: 0.125,
    color: '#FFFFFF',
    position: 'absolute'
  }
})

export default SwipeScreen

