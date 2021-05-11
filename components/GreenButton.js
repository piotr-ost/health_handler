import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import common from '../common.style'
import { LinearGradient } from 'expo-linear-gradient'

export default ({ text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} >
      <LinearGradient colors={['#5AD710', '#22E4CD']} style={styles.greenButton}>
        <Text 
          style={{
            color: '#FFFFFF', fontSize: 20, lineHeight: 27, fontFamily: 'PoppinsBold'
          }}
        >
          {text}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  greenButton: {
    width: '100%',
    height: 55,
    borderRadius: 13,
    ...common.center
  }
})
