import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {GreenDivider, GrayDivider, ThinGrayDivider} from '../components/Dividers.js';
import {ReturnButton} from '../components/Buttons.js';
import {DropdownIcon} from "./InputScreen";
import axios from 'axios';

const SCREEN_WIDTH = 375
const SCREEN_HEIGHT = 812
const GREEN = '#6FBF44'

const ShoppingListButton = ({recipes, onPress}) => {
  // todo get the products using an api call
  // todo make the other python api to  the products prices
  const [recipesData, setRecipesData] = useState([]);
  const shoppingAction = () => {
    recipes.forEach((id) => {
      try {
        // const apiKey = '?apiKey=556d5c003785468ab5aa696a128a3d3a';
        const apiKey = '?apiKey=5bb1646af40448c4bd763b79205bc198';
        const url = `https://api.spoonacular.com/recipes/${id}/information`;
        console.log(url);
        const res = axios.get(url + apiKey);
        setRecipesData([...recipesData, res.data]);
        console.log(res.data);
        // todo test this, out of requests for today
      } catch (err) {
        console.log(err);
      }
    });
  }
  return (recipes.length === 7*3 ?
      <Icon type="font-awesome" name="shopping-cart"
            onPress={onPress} color={GREEN} />
      : <Icon type="font-awesome" name="shopping-cart"
              onPress={onPress} color={GREEN} />
  );
}

const Meal = ({id, imageType, title, mealType}) => {
  const size = '240x150';
  const uri = `https://spoonacular.com/recipeImages/${id}-${size}.${imageType}`;
  return ( id && title ?
    <View style={{height: 60, flex: 1, flexDirection: 'column'}}>
      <View style={{display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', alignItems: 'center', paddingBottom: 6}}>
        <Image style={{width: 50, height: 50, borderRadius: 50, marginRight: 8}}
               source={{uri: uri}} />
        <View>
          <Text style={[styles.text, {fontSize: 11, color: GREEN}]}>{mealType}</Text>
          <Text style={{width: 250, height: 40, fontSize: 16}}>{title}</Text>
        </View>
        <View style={{height: 40, display: 'flex', justifyContent: 'space-between'}}>
          <Icon onPress={() => {}} type="font-awesome" name="question"
                color={GREEN} size={15}/>
          <Icon onPress={() => {}} type="font-awesome" name="exchange"
                color={GREEN} size={15}/>
        </View>
      </View>
      <ThinGrayDivider />
    </View> : null
);
}

const MealsDay = ({dayName, meals}) => {
  const [expanded, setExpanded] = useState(false);
  const mealTypes = ['BREAKFAST', 'LUNCH', 'DINNER'];
  return (
    <View>
      <View style={{display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={[styles.text, {fontSize: 16, textTransform: 'capitalize',
          marginVertical: 10}]}>
          {dayName}
        </Text>
        <DropdownIcon />
      </View>
      <GreenDivider/>
      <View style={{marginVertical: 15}}>
        {meals.map(({id, imageType, title, readyInMinutes, servings}, index) =>
          <Meal imageType={imageType} title={title} readyInMinutes={readyInMinutes}
                servings={servings} key={id} id={id} mealType={mealTypes[index]}/>
        )}
        <Meal />
      </View>
    </View>
  );
}

const MealPlanScreen = ({navigation}) => {
  const base = 'https://api.spoonacular.com/mealplanner/generate';
  const apiKey = '?apiKey=556d5c003785468ab5aa696a128a3d3a';
  //const apiKey = '?apiKey=5bb1646af40448c4bd763b79205bc198'
  const [data, setData] = useState([]);
  const recipes = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(base + apiKey);
        console.log('result:', res);
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    !data.length ? fetchData() : null;
  }, []);


  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <ReturnButton onPress={() => navigation.navigate('InputScreen')} />
        <Text style={[styles.text, {fontSize: 30}]}>Meal Plan</Text>
        <ShoppingListButton onPress={() => navigation.navigate('ShoppingListScreen')}
                            recipes={recipes}/>
      </View>
      <GrayDivider />
      <View style={{marginTop: 20}}>
        {data.week ?
          Object.values(data.week).map(({meals, nutrients}, index) => {
            meals.forEach((meal) => recipes.push(meal.id))
            return (
              <MealsDay dayName={Object.keys(data.week)[index]}  meals={meals}
                        nutrients={nutrients} key={index}/>
            );
          }) : <Text style={styles.text}>loading...</Text>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
