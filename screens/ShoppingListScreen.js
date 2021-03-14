import React, {useEffect, useState} from 'react';
import {Image, View, Text, Button, StyleSheet, Dimensions, ActivityIndicator} from 'react-native';
import {ReturnButton} from "../components/Buttons";
import {Icon} from 'react-native-elements';
import {GrayDivider, GreenDivider} from "../components/Dividers";
import {generateShoppingList} from "../ApiCalls";
import shoppingList_ from "../products_api/shopping_lists/shoppingList3.json";

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height
const GREEN = '#6FBF44'

const Product = ({id, name, measures, cost}) => {
  const unit = measures.metric.unit !== 1 ? measures.metric.unit : ''
  const measure = measures.metric.amount.toString() + unit
  const img = name.split(' ').join('-')
  const uri = `http://spoonacular.com/cdn/ingredients_100x100/${img}.jpg`
  console.log(uri)
  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <Image source={uri} style={{width: 30, height: 30, borderRadius: 30, marginRight: 5}}/>
        <View>
          <Text>{name}</Text>
          <Text>
            <Text>Quantity: {measure} {'\t'}</Text>
            <Text>Price: {Math.round(cost) / 100}$</Text>
          </Text>
        </View>
      </View>
      <GreenDivider />
    </View>
  )
}

const ShoppingListScreen = ({route, navigation}) => {
  const [shoppingList, setShoppingList] = useState(false)
  const {user} = route.params
  const {username, hash} = user
  useEffect( () => {
    setShoppingList(shoppingList_)
      // if (!shoppingList)
      //   generateShoppingList(username, hash).then(r => setShoppingList(r.data))
  }, [])
  return (
    <View style={styles.screen}>
      <View>
        <View style={styles.header}>
          <ReturnButton onPress={() => navigation.navigate('MealPlanScreen')}/>
          <Text style={[styles.text, {fontSize: 30}]}>Shopping list</Text>
          <Icon onPress={() => {}} type='font-awesome' name='floppy-o' color='#4EB849'/>
        </View>
        <GrayDivider />
      </View>
      {shoppingList ?
        shoppingList.aisles?.map(aisle => aisle.items.map(item =>
          <Product id={item.ingredientId} key={item.id} name={item.name}
                   measures={item.measures} cost={item.cost} />
      )) :
        <View style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
          <Text>Generating the shopping list...</Text>
          <ActivityIndicator color={GREEN} style={{padding: 30}}/>
        </View>
      }
      <Text>Total Cost: {Math.round(shoppingList?.cost) / 100}$</Text>
      <Button title="Weekly Consumption" color='#4EB849'
              onPress={() => navigation.navigate("ConsumptionScreen")}/>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {display: 'flex', flexDirection: 'column', width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT, paddingVertical: 10, paddingHorizontal: 27,
    justifyContent: 'space-between'},
  header: {
    height: 45, display: 'flex', flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center', margin: 10
  },
  text: {}
});

export default ShoppingListScreen;
