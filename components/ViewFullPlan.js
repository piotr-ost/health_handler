import React from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native'
import common from '../common.style'
import MaskedView from '@react-native-masked-view/masked-view'
import { LinearGradient } from 'expo-linear-gradient'

export const ViewFullPlan = ({ onPress }) => {
  return (
    <View>
      <TouchableOpacity 
        style={styles.viewContainer} 
        onPress={onPress}
      >
        <MaskedView maskElement={
          <Text style={styles.clickyText}>View full plan</Text>
        }>
          <LinearGradient colors={['#5AD710', '#22E4CD']}>
            <Text style={[styles.clickyText, {opacity: 0}]}>
              View full plan
            </Text>
          </LinearGradient>
        </MaskedView>
        <Image source={require('../assets/down.png')} style={{marginLeft: 10}} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
 viewContainer: {
   alignSelf: 'center', 
   marginTop: 35, 
   flexDirection: 'row',
   alignItems: 'center'
 },  
  clickyText: {
    ...common.text,
    fontSize: 14, 
    lineHeight: 17, 
  }
})

export default ViewFullPlan
