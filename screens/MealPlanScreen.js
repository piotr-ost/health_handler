import React, {useState, useEffect} from 'react';
import {View, Text, Image, Button, StyleSheet} from 'react-native';
import {Divider, Icon} from 'react-native-elements';
import axios from 'axios';

const ReturnButton = ({onPress}) => {
  return (
    <Icon onPress={onPress} type="font-awesome"
          name="arrow-left" color="green" />
  )
}

const ShoppingListButton = ({recipes}) => {
  // todo get the products using an api call
  // todo make the other python api to get the products prices
  const [recipesData, setRecipesData] = useState([]);
  const shoppingAction = () => {
    recipes.forEach((id) => {
      try {
        // const apiKey = '?apiKey=556d5c003785468ab5aa696a128a3d3a';
        const apiKey = '?apiKey=5bb1646af40448c4bd763b79205bc198'
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
            onPress={shoppingAction} color="green" />
      : <Icon type="font-awesome" name="shopping-cart"
              onPress={shoppingAction} color="green" />
  )
}
const Meal = ({id, imageType, title, readyInMinutes, servings}) => {
  const size = '240x150';
  const uri = `https://spoonacular.com/recipeImages/${id}-${size}.${imageType}`;
  return ( id && title ?
    <View>
      <Text>{title}</Text>
      <Divider style={styles.grayDivider}/>
      <View>
        <Image style={{width: 100, height: 100}} source={{uri: uri}} />
      </View>
      <Text>ready in: {readyInMinutes}</Text>
      <Text>serves for: {servings}</Text>
    </View> : null
  );
}

const MealsDay = ({dayName, meals, nutrients}) => {
  return (
    <View>
      <Text style={{fontSize: 25, textTransform: 'capitalize'}}>{dayName}</Text>
      <ul>
        <li>Calories: {nutrients.calories}</li>
        <li>Protein: {nutrients.protein}</li>
        <li>Fat: {nutrients.fat}</li>
        <li>Carbohydrates: {nutrients.carbohydrates}</li>
      </ul>
      {meals.map(({id, imageType, title, readyInMinutes, servings}) =>
        <Meal imageType={imageType} title={title} readyInMinutes={readyInMinutes}
              servings={servings} key={id} id={id} />
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
    //fetchData();
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <ReturnButton onPress={() => {}} />
        <Text style={styles.heading}>Meal Plan</Text>
        <ShoppingListButton recipes={recipes}/>
      </View>
      <Divider style={{width:330, height: 3, backgroundColor: '#848484'}}/>
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
  screen: {display: 'flex', flexDirection: 'column'},
  mealImg: {},
  header: {
    width: 300, height: 60, display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center', margin: 10
  },
  heading: {fontSize: 30},
  mealLabel: {},
  greenDivider: {width: 330, height: 2, backgroundColor: 'green'},
  grayDivider: {width: 330, height: 2, backgroundColor: 'gray'}
});

export default MealPlanScreen;
