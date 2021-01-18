import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ReturnButton} from "../components/Buttons.js";
import {GrayDivider, GreenDivider} from "../components/Dividers.js";
import {Icon} from "react-native-elements";

const SCREEN_WIDTH = 375;
const SCREEN_HEIGHT = 812
const GREEN = '#6FBF44'

const placeholderData = {calories: '1780kcal', protein: '80g', vitamins: '100%'}

const InfoEntry = ({label, value}) => {
  return (
    <View style={{marginVertical: 15}}>
      <Text style={[{textTransform: 'capitalize', marginBottom: 7}, styles.text]}>{label}:</Text>
      <GreenDivider />
      <Text style={styles.valueText}>{value}</Text>
    </View>
  )
}

const ConsumptionScreen = ({navigation}) => {
  return (
    <View style={styles.screen}>
      <View>
        <View style={styles.header}>
          <ReturnButton onPress={() => navigation.navigate("ShoppingListScreen")}/>
          <Text style={{fontSize: 24}}>Weekly consumption</Text>
          <Text></Text>
        </View>
        <GrayDivider />
      </View>
      <View>
        {Object.entries(placeholderData).map(([label, value]) =>
          <InfoEntry label={label} value={value} key={label} />
        )}
      </View>
      <View>
        <TouchableOpacity style={styles.shareAndFeedback}>
          <Icon type="font-awesome" name="share-alt" color={GREEN} size={58}></Icon>
          <Text style={styles.text}>Share your meal prep journey</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareAndFeedback}>
          <Icon type="font-awesome" name="star" color={GREEN} size={58}></Icon>
          <Text style={styles.text}>Please let us know how we did</Text>
        </TouchableOpacity>
      </View>
      <View style={{display: 'flex', height: 134, alignItems: 'center',
        backgroundColor: GREEN, justifyContent: 'center', marginBottom: 10}}>
          <Text style={{fontStyle: 'KumbhSans-Regular', fontSize: 60, color: 'white'}}>
            0.5kg
          </Text>
          <Text style={{fontStyle: 'KumbhSans-Regular', fontSize: 12, color: 'white',
            marginTop: 5}}> Expected weight loss </Text>
      </View>
    </View>
    )
}

const styles = StyleSheet.create({
  screen: {display: 'flex', justifyContent: 'space-between',
    width: SCREEN_WIDTH, height: SCREEN_HEIGHT,
    paddingVertical: 10, paddingHorizontal: 27},
  text: {fontStyle: 'KumbhSans-Regular', fontSize: 18},
  valueText: {fontStyle: "KumbhSans-Regular", fontWeight: '700', fontSize: 48,
    lineHeight: 48, color: '#6ABE45'},
  header: {display: 'flex', flexDirection: 'row', height: 60, alignItems: 'center',
    justifyContent: 'space-around'},
  headerText: {fontFamily: 'KumbhSans-Regular', fontSize: 24, lineHeight: 24},
  shareAndFeedback: {height: 58, display: 'flex', flexDirection: 'row',
    alignItems: 'center', justifyContent: 'space-around', marginVertical: 10}
})

export default ConsumptionScreen;
