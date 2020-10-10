import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';


const MealPlanScreen = () => {
  const base = 'https://api.spoonacular.com/mealplanner/generate'
  const apiKey = '?apiKey=94d758dd321a4522a5cd3c13fe18fad0'
  const [state, setState] = useState({
    loading: true,
    data: []
  })

  fetch(base + apiKey)
    .then(response => {
      if (response.ok) {
        setState({
          loading: false,
          data: [response.json()]
        })
        console.log(state.data)
      }
    })

  // useEffect(() => {
  //
  // })

  return (
    <View>
      <Text>Hello</Text>
    </View>
  )
}

export default MealPlanScreen;
