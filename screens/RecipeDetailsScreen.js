import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, Image, Dimensions, ActivityIndicator, TouchableOpacity} from 'react-native'
import {getRecipeInformation} from '../getRecipeInfo'
// import data from '../recipeInfo'
import {ReturnButton} from "../components/Buttons"
import {GrayDivider, ThinGrayDivider} from "../components/Dividers"
import {VeganIcon, VegetarianIcon, GlutenIcon, DairyIcon} from "../components/Icons"

const GREEN = '#6FBF44';
const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

const RecipeDetailsScreen = ({navigation, route}) => {
  const {id, uri, title} = route.params
  const [data, setData] = useState(null)
  useEffect(() => {
    getRecipeInformation(id).then(r => {
      setData(r)
    }).catch(e => console.log(e))
  }, [])
  return (
    <View style={styles.screen}>
      <View style={{width: '100%'}}>
        <View style={styles.header}>
          <ReturnButton onPress={() => {navigation.goBack()}} />
          <Text>Recipe</Text>
          <Text />
        </View>
        <GrayDivider/>
      </View>
      {data ?
        <View>
          <RecipeDetails title={title} uri={uri} vegetarian={data.vegetarian}
                         vegan={data.vegan} glutenFree={data.glutenFree} dairyFree={data.dairyFree} />
          <RecipeIngredients extendedIngredients={data.extendedIngredients} />
          <Score healthScore={data.healthScore}/>
          <Text>{data.instructions}</Text>
        </View>
        :
        <View style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
          <Text>Fetching the recipe...</Text>
          <ActivityIndicator color={GREEN} style={{padding: 30}}/>
        </View>
      }
  </View>
  )
}

const RecipeDetails = ({title, uri, vegetarian, vegan, glutenFree, dairyFree}) => {
  return (
    <View style={styles.recipeDetails}>
      <Image source={uri} style={{width: 100, height: 100, borderRadius: 60}} />
      <Text style={{fontWeight: '500'}}>{title}</Text>
      <View style={{flexDirection: 'row', alignContent: 'center'}}>
        <VegetarianIcon vegetarian={vegetarian} />
        <VeganIcon vegan={vegan} />
        <GlutenIcon gluten={glutenFree} />
        <DairyIcon dairy={dairyFree} />
      </View>
    </View>
  )
}

const RecipeIngredients = ({extendedIngredients}) => {
  return (
    <View>
      <ThinGrayDivider />
      <View style={styles.recipeIngredients}>
        {extendedIngredients.map(({name, amount, unit}) =>
          <Ingredient key={name} name={name} amount={amount} unit={unit} />
        )}
      </View>
      <ThinGrayDivider />
    </View>
  )
}

const Ingredient = ({amount, unit, name}) => {
  if (unit === 'teaspoon')
    unit = 'tsp'
  if (unit === 'pound')
    unit = 'lbs'
  if (unit === '')
    unit = 'x'
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', width: '50%'}}>
      <Text>
        <Text style={{color: GREEN}}>{amount} {unit} </Text>
        <Text>{name}</Text>
      </Text>
    </View>
  )
}

const Score = ({healthScore}) => {
  return (
    <View style={{width: '100%'}}>
      <Text>HealthHandler score:</Text>
      <Text>
        <Text style={{color: GREEN, fontSize: 40, fontWeight: '700'}}>{healthScore}</Text>
        <Text style={{color: GREEN, fontSize: 25, fontWeight: '500'}}> / 100</Text>
        <Text style={{color: 'gray', fontSize: 10, position: 'absolute', right: 0, bottom: 0, marginBottom: 10}}>
          Courtesy of Spoonacular
        </Text>
      </Text>
      <ThinGrayDivider />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {display: 'flex', flexDirection: 'column', width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT, paddingVertical: 10, paddingHorizontal: 27,
    backgroundColor: 'white', alignItems: 'center'},
  header: {
    height: 45, display: 'flex', flexDirection: 'row',
    justifyContent: "space-between", alignItems: 'center'
  },
  recipeDetails: {alignItems: 'center', marginVertical: 20},
  recipeIngredients: {flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start'}
})

// note to self:
// align is for the side axis whereas justify is for main axis, those will vary s.t. flex (main axis == flex direction)

export default RecipeDetailsScreen
