import React from 'react'
import { Image } from 'react-native'

export default ({ width=71, height=60 }) => {
  return <Image
    style={{width: width, height: height}}
    source={require('../assets/logo.png')}
  />
}
