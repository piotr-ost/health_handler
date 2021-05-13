import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Sainsburys, ASDA, Tesco } from '../components/SupermarketCards'
import common from '../common.style'
import SmallLogo from '../components/SmallLogo'

const StartScreen = ({ navigation }) => {
  return (
    <View style={common.screen}>
      <View style={{marginTop: 90}} >
        <SmallLogo />
        <Text style={common.headingMain}>
          Let's get started!
        </Text>
        <Text style={[common.text, {marginTop: 5}]}>
          Select your preferred supermarket
        </Text>
        <View style={{height: 300, width: '100%'}}>
          <ScrollView 
            style={{flex: 1, flexDirection: 'row'}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <View style={{marginLeft: 10}}>
              <Sainsburys navigation={navigation} />
            </View>
            <View style={{marginLeft: 25}}>
              <ASDA navigation={navigation} />
            </View>
            <View style={{marginLeft: 25}}>
              <Tesco navigation={navigation} />
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  )
}

export default StartScreen
