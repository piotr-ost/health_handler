import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import common from '../common.style'
import SmallLogo from '../components/SmallLogo'
import GreenButton from '../components/GreenButton'



const RequirementsScreen = ({ navigation }) => {
  const [requirements, setRequirements] = useState({
    vegetarian: false,
    vegan: false,
    lactoseFree: false,
    glutenFree: false
  })
  const go = () => {
    navigation.navigate('SwipeInstructionScreen', {
      requirements: requirements
    })
  }
  return (
    <View style={[common.screen, {justifyContent: ''}]}>
      <View style={{marginTop: 100}}>
        <SmallLogo />
        <Text style={common.headingMain}>
          Dietary Requirements
        </Text>
        <Text style={[common.text, {marginTop: 5}]}>
          Do you have any requirements?
        </Text>
      </View>
      <View style={{marginTop: 50}}>
        <Checkbox 
          text={'Vegetarian'} 
          value={requirements.vegetarian} 
          onPress={() => setRequirements({ 
            ...requirements, 
            vegetarian: !requirements.vegetarian 
          })}
        />
        <Checkbox 
          text={'Vegan'} 
          value={requirements.vegan} 
          onPress={() => setRequirements({ 
            ...requirements, 
            vegan: !requirements.vegan 
          })}
        />
        <Checkbox 
          text={'Lactose Free'} 
          value={requirements.lactoseFree} 
          onPress={() => setRequirements({ 
            ...requirements, 
            lactoseFree: !requirements.lactoseFree 
          })}
        />
        <Checkbox 
          text={'Gluten Free'} 
          value={requirements.glutenFree} 
          onPress={() => setRequirements({ 
            ...requirements, 
            glutenFree: !requirements.glutenFree 
          })}
        />
      </View>
      <View style={{marginTop: 100}}>
      <GreenButton 
        text={'Continue'} 
        onPress={go} 
      />
      </View>
    </View>
  )
}

const Checkbox = ({ text, value, onPress }) => {
  return (
    <View>
      {
        value 
          ?  
          <TouchableOpacity style={styles.rowContainer} onPress={onPress}>
            <View style={styles.checkedBox}>
              <Image source={require('../assets/check.png')} />
            </View>
            <View style={{marginLeft: 30}}>
              <Text style={common.text}>
                {text} 
              </Text>
            </View>
          </TouchableOpacity>
          :
          <TouchableOpacity style={styles.rowContainer} onPress={onPress}>
            <View style={styles.box} />
            <View style={{marginLeft: 30}}>
              <Text style={common.text}>
                {text} 
              </Text>
            </View>
          </TouchableOpacity>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  rowContainer: {
    ...common.flexRow,
    justifyContent: 'flex-start',
    width: 150,
    marginTop: 25,
    marginLeft: 15
  },
  checkedBox: {
    width: 28,
    height: 28,
    borderColor: '#5AD710',
    borderWidth: 2,
    borderRadius: 6,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    width: 28,
    height: 28,
    borderColor: '#DCDCDC',
    borderWidth: 2,
    borderRadius: 6,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default RequirementsScreen 
