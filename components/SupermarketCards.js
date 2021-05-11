import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity }  from 'react-native'
import common from '../common.style'

export const Sainsburys = ({ navigation }) => {
  return (
    <View style={styles.outer}>
      <TouchableOpacity style={styles.container} onPress={() => 
          navigation.push('InputScreen', { supermarket: 'sainsburys' })}>
        <Image source={require('../assets/sainsburys.png')}/>
        <View style={styles.caption}>
          <Text style={[common.text, {fontSize: 14}]}>Sainsbury's</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  outer: {
    ...common.center,
    marginTop: 30
  },
  container: {
    borderRadius: 10,
    width: 136,
    height: 162,
    borderWidth: 0.55,
  },
  caption: {
    ...common.center,
    borderRadius: 10,
  }
})
