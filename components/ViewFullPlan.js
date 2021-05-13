import React from 'react'
import { TouchableOpacity, Text, Image } from 'react-native'

const ViewFullPlan = ({ onPress }) => {
  <TouchableOpacity style={styles.viewContainer} onPress={onPress}>
    <Text style={styles.clickyText}>View full plan</Text>
    <Image source={require('../assets/down.png')} style={{marginLeft: 10}} />
  </TouchableOpacity>
}
