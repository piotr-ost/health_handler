import React, { useRef, useEffect } from 'react'
import { Animated, View, Image } from 'react-native'
import common from '../common.style'

const HomeScreen = ({ navigation }) => {
  const fadeAnimation = useRef(new Animated.Value(1)).current
  useEffect(() => {
    setTimeout(() => {
      Animated.timing(fadeAnimation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
      }).start()
    }, 2000)
    setTimeout(() => {
      navigation.navigate('SignInScreen')
    }, 2500)
  }, [navigation])
  
  return (
    <View style={[
      common.screen, 
      {display: 'flex', justifyContent: 'center', alignItems: 'center'}
    ]}>
      <Animated.View style={{opacity: fadeAnimation, marginBottom: 50}}>
        <Image source={require('../assets/logo.png')} />
      </Animated.View>
    </View>
  )
}

export default HomeScreen

