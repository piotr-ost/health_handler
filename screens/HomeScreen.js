import React, { useRef, useEffect, useState } from 'react'
import { Animated, View, Image, StyleSheet, Text } from 'react-native'
import { Sainsburys } from '../components/SupermarketCards'
import SmallLogo from '../components/SmallLogo'
import common from '../common.style'


const HomeScreen = ({ route, navigation }) => {
  const fadeAnimation = useRef(new Animated.Value(1)).current
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(fadeAnimation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
      }).start()
    }, 2000)
    setTimeout(() => {
      setReady(true)
    }, 4000)
  }, [])

  return (
    <View style={styles.screen}>
      {
        ready
          ? <StartView navigation={navigation} />
          : <Animated.View style={{opacity: fadeAnimation}}>
            <Image source={require('../assets/logo.png')} />
          </Animated.View>
      }
    </View>
  )
}

const StartView = ({ navigation }) => {
  return (
    <View>
      <SmallLogo />
      <Text style={[common.headingMain, {marginTop: 30}]}>
        Let's get started!
      </Text>
      <Text style={[common.text, {marginTop: 5}]}>
        Select your preferred supermarket
      </Text>
      <Sainsburys navigation={navigation} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    ...common.screen,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
})

export default HomeScreen
