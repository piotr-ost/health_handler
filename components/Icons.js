import {Icon} from 'react-native-elements'
import {Text, View} from "react-native";
import React from "react";

const GREEN = '#6FBF44';

const VegetarianIcon = ({vegetarian}) => {
  return vegetarian ?
    <Icon name='leaf' type='font-awesome-5' color={GREEN} /> : <Icon name='leaf' type='font-awesome-5' />
}

const VeganIcon = ({vegan}) => {
  const style = {flexDirection: 'row', alignItems: 'center'}
  return (
    vegan ?
      <View style={style}>
        <VegetarianIcon vegetarian={vegan} /><Text style={{marginLeft: 4, color: GREEN}}>VE</Text>
      </View> :
      <View style={style}>
        <VegetarianIcon vegetarian={vegan} /><Text style={{marginLeft: 4}}>VE</Text>
      </View>
  )
}

const GlutenIcon = ({gluten}) => {
  return gluten ? <Icon name={'bread-slice'} type={'font-awesome-5'} color={GREEN} />
  : <Icon name={'bread-slice'} type={'font-awesome-5'} />
}

const DairyIcon = ({dairy}) => {
  return dairy ? <Icon name={'cow'} type={'material-community'} color={GREEN} />
  : <Icon name={'cow'} type={'material-community'} />
}

export {DairyIcon, GlutenIcon, VegetarianIcon, VeganIcon}
