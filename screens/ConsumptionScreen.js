import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ConsumptionHeader} from '../components/Headers'
import {GreenDivider} from "../components/Dividers"
import {Icon} from "react-native-elements";
import common, {GREEN} from '../common.style'

const placeholderData = {
    calories: '1780kcal',
    protein: '80g',
    vitamins: '100%'
}

const InfoEntry = ({label, value}) => {
  return (
    <View style={{marginVertical: 15}}>
      <Text style={{textTransform: 'capitalize'}}>{label}:</Text>
      <GreenDivider />
      <Text style={styles.valueText}>{value}</Text>
    </View>
  )
}

const ConsumptionScreen = ({navigation}) => {
  return (
    <View style={common.screen}>
        <ConsumptionHeader navigation={navigation}/>
      <View>
        {Object.entries(placeholderData).map(([label, value]) =>
          <InfoEntry label={label} value={value} key={label} />
        )}
      </View>
      <View>
        <TouchableOpacity style={styles.shareAndFeedback}>
          <Icon
              type="font-awesome"
              name="share-alt"
              color={GREEN}
              size={58}
          />
          <Text style={styles.text}>Share your meal prep journey</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareAndFeedback}>
          <Icon
              type="font-awesome"
              name="star"
              color={GREEN}
              size={58}
          />
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
  valueText: {
      fontWeight: '700',
      fontSize: 48,
      lineHeight: 48,
      color: '#6ABE45'
  },
  header: {
      display: 'flex',
      flexDirection: 'row',
      height: 60,
      alignItems: 'center',
      justifyContent: 'space-around'
  },
  shareAndFeedback: {
      height: 58,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginVertical: 10
  }
})

export default ConsumptionScreen;
