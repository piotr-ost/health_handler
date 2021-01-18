import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import {getRecipeInformation} from '../getRecipeInfo'
import data from '../recipeInfo'
import {styles as styles_} from './MealPlanScreen'
import {ReturnButton} from "../components/Buttons";
import {GrayDivider} from "../components/Dividers";

const GREEN = '#6FBF44';

const RecipeDetailsScreen = ({navigation, route}) => {
  const {id, uri, title} = route.params
  // const [data, setData] = useState(null)
  // useEffect(() => {
  //   getRecipeInformation(id).then(r => {
  //     setData(r)
  //   }).catch(e => console.log(e))
  // })
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <ReturnButton onPress={() => {navigation.goBack()}} />
        <Text>Recipe</Text>
      </View>
      <GrayDivider />
      <RecipeDetails title={title} uri={uri} vegetarian={data.vegetarian}
                     vegan={data.vegan} glutenFree={data.glutenFree}
                     dairyFree={data.dairyFree} healthScore={data.healthScore} />
      <RecipeIngredients extendedIngredients={data.extendedIngredients}/>
  </View>
  )
}

const RecipeDetails = ({title, uri, vegetarian, vegan, glutenFree, dairyFree, healthScore}) => {
  return (
    <View style={styles.recipeDetails}>
      <Image source={uri} style={{width: 100, height: 100, borderRadius: 60}} />
      <Text>{title}</Text>
      <View>
        <Text>Vegetarian {vegetarian}</Text>
        <Text>Vegan {vegan}</Text>
        <Text>Gluten Free {glutenFree}</Text>
        <Text>Dairy Free {dairyFree}</Text>
      </View>
      <Text> *circle* {'\n'} {healthScore}</Text>
    </View>
  )
}

const RecipeIngredients = ({extendedIngredients}) => {
  return (
    <View>
      {extendedIngredients.map(
        ({name, amount, unit}) => <Text>{amount} {unit} {name}</Text>
      )}
    </View>
  )
}

const RecipeInstructions = () => {
  // TODO
}

const styles = StyleSheet.create({
  ...styles_,
  recipeDetails: {},
  recipeIngredients: {},
  recipeInstructions: {}
})


export default RecipeDetailsScreen
