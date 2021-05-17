import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import common from '../common.style'

const MealScreen = ({ navigation, route }) => {
  const [ingredients, setIngredients] = useState([])
  // const { meal } = route  // todo kurwa jakos tak nie pamietam
  useEffect(() => {}, [])  // todo get the ingredients here
  return (
    <View style={common.screen}>
      <Image source={{uri: meal.img}} style={styles.image} />
      <View style={styles.infoCard}> 
        <Text>Jude Cornish's</Text>
        <Text>Student Butter Chicken</Text>
        <Text>
          The classic, quick and easy Butter Chicken curry.
          This has been my go-to high-protein meal throughout 
          my time as a student and I can easily do 5 portions in 
          one go, prepared for lunches throughout the week.
        </Text>
        <Text>Ingredients</Text>
        <View style={{height: 300, width: '100%'}}>
          <ScrollView 
            style={{flex: 1, flexDirection: 'row'}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {/* ingredients.map()*/}
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
