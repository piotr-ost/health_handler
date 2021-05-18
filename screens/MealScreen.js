import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native'
import common from '../common.style'

const MealScreen = ({ route, navigation }) => {
  const [ingredients, setIngredients] = useState([])
  const { meal } = route.params
  useEffect(() => {}, [])  // todo get the ingredients here
  return (
    <View style={common.screen}>
      <Image source={{uri: meal.img}} style={styles.image} />
      <View style={styles.infoCard}> 
        <Text>{meal.creator_address}</Text>
        <Text>{meal.name}</Text>
        <Text>
          {meal.description}
        </Text>
        <Text>Ingredients</Text>
        <View style={{height: 300, width: '100%'}}>
          <ScrollView 
            style={{flex: 1, flexDirection: 'row'}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <Text>Ingredients</Text>
          </ScrollView>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  subText: {
    ...common.text,
    fontSize: 14,
    lineHeight: 16,
    color: '#858585'
  },
  headingText: {
    ...common.headingMain,
    fontSize: 21,
    lineHeight: 29,
    marginTop: 9
  },
  descriptionText: {
    ...common.text,
    fontSize: 12,
    lineHeight: 17,
  },
  image: {},
  infoCard: {
    width: '100%',
    height: 450,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: '#FDFDFF',
    top: 445,
    paddingVertical: 36,
    paddingHorizontal: 37
  }
})

export default MealScreen
