import React, { useEffect, useState, Component } from 'react'
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
          : <View />
      }
    </View>
  )
}

class SwipeBit extends Component {
  constructor(props) {
    super(props)
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
            <Card key={index}> 
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
export default SwipeScreen

