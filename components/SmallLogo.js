import React from 'react'
import { Image } from 'react-native'

export default () => {
  return <Image
    style={{width: 71, height: 60}}
    source={require('../assets/logo.png')}
  />
}