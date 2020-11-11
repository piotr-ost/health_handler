import React, {useState, useEffect} from 'react';
import {View, Text, Image, Button} from 'react-native';
import axios from 'axios';

const ShoppingListButton = ({recipes}) => {
  // todo get the products using an api call
  // todo make the other python api to get the products prices
  const [recipesData, setRecipesData] = useState([]);
  const shoppingAction = () => {
    recipes.forEach((id) => {
      try {
        const apiKey = '?apiKey=556d5c003785468ab5aa696a128a3d3a';
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
      <Button onPress={shoppingAction} color="green" title="Shopping list for the week" />
      : <Button onPress={() => {}} disabled title="Shopping list for the week" />
  )
}
const Meal = ({id, imageType, title, readyInMinutes, servings}) => {
  const size = '240x150';
  const uri = `https://spoonacular.com/recipeImages/${id}-${size}.${imageType}`;
  return ( id && title ?
    <View>
      <Text>{title}</Text>
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
  const apiKey = '?apiKey=556d5c003785468ab5aa696a128a3d3a';
  const [data, setData] = useState([]);
  const recipes = [];

  useEffect(() => {
    const fetchData = async () => {
      console.log('firing a request');
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
    <View>
      <ShoppingListButton recipes={recipes}/>
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

export default MealPlanScreen;
