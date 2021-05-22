import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import SmallLogo from '../components/SmallLogo'
import common from '../common.style'
import GreenButton from '../components/GreenButton'
import Icon from 'react-native-vector-icons/FontAwesome'
import MaskedView from '@react-native-masked-view/masked-view'
import { LinearGradient } from 'expo-linear-gradient'
import { ViewFullPlan } from '../components/ViewFullPlan'

export const GradientSwipeRight = () => {
  return (
    <View>
      <MaskedView maskElement={
        <Icon name={'arrow-right'} size={40} />
      }>
        <LinearGradient colors={['#5AD710', '#22E4CD']}>
          <Icon 
            name={'arrow-right'} 
            style={{opacity: 0}}
            size={40} 
          />
        </LinearGradient>
      </MaskedView>
    </View>
  )
}

export const GradientSwipeLeft = () => {
  return (
    <View>
      <MaskedView maskElement={
        <Icon name={'arrow-left'} size={40} />
      }>
        <LinearGradient colors={['#FF9191', '#FF4343']}>
          <Icon 
            name={'arrow-left'} 
            style={{opacity: 0}}
            size={40} 
          />
        </LinearGradient>
      </MaskedView>
    </View>
  )
}

const SwipeInstructionScreen = ({ route, navigation }) => {
  const { requirements } = route.params
  return (
    <View style={[common.screen, {justifyContent: ''}]}>
      <View style={[common.flexRow, {marginTop: 30}]}>
        <View>
          <Text style={common.headingMain}>
            Select your Meals!
          </Text>
          <Text style={[common.text, {fontSize: 14}]}>
            Welcome to Health Handler          
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
        <ViewFullPlan onPress={() => null} />
        <View style={styles.bottomRow}>
          <Icon 
            name={'arrow-left'} 
            size={40} 
            color={'red'}
          />
          <GradientSwipeRight />
        </View>
      </View>
      <View style={{marginTop: 25}}>
        <Text style={styles.instructionText}>
          <Text>
            You are now going to be presented with daily meal 
            plans suited to your requirements. 
            {'\n'}
            {'\n'}
          </Text>
          <Text>
            Please swipe right or left or click the arrows to choose your meals.
            {'\n'}
            {'\n'}
          </Text>
        </Text>
      </View>
      <View style={{marginTop: 35}}>
        <GreenButton 
          text={"Let's go!"} 
          onPress={() => navigation.navigate('SwipeScreen', {
            requirements: requirements
        })} 
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    marginTop: 15,
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
  },
  instructionText: {
    ...common.headingMain,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 15,
    flexShrink: 1,
    width: '88%',
    textAlign: 'justify',
    alignSelf: 'center'
  },
  bottomRow: {
    ...common.flexRow,
    marginTop: 10,
    width: '85%',
    alignSelf: 'center'
  },
  instructionRow: {
    ...common.flexRow,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginVertical: 15,
    width: 0,
    flexGrow: 1,
    flex: 1,
  },
  viewContainer: {
    alignSelf: 'center', 
    marginTop: 30, 
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: 'green',
    marginHorizontal: 25
  }
})

export default SwipeInstructionScreen
