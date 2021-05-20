import React, { useRef, useEffect, useState } from 'react'
import { Animated, View, Image } from 'react-native'
import common from '../common.style'
import AsyncStorage from '@react-native-async-storage/async-storage'

const HomeScreen = ({ navigation }) => {
  const fadeAnimation = useRef(new Animated.Value(1)).current
  const [selectedMealPlans, setSelectedMealPlans] = useState([])
  const fetchPlan = async () => {
    try {
      await AsyncStorage.getItem('@selectedMealPlans')
        .then(selectedMealPlans => {
          if (selectedMealPlans !== null) {
            navigation.navigate('WeeklyPlanScreen', {
              selectedMealPlans: JSON.parse(selectedMealPlans)
            })
          } else 
            navigation.navigate('SignInScreen')
        })
    } catch (err) {
      console.log(err)
      navigation.navigate('SignInScreen')
    }
  }
  useEffect(() => {
    setTimeout(() => {
      Animated.timing(fadeAnimation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
      }).start()
    }, 2000)
    setTimeout(() => {
      fetchPlan()
    }, 2500)
  }, [navigation])
  
  return (
    <View style={[
      common.screen, 
      {
        display: 'flex', justifyContent: 'center', 
        alignItems: 'center'
      }
    ]}>
      <Animated.View 
        style={{opacity: fadeAnimation, marginBottom: 50}}
      >
        <Image source={require('../assets/logo.png')} />
      </Animated.View>
    </View>
  )
}

export default HomeScreen

