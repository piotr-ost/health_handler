import React, {useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import GreenButton from '../components/Button';
import {Picker, Item, TextField, Flex} from '@adobe/react-spectrum';

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
    <View style={{flex: 1, display: 'flex', alignItems: 'center', flexDirection: 'column', padding: 10}}>
      <Text>Begin your journey</Text>
      <View style={{width: 321, height: 1, border: 2, borderStyle: 'solid', borderColor: '#848484'}}></View>
      <Image source={require('../assets/undraw_fitness_stats_sht6 1.png')} style={{height:207, width:318}}/>
      <Picker placeholder="View saved meal plans">
        {mealPlans.map((mealPlan) => <Item key={mealPlan}>{mealPlan}</Item>)}
      </Picker>
      <Flex direction="column">
        <Text>Create a new meal plan</Text>
        <Picker onSelectionChange={setGender} placeholder="Select your supermarket">
          <Item key="male">Male</Item>
          <Item key="female">Female</Item>
        </Picker>
        <Flex direction="column" >
          <TextField onChange={setAge} placeholder="Age"
                     validationState={isValid ? 'valid' : 'invalid'}>
          </TextField>
          <Picker placeholder="Gender" onSelectionChange={setGender}>
            <Item key="male">Male</Item>
            <Item key="female">Female</Item>
          </Picker>
          <Picker placeholder="Weight" onSelectionChange={setWeight}>
            <Item key="weight">Weight</Item>
          </Picker>
          <Picker placeholder="Height" onSelectionChange={setHeight} style={{width: 144, height: 28}}>
            <Item key="height">Height</Item>
          </Picker>
        </Flex>
        <GreenButton title="Weight Gain"></GreenButton>
        <GreenButton title="Weight Loss"></GreenButton>
      </Flex>
    </View>
  )
}

const styles = StyleSheet.create({
  picker: {
    width: 144,
    height: 28
  }
})

export default InputScreen;
