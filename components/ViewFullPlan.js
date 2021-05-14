import React from 'react'
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native'
import common from '../common.style'

const ViewFullPlan = ({ onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.viewContainer} 
      onPress={onPress}
    >
      <Text style={styles.clickyText}>View full plan</Text>
      <Image source={require('../assets/down.png')} style={{marginLeft: 10}} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
 viewContainer: {
   alignSelf: 'center', 
   marginTop: 35, 
   flexDirection: 'row',
   alignItems: 'center'
 },  
  clickyText: {
    ...common.text,
    fontSize: 12, 
    lineHeight: 17, 
    color: 'green'
  }
})

export default ViewFullPlan
