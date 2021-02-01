import React, {useState, useEffect} from 'react';
import {
  View, Text, Image, StyleSheet, TouchableOpacity,
  ActivityIndicator, Dimensions} from 'react-native';
import {Icon} from 'react-native-elements';
import {GreenDivider, GrayDivider, ThinGrayDivider} from '../components/Dividers.js';
import {ReturnButton} from '../components/Buttons.js';
import {DropdownIcon} from "./InputScreen";
import axios from 'axios'
import {fetchDataJohny} from '../ApiCalls'
import {mealData} from './data'

const user = {
  "username":"api-52495-ec283c8e-e354-41d1-ae07-0ca4d098c8dd",
  "hash":"a0e87d57d77da830a56dce0af315e1eec9b7309e"
};
const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height
const GREEN = '#6FBF44';

const ShoppingListButton = ({onPress}) => {
  return <Icon type="font-awesome" name="shopping-cart"
               onPress={onPress} color={GREEN} />
}

const Meal = ({navigation, id, imageType, title, mealType, amount, unit, type_, image}) => {
  let uri
  if (type_ === 'INGREDIENTS')
    uri = image.replace('100x100', '250x250')
  else if (type_ === 'RECIPE')
    uri = `http://spoonacular.com/recipeImages/${id}-240x150.${imageType}`
  else if (type_ === 'PRODUCT')
    uri = `http:///spoonacular.com/productImages/${id}-312x231.${imageType}`
  console.log(uri)
  return ( id && title ?
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View style={{display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', alignItems: 'center', paddingBottom: 6}}>
        <Image style={{width: 50, height: 50, borderRadius: 50, marginRight: 8}}
               source={uri ? {uri: uri} : {}} />
        <View>
          <Text style={[styles.text, {fontSize: 11, color: GREEN}]}>{mealType}</Text>
          {amount ?
            <Text style={{width: 250, fontSize: 16}}>{title}: {amount} {unit}</Text>
            : <Text style={{width: 250, fontSize: 16}}>{title}</Text>
          }
        </View>
        <View style={{display: 'flex', justifyContent: 'space-between'}}>
          {navigation &&
          <Icon onPress={() => {navigation.navigate('RecipeDetailsScreen', {
            id: id,
            uri: uri,
            title: title
          })}} type="font-awesome" name="question" color={GREEN} size={15} style={{marginRight: 5}}/>
          }
          {/*<Icon onPress={() => {}} type="font-awesome" name="exchange"*/}
          {/*      color={GREEN} size={15}/>*/}
        </View>
      </View>
      <ThinGrayDivider />
    </View> : null
);
}

const MealsDay = ({navigation, dayName, items}) => {
  function* mealGen() {
    const mealTypes = ['BREAKFAST', 'LUNCH', 'DINNER']
    while (true)
      for (let meal of mealTypes)
        yield meal
  }
  let gen = mealGen()
  return (
    <View>
      <TouchableOpacity style={{display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', alignItems: 'center'}} onPress={() => {}}>
        <Text style={[styles.text, {fontSize: 16, textTransform: 'capitalize',
          marginVertical: 10}]}>
          {dayName}
        </Text>
        <DropdownIcon />
      </TouchableOpacity>
      <GreenDivider/>
      <View style={{marginVertical: 15}}>
        {items.map(({type, value, id}) => {
          if (type === 'RECIPE') {
            return <Meal imageType={value.imageType} title={value.title} key={id} navigation={navigation}
                         id={value.id} mealType={gen.next().value} type_={type}/>
          } else if (type === 'INGREDIENTS') {
            let ingredient = value.ingredients[0]
            console.log(ingredient)
            return <Meal title={ingredient.name} key={id} mealType={'SNACK'} type_={type} id={id}
                         amount={ingredient.amount} unit={ingredient.unit} image={ingredient.image}/>
          } else if (type === 'PRODUCT') {
            return <Meal title={value.title} id={value.id} key={id} mealType={'SNACK'}
                         imageType={value.imageType} type_={type}/>
          }
        })
        }
      </View>
    </View>
  );
}

const getDiet = (userData) => {
  if (userData.vegetarian)
    if (userData.vegan)
      return 'vegan'
    else
      return 'vegetarian'
  return 'whole30'
}

const getExclude = (userData) => {
  const exclude = []
  if (userData.nutFree)
    exclude.push('nuts')
  if (userData.fishAllergy)
    exclude.push('fish')
  if (userData.lactoseFree)
    exclude.push('milk')
  return exclude
}

const MealPlanScreen = ({route, navigation}) => {
  // const apiKey = '?apiKey=556d5c003785468ab5aa696a128a3d3a';
  const apiKey = '?apiKey=5bb1646af40448c4bd763b79205bc198'
  const [mealPlan, setMealPlan] = useState([]);
  let days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  const dayToday = new Date().getDay() -1 // sunday is 0
  days = [...days.slice(dayToday), ...days.slice(0, dayToday)]
  route.params  // to access parameters passed in navigation.navigate()
  useEffect(() => {
    setMealPlan(mealData)
    // !mealPlan.length ? fetchDataJohny().then(r => setMealPlan(r)) : null;
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <ReturnButton onPress={() => navigation.navigate('InputScreen')} />
        <Text style={[styles.text, {fontSize: 30}]}>Meal Plan</Text>
        <ShoppingListButton onPress={() => navigation.navigate('ShoppingListScreen')} />
      </View>
      <GrayDivider />
      <View style={{marginTop: 20}}>
        {mealPlan.length ?
          mealPlan.map(({items}, index) => {
            return <MealsDay navigation={navigation} dayName={days[index]} items={items} key={days[index]}/>
          }) :
          <View style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
            <Text>Generating the meal plan...</Text>
            <ActivityIndicator color={GREEN} style={{padding: 30}}/>
          </View>
        }
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  screen: {display: 'flex', flexDirection: 'column', width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT, paddingVertical: 10, paddingHorizontal: 27,
    backgroundColor: 'white'},
  header: {
    height: 45, display: 'flex', flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center', margin: 10
  },
  text: {fontStyle: 'KumbhSans-Regular'}
});

export default MealPlanScreen;
