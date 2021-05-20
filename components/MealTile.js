import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity }  from 'react-native'
import common from '../common.style'

const MealTile = ({ navigation, meal, mealType }) => { 
  return (
    <View style={styles.container} >
      <TouchableOpacity onPress={() => {
        navigation.navigate('MealScreen', { meal: meal })
      }}>
        <Image 
          style={{
            width: 110, height: 90,
            borderTopLeftRadius: 10, borderTopRightRadius: 10
          }} 
          source={{
            uri: meal.img ?? meal.img_url,
            cache: 'force-cache'
          }} 
        />
        <View style={styles.blank}>
          <View style={common.center}>
            <Text style={[common.text, {fontSize: 13}]}>
              {mealType}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  outer: {
    borderWidth: 0.55,
  },
  container: {
    marginTop: 20,
    borderRadius: 10,
    width: 110,
    height: 130,
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
