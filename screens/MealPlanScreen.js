import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import axios from 'axios';

const Meal = ({id, imageType, title, readyInMinutes, servings}) => {
  const size = '240x150'
  const uri = `https://spoonacular.com/recipeImages/${id}-${size}.${imageType}`
  console.log(uri)
  return (
    <View>
      <Text>{title}</Text>
      <Text>{readyInMinutes}</Text>
      <Text>{servings}</Text>
      <View>
        <Image style={{width: 100, height: 100}} source={{uri: uri}} />
      </View>
    </View>
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
      {meals.map(({id, imageType, title, readyInMinutes, servings}, index) =>
        <Meal imageType={imageType} title={title} readyInMinutes={readyInMinutes}
              servings={servings} key={index} id={id} />
      )}
      <Meal />
    </View>
  );
}

const MealPlanScreen = () => {
  const base = 'https://api.spoonacular.com/mealplanner/generate';
  const apiKey = '?apiKey=556d5c003785468ab5aa696a128a3d3a';
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log('firing a request');
      const res = await axios(base + apiKey);
      console.log('result:', res)
      setData(res.data);
    }
    fetchData();
  }, []);

  return (
    <View>
      {data.week ? Object.values(data.week).map(
        ({meals, nutrients}, index) =>
          <MealsDay dayName={Object.keys(data.week)[index]}  meals={meals}
                    nutrients={nutrients} key={index}/>
      ) : <Text>loading...</Text>
      }
    </View>
  );
}

export default MealPlanScreen;
