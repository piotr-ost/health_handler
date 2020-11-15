import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {GreenDivider, GrayDivider} from '../components/Dividers.js';
import {ReturnButton} from '../components/Buttons.js';
import axios from 'axios';

const SCREEN_WIDTH = 375
const SCREEN_HEIGHT = 812
const GREEN = '#6FBF44'

const ShoppingListButton = ({recipes}) => {
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
            onPress={() => shoppingAction()} color={GREEN} />
      : <Icon type="font-awesome" name="shopping-cart"
              onPress={() => shoppingAction()} color={GREEN} />
  );
}

const Meal = ({id, imageType, title, mealType}) => {
  const size = '240x150';
  const uri = `https://spoonacular.com/recipeImages/${id}-${size}.${imageType}`;
  return ( id && title ?
    <View style={{height: 60, flex: 1, flexDirection: 'column'}}>
      <View style={{display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', alignItems: 'center'}}>
        <Image style={{width: 50, height: 50, borderRadius: 50}} source={{uri: uri}} />
        <View>
          <Text style={{fontSize: 11}}>{mealType}</Text>
          <Text style={{width: 250, height: 40}}>{title}</Text>
        </View>
        <View>
          <Icon onPress={() => {}} type="font-awesome" name="question"
                color={GREEN} size={15}/>
          <Icon onPress={() => {}} type="font-awesome" name="exchange"
                color={GREEN} size={15}/>
        </View>
      </View>
      <GreenDivider />
    </View> : null
);
}

const MealsDay = ({dayName, meals}) => {
  const mealTypes = ['BREAKFAST', 'LUNCH', 'DINNER']
  return (
    <View>
      <Text style={{fontSize: 25, textTransform: 'capitalize'}}>{dayName}</Text>
      <GrayDivider />
      {meals.map(({id, imageType, title, readyInMinutes, servings}, index) =>
        <Meal imageType={imageType} title={title} readyInMinutes={readyInMinutes}
              servings={servings} key={id} id={id} mealType={mealTypes[index]}/>
      )}
      <Meal />
    </View>
  );
}

const MealPlanScreen = () => {
  const base = 'https://api.spoonacular.com/mealplanner/generate';
  // const apiKey = '?apiKey=556d5c003785468ab5aa696a128a3d3a';
  const apiKey = '?apiKey=5bb1646af40448c4bd763b79205bc198'
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
    fetchData();
  }, []);


  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <ReturnButton onPress={() => {}} />
        <Text style={styles.headerText}>Meal Plan</Text>
        <ShoppingListButton recipes={recipes}/>
      </View>
      <GrayDivider />
      <View>
        {data.week ?
          Object.values(data.week).map(({meals, nutrients}, index) => {
            meals.forEach((meal) => recipes.push(meal.id))
            return (
              <MealsDay dayName={Object.keys(data.week)[index]}  meals={meals}
                        nutrients={nutrients} key={index}/>
            );
          }) : <Text>loading...</Text>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {display: 'flex', flexDirection: 'column', width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT, borderWidth: 1, borderColor: 'black',
    paddingVertical: 10, paddingHorizontal: 27},
  mealImg: {},
  header: {
    height: 45, display: 'flex', flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center', margin: 10
  },
  headerText: {fontFamily: 'Kumbh Sans', fontSize: 30, lineHeight: 30},
  mealLabel: {},
});

export default MealPlanScreen;
