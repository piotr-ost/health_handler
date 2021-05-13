import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import SmallLogo from '../components/SmallLogo'
import common from '../common.style'
import GreenButton from '../components/GreenButton'


const SwipeInstructionScreen = ({ navigation }) => {
  return (
    <View style={[common.screen, {justifyContent: ''}]}>
      <View style={[common.flexRow, {marginTop: 50}]}>
        <View>
          <Text style={common.headingMain}>
            Select your Meals!
          </Text>
          <Text style={[common.text, {fontSize: 14}]}>
            Welcome to Health Handler, <Text style={{color: 'green'}}>username</Text>
          </Text>
        </View>
        <SmallLogo width={39} height={33} />
      </View>
      <View style={styles.card}>
        <Text style={styles.subText}>Creator's name</Text>
        <Text style={styles.headingText}>Example Meal Plan Title</Text>
        <Text style={styles.descriptionText}>
          Description provided by the creator of the meal plan showed on screen.
        </Text>
        <TouchableOpacity style={styles.viewContainer} onPress={() => {}}>
          <Text style={styles.clickyText}>View full plan</Text>
          <Image source={require('../assets/down.png')} style={{marginLeft: 10}} />
        </TouchableOpacity>
        <View style={styles.bottomRow}>
          <Image source={require('../assets/dislike.png')} />
          <Image source={require('../assets/report.png')} />
          <Image source={require('../assets/share.png')} />
          <Image source={require('../assets/like.png')} />
        </View>
      </View>
      <View style={{marginTop: 25}}>
        <Instruction source={require('../assets/like.png')} text={'Add to my week!'} />
        <Instruction source={require('../assets/report.png')} text={'Report'} />
        <Instruction source={require('../assets/share.png')} text={'Share'} />
        <Instruction source={require('../assets/dislike.png')} text={'Not interested...'} />
      </View>
      <View style={{marginTop: 30}}>
        <GreenButton text={"Let's go!"} onPress={() => navigation.navigate()} />
      </View>
    </View>
  )
}

const Instruction = ({ source, text }) => {
  return (
    <View style={styles.instructionRow}>
      <Image 
        source={source} 
      style={[
        text === 'Report' || text === 'Share' ? { marginLeft: 15 } : {}
      ]} 
      />
      <Text style={styles.instructionText}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    marginTop: 35,
    borderRadius: 20,
    width: '90%',
    height: 268,
    shadowOffset: {
      width: 1,
      height: 3
    },  
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 5,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#ffffff',
    alignSelf: 'center'
  },
  subText: {
    ...common.text,
    fontSize: 14,
    lineHeight: 16,
    color: '#858585'
  },
  headingText: {
    ...common.headingMain,
    fontSize: 21,
    lineHeight: 29,
    marginTop: 9
  },
  descriptionText: {
    ...common.text,
    fontSize: 12,
    lineHeight: 17,
  },
  clickyText: {
    ...common.text,
    fontSize: 12,
    lineHeight: 17,
    color: 'green'
  },
  instructionText: {
    ...common.headingMain,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 0,
    position: 'absolute',
    marginLeft: 80
  },
  viewContainer: {
    alignSelf: 'center', 
    marginTop: 35,
    flexDirection: 'row',
    alignItems: 'center'
  },
  bottomRow: {
    ...common.flexRow,
    marginTop: 10
  },
  instructionRow: {
    ...common.flexRow,
    justifyContent: 'flex-start',
    marginTop: 20
  },

})

export default SwipeInstructionScreen
