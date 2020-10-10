import React, {useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import GreenButton from '../components/Button';
import {Picker, Item, TextField, Divider} from '@adobe/react-spectrum';

const InputScreen = () => {
  let mealPlans = ['MealPlan1']  // for now
  let markets = ["Sainsbury's", "Tesco"]

  const [age, setAge] = useState('Age')
  let isValid = React.useMemo(
    () => /^[1-9][0-9]?$|^100$/.test(age),
    [age]
  )
  const [plan, setPlan] = useState('View saved meal plans')
  const [market, setMarket] = useState('')
  const [height, setHeight] = useState(0)
  const [gender, setGender] = useState(0)
  const [weight, setWeight] = useState(0)
  return (
    <View style={{flex: 1, display: 'flex', alignItems: 'center', paddingHorizontal: 25, paddingVertical: 30}}>
      <Text>Health Handler</Text>
      <Divider></Divider>
      <Picker placeholder="View saved meal plans" width="size-3000">
        {mealPlans.map((mealPlan) => <Item key={mealPlan}>{mealPlan}</Item>)}
      </Picker>
      <Image source={require('../assets/undraw_cooking_lyxy 1.png')} style={{width: 133, height: 138}}/>
      <Text>Create a new meal plan</Text>
      <Picker onSelectionChange={setMarket} placeholder="Select your supermarket">
        {markets.map((market) => <Item children={market}></Item>)}
      </Picker>
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
          <TextField onChange={setAge} placeholder="Age" validationState={isValid ? 'valid' : ''} width="size-1200">
          </TextField>
          <Picker placeholder="Gender" onSelectionChange={setGender} width="size-1200">
            <Item key="male">Male</Item>
            <Item key="female">Female</Item>
          </Picker>
          <GreenButton title="Weight Gain"></GreenButton>
        </View>
        <View style={{display: 'flex', flexDirection: 'column'}}>
          <Picker placeholder="Weight" onSelectionChange={setWeight} width="size-1200">
            <Item key="weight">Weight</Item>
          </Picker>
          <Picker placeholder="Height" onSelectionChange={setHeight} width="size-1200">
            <Item key="height">Height</Item>
          </Picker>
          <GreenButton title="Weight Loss"></GreenButton>
        </View>
      </View>
    </View>
  )
}

export default InputScreen;
