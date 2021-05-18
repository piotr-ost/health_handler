import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity }  from 'react-native'
import common from '../common.style'

const MealTile = ({ navigation, meal, mealType }) => {
  return (
    <View>
      { meal.img && 
      <View style={styles.container} >
        <TouchableOpacity onPress={() => {
          navigation.navigate('MealScreen', { meal: meal })
        }}>
          <View style={{width: '100%', height: '100%'}}>
            <Image 
              style={{width: 110, height: 90}} 
              source={{uri: meal.img}} 
            />
          </View>
          <View style={styles.blank}>
            <View style={common.center}>
              <Text style={[common.text, {fontSize: 13}]}>
                {mealType && mealType}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  outer: {
    borderWidth: 0.55,
  },
  container: {
    marginTop: 40,
    borderRadius: 10,
    width: 136,
    height: 162,
    shadowOffset: {
      width: 1,
      height: 3
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 5
  },
  blank: {
    height: 30,
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  }
})

export default MealTile
