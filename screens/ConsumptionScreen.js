import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import {ReturnButton} from "../components/Buttons.js";
import {GrayDivider, GreenDivider} from "../components/Dividers.js";
import {Icon} from "react-native-elements";

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height
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

const Header = ({navigation}) => {
    return (
        <View>
          <View style={styles.header}>
            <ReturnButton onPress={() => navigation.navigate("ShoppingListScreen")}/>
            <Text style={{fontSize: 24}}>Weekly consumption</Text>
            <Text />
          </View>
          <GrayDivider />
        </View>
    )
}

const ConsumptionScreen = ({navigation}) => {
  return (
    <View style={styles.screen}>
        <Header navigation={navigation}/>
      <View>
        {Object.entries(placeholderData).map(([label, value]) =>
          <InfoEntry label={label} value={value} key={label} />
        )}
      </View>
      <View>
        <TouchableOpacity style={styles.shareAndFeedback}>
          <Icon type="font-awesome" name="share-alt" color={GREEN} size={58} />
          <Text style={styles.text}>Share your meal prep journey</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareAndFeedback}>
          <Icon type="font-awesome" name="star" color={GREEN} size={58} />
          <Text style={styles.text}>Please let us know how we did</Text>
        </TouchableOpacity>
      </View>
      <View style={{display: 'flex', height: 134, alignItems: 'center',
        backgroundColor: GREEN, justifyContent: 'center', marginBottom: 10}}>
          <Text style={{fontSize: 60, color: 'white'}}>
            0.5kg
          </Text>
          <Text style={{fontSize: 12, color: 'white',
            marginTop: 5}}> Expected weight loss </Text>
      </View>
    </View>
    )
}

const styles = StyleSheet.create({
  screen: {display: 'flex', justifyContent: 'space-between',
    width: SCREEN_WIDTH, height: SCREEN_HEIGHT,
    paddingVertical: 10, paddingHorizontal: 27},
  text: {fontSize: 18},
  valueText: {fontWeight: '700', fontSize: 48,
    lineHeight: 48, color: '#6ABE45'},
  header: {display: 'flex', flexDirection: 'row', height: 60, alignItems: 'center',
    justifyContent: 'space-around'},
  headerText: {fontSize: 24, lineHeight: 24},
  shareAndFeedback: {height: 58, display: 'flex', flexDirection: 'row',
    alignItems: 'center', justifyContent: 'space-around', marginVertical: 10}
})

export default ConsumptionScreen;
