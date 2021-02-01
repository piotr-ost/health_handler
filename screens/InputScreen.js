import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import {GrayDivider, GreenDivider} from "../components/Dividers";
import {Icon, CheckBox, Slider} from "react-native-elements";
import {Button} from 'react-native';  // for now
import {apiKey, getDates} from '../ApiCalls'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

// iphone X dims
const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height
const GREEN = '#6FBF44'

export const DropdownIcon = ({onPress}) => {
  return <Icon type="font-awesome" name="caret-down" color={GREEN} onPress={onPress} />;
}

const Dropdown = ({text, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        display: 'flex', flexDirection: 'row',  borderRadius: 3,
        justifyContent: 'space-between', padding: 6,
        borderColor: GREEN, borderWidth: 1, height: 35, marginTop: 20
      }}
      onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
      <DropdownIcon />
    </TouchableOpacity>
  );
}

const SavedPlansDropdown = () => {
  return (
    <View>
      <View style={styles.flexRow}>
        <Text>View existing meal plans</Text>
        <DropdownIcon />
      </View>
      <GreenDivider />
    </View>
  );
}

const PriceSlider = ({value, onValueChange}) => {
  return (
  <View>
    <Slider
      value={value}
      minimumValue={1}
      maximumValue={20}
      step={0.05}
      onValueChange={onValueChange}
      thumbStyle={{height: 20, width: 20, backgroundColor: GREEN}}
      trackStyle={{backgroundColor: 'transparent'}}
    />
    <Text style={{alignSelf: 'center'}}>{value.toFixed(2)}$/meal</Text>
  </View>
  )
}

const TimeSlider = ({value, onValueChange}) => {
  return (
    <View>
      <Slider
        value={value}
        minimumValue={15}
        maximumValue={100}
        step={1}
        onValueChange={onValueChange}
        thumbStyle={{height: 20, width: 20, backgroundColor: GREEN}}
        trackStyle={{backgroundColor: 'transparent'}}
      />
      <Text style={{alignSelf: 'center'}}>{value}min</Text>
    </View>
  )
}

const CaloriesSlider = ({value, onValueChange}) => {
  return (
    <View>
      <Slider
        value={value}
        minimumValue={1500}
        maximumValue={4000}
        step={50}
        onValueChange={onValueChange}
        thumbStyle={{height: 20, width: 20, backgroundColor: GREEN}}
        trackStyle={{backgroundColor: 'transparent'}}
      />
      <Text style={{alignSelf: 'center'}}>{value}kcal</Text>
    </View>
  )
}

const InputScreen = ({navigation}) => {
  const [userData, setUserData] = useState({
    vegetarian: false,
    vegan: false,
    nutFree: false,
    halal: false,
    lactoseFree: false,
    fishAllergy: false
  });
  const [price, setPrice] = useState(10)
  const [time, setTime] = useState(120)
  const [calories, setCalories] = useState( 2300)
  const [waiting, setWaiting] = useState(false)
  return (
    <View style={styles.screen}>
       <View style={styles.header}>
         <Text style={styles.headerText}>Health Handler</Text>
         <Image source={require('../assets/logo.png')} style={styles.smallLogo} />
       </View>
       <GrayDivider />
       <SavedPlansDropdown />
       <View style={styles.flexRow}>
         <Text>Create a new meal plan:</Text>
       </View>
       <GreenDivider />
       <View>
         <Image source={require('../assets/undraw_cooking_lyxy 1.png')}
                style={styles.img} />
       </View>
      <Dropdown onPress={() => {}} text="Select a supermarket..." type="wide" />
      <View style={{display: 'flex', flexDirection: 'column', justifyContent: "space-between"}}>
        <View style={{padding: 10}}>
          <PriceSlider value={price} onValueChange={(value) => setPrice(value)}/>
          <TimeSlider value={time} onValueChange={(value) => setTime(value)} />
          <CaloriesSlider value={calories} onValueChange={(value) => setCalories(value)}/>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={styles.column}>
            <View>
              <CheckBox checked={userData.vegetarian} title="Vegetarian"
                        checkedColor={GREEN} onPress={() => setUserData(
                {...userData, vegetarian: !userData.vegetarian})} />
              <CheckBox checked={userData.nutFree} title="Nut free"
                        checkedColor={GREEN} onPress={() => setUserData(
                {...userData, nutFree: !userData.nutFree})} />
              <CheckBox checked={userData.halal} title="Halal"
                        checkedColor={GREEN} onPress={() => setUserData(
                {...userData, halal: !userData.halal})} />
            </View>
          </View>
          <View style={styles.column}>
            <View>
              <CheckBox checked={userData.vegan} title="Vegan"
                        checkedColor={GREEN} onPress={() => setUserData(
                {...userData, vegan: !userData.vegan})} />
              <CheckBox checked={userData.lactoseFree} title="Nut free"
                        checkedColor={GREEN} onPress={() => setUserData(
                {...userData, lactoseFree: !userData.lactoseFree})} />
              <CheckBox checked={userData.fishAllergy} title="No fish"
                        checkedColor={GREEN} onPress={() => setUserData(
                {...userData, fishAllergy: !userData.fishAllergy})} />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.button}>
          <Button onPress={async () => {
            setWaiting(true)
            const dataFromThisScreen = {userData: userData, price: price, time: time, calories: calories}
            const mealPlanTemplateId = 120  // for now
            const startDate = Math.round(new Date().getTime() / 1000 + 100)
            try {
              const userJson = await AsyncStorage.getItem('user')
              const user = JSON.parse(userJson)
              if (user) {
                const base = 'https://api.spoonacular.com/mealplanner/'
                const res = await axios.post(
                  base + `${user.username}/items?${apiKey}&hash=${user.hash}`,
                  {"mealPlanTemplateId": mealPlanTemplateId, "startDate": startDate}
                )
                const data = await res.data
                navigation.navigate("MealPlanScreen", {
                  data: data
                })
                setWaiting(false)
              }
            } catch (e) {
              console.log(e)
            }
          }
          } title={!waiting ? "Create plan" : "Sending..."} color={GREEN} style={styles.button} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {display: 'flex', width: SCREEN_WIDTH, height: SCREEN_HEIGHT,
    justifyContent: 'flex-start', alignContent: 'space-between',
    paddingHorizontal: 27, paddingTop: 10},
  header: {display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
    height: 60, alignItems: 'center'},
  headerText: {fontStyle: 'KumbhSans-Regular', fontSize: 30,
    lineHeight: 30, fontWeight: 'normal'},
  text: {fontStyle: 'KumbhSans-Regular'},
  img: {width: 120, height: 120, marginTop: 10, marginBottom: 10, alignSelf: 'center'},
  smallLogo: {width: 43, height: 36},
  flexRow: {display: 'flex', flexDirection: 'row',
    justifyContent: 'space-between', height: 40,
    alignItems: 'center'},
  button: {height: 50, width: 250},
  buttonsContainer: {marginTop: 33, alignSelf: 'center'},
  column: {width: 150, justifyContent: 'space-between'},
})

export default InputScreen;
