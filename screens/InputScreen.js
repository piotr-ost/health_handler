import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Slider } from '../components/Slider'
import { GreenDivider } from "../components/Dividers"
import { Dropdowns, DropdownIcon } from "../components/Dropdowns"
import { HealthHandlerHeader } from '../components/Headers'
import { CheckBox } from "react-native-elements"
import { Button } from 'react-native'
import { addToUserPlan, getUserPlan } from '../ApiCalls'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height
const GREEN = '#6FBF44'


const DropdownSection = () => {
  return (
    <View>
      <View style={styles.flexRow}>
        <Text>View existing meal plans</Text>
        <DropdownIcon />
      </View>
      <GreenDivider />
      <View style={styles.flexRow}>
        <Text>Create a new meal plan:</Text>
      </View>
      <Dropdowns onPress={() => {}} text="Select a supermarket..." type="wide" />
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
  const handleClick = async () => {
      setWaiting(true)
      try {
          const userJson = await AsyncStorage.getItem('user1')
          const user = JSON.parse(userJson)
          if (user) {
              const {username, hash} = user
              const addedToUserPlan = await AsyncStorage.getItem('addedToPlan')
              if (!addedToUserPlan) {
                  await addToUserPlan(username, hash)
                  await AsyncStorage.setItem('addedToPlan', 'true')
              }
              getUserPlan(user.username, user.hash).then(r => {
                  navigation.navigate("MealPlanScreen", {
                      data: r.data,
                      user: user,
                      userInput: {
                          userData: userData,
                          price: price,
                          time: time,
                          calories: calories,
                      }
                  })
                  setWaiting(false)
              }).catch(e => console.log(e))
          }
      } catch (e) {
          console.log(e)
      }
  }
  return (
    <View style={styles.screen}>
       <HealthHandlerHeader />
       <DropdownSection />
      <View>
        <View style={{ padding: 10 }}>
          <Slider value={price} minValue={1} maxValue={20} step={0.05}
                  onValueChange={(value) => setPrice(value)} unit={'$/meal'}/>
          <Slider value={time} minValue={15} maxValue={100} step={1}
                  onValueChange={(value) => setTime(value)} unit={'minutes'}/>
          <Slider value={calories} minValue={1500} maxValue={4000} step={50}
                  onValueChange={(value) => setCalories(value)} unit={'kcal'} />
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
          <Button onPress={handleClick}
                  title={!waiting ? "Create plan" : "Sending..."}
                  color={GREEN} style={styles.button} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      display: 'flex',
      justifyContent: 'space-around',
      paddingHorizontal: 27,
      paddingTop: 10
  },
  flexRow: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 40,
      alignItems: 'center'
  },
  button: { height: 50, width: 250 },
  buttonsContainer: { marginTop: 33, alignSelf: 'center' },
  column: { width: 150, justifyContent: 'space-between' }
})

export default InputScreen;
