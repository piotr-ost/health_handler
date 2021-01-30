import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, useWindowDimensions, Dimensions} from 'react-native';
import {ReturnButton} from "../components/Buttons";
import {Icon} from 'react-native-elements';
import {GrayDivider} from "../components/Dividers";
// import axios from 'axios';

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height
const GREEN = '#6FBF44'

const Product = () => {}

const ShoppingListScreen = ({navigation}) => {
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
      <Text style={{alignSelf: 'center'}}># TODO</Text>
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
  text: {fontStyle: 'KumbhSans-Regular'}
});

export default ShoppingListScreen;
