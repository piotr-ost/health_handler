import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import MealPlanCard from '../components/MealPlanCard'
import common from '../common.style'
import CardStack, { Card } from 'react-native-card-stack-swiper'


const SwipeScreen = ({ route, navigation }) => {
  const [mealPlans, setMealPlans] = useState([])
  useEffect(() => {
    fetch('https://handler.health/meal-plans')
      .then(r => r.json())
      .then(r => setMealPlans(r))
      .then(console.log(mealPlans))
  }, [])
  return (
    <View> 
      { mealPlans.length
          ? <SwipeBit mealPlans={mealPlans} />
          : <Text>Chuj</Text>
      }
    </View>
  )
}

const SwipeBit = ({ mealPlans }) => {
  return (
    <View >
      <CardStack
        loop={true}
        verticalSwipe={false}
        renderNoMoreCards={() => null}
        cardContainerStyle={{width: '100%', height: '100%'}}
      >
      {
        mealPlans.map((mealPlan, index) => (
          <Card key={index}> 
            <MealPlanCard 
              mealPlan={mealPlan} 
            />
          </Card>
        ))
      }
      </CardStack>
    </View>
  )
}
export default SwipeScreen

