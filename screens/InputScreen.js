import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {GrayDivider, GreenDivider} from "../components/Dividers";
import {Icon, CheckBox} from "react-native-elements";
import {Button} from 'react-native';  // for now

const SCREEN_WIDTH = 375
const SCREEN_HEIGHT = 812
const GREEN = '#6FBF44'

const DropdownIcon = () => {
  return <Icon type="font-awesome" name="caret-down" color={GREEN} />;
}

const Dropdown = ({text, onPress, type}) => {
  return (
    <TouchableOpacity
      style={{
        display: 'flex', flexDirection: 'row',  borderRadius: 3,
        justifyContent: 'space-between', padding: 6,
        borderColor: GREEN, borderWidth: 1, height: 35, marginTop: 20
      }}
      onPress={onPress}>
      <Text>{text}</Text>
      <DropdownIcon />
    </TouchableOpacity>
  );
}

const UnitSelector = ({measured}) => {
  const [clicked, setClicked] = useState(false);
  let metric, imperial;
  if (measured === 'height') {
    [metric, imperial] = ['Cm', 'Ft'];
  } else {
    [metric, imperial] = ['Kg', 'lbs'];
  }
  const roundLeft = {borderBottomLeftRadius: 5, borderTopLeftRadius: 5}
  const roundRight = {borderBottomRightRadius: 5, borderTopRightRadius: 5}
  return (
    <View style={{display: 'flex', marginBottom: 15, flexDirection: 'row',
      justifyContent: 'space-between', marginTop: 10}}>
      <TouchableOpacity disabled={clicked} style={[{flex: 1}, roundLeft, clicked ?
        {backgroundColor: GREEN}
        : {backgroundColor: 'white', borderColor: GREEN, borderWidth: 1}]
      } onPress={() => setClicked(!clicked)}>
        <Text style={[{alignSelf: 'center'}, clicked ?
          {color: 'white'} : {color: GREEN}]}>{metric}</Text>
      </TouchableOpacity>
      <TouchableOpacity disabled={!clicked} style={[{flex: 1}, roundRight, clicked ?
        {backgroundColor: 'white', borderColor: GREEN, borderWidth: 1}
        : {backgroundColor: GREEN}]
      } onPress={() => setClicked(!clicked)}>
        <Text style={[{alignSelf: 'center'}, clicked ?
          {color: GREEN} : {color: 'white'}]}>{imperial}</Text>
      </TouchableOpacity>
    </View>
    );
}

const SavedPlansDropdown = () => {
  return (
    <View>
      <View style={styles.flexRow}>
        <Text>View saved meal plans</Text>
        <DropdownIcon />
      </View>
      <GreenDivider />
    </View>
  );
}

const InputScreen = () => {
  const [userData, setUserData] = useState({
    vegetarian: false,
    vegan: false,
    nutFree: false,
    halal: false,
    lactoseFree: false,
    fishAllergy: false
  });
  return (
    <View style={styles.screen}>
       <View style={styles.header}>
         <Text style={styles.headerText}>Health Handler</Text>
         <Image source={require('../assets/logo.png')} style={styles.smallLogo} />
       </View>
       <GrayDivider />
       <SavedPlansDropdown />
       <View style={styles.flexRow}>
         <Text>Create a new meal plan</Text>
       </View>
       <GreenDivider />
       <View>
         <Image source={require('../assets/undraw_cooking_lyxy 1.png')}
                style={{width: 153, height: 158, marginBottom: 20, alignSelf: 'center'}} />
       </View>
      <Dropdown onPress={() => {}} text="Select a supermarket..." type="wide" />
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: "space-between"}}>
        <View style={styles.column}>
          <Dropdown onPress={() => {}} text="Age"></Dropdown>
          <Dropdown onPress={() => {}} text="Height"></Dropdown>
          <UnitSelector measured="height" />
          <CheckBox checked={userData.vegetarian} title="Vegetarian"
                    checkedColor={GREEN} onPress={() => setUserData(
                      {...userData, vegetarian: !userData.vegetarian})} />
          <CheckBox checked={userData.nutFree} title="Nut free"
                    checkedColor={GREEN} onPress={() => setUserData(
            {...userData, nutFree: !userData.nutFree})} />
          <CheckBox checked={userData.halal} title="Halal"
                    checkedColor={GREEN} onPress={() => setUserData(
            {...userData, halal: !userData.halal})} />
          <Button onPress={() => {}} title="Weight loss"
                 color={GREEN} style={styles.button} />
        </View>
        <View style={styles.column}>
          <Dropdown onPress={() => {}} text="Gender"></Dropdown>
          <Dropdown onPress={() => {}} text="Weight"></Dropdown>
          <UnitSelector measured="weight" />
          <CheckBox checked={userData.vegan} title="Vegan"
                    checkedColor={GREEN} onPress={() => setUserData(
            {...userData, vegan: !userData.vegan})} />
          <CheckBox checked={userData.lactoseFree} title="Nut free"
                    checkedColor={GREEN} onPress={() => setUserData(
            {...userData, lactoseFree: !userData.lactoseFree})} />
          <CheckBox checked={userData.fishAllergy} title="No fish"
                    checkedColor={GREEN} onPress={() => setUserData(
            {...userData, fishAllergy: !userData.fishAllergy})} />
          <Button onPress={() => {}} title="Weight gain"
                  color={GREEN} style={styles.button} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {display: 'flex', width: SCREEN_WIDTH, height: SCREEN_HEIGHT,
    justifyContent: 'flex-start', alignContent: 'space-around',
    padding: 27, borderWidth: 1, borderColor: 'gray'},
  header: {display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
    height: 60, alignItems: 'center'},
  headerText: {fontFamily: 'Kumbh Sans', fontStyle: 'normal', fontSize: 30,
    lineHeight: 30, fontWeight: 'normal'},
  unitSelector: {},
  smallLogo: {width: 43, height: 36},
  flexRow: {display: 'flex', flexDirection: 'row',
    justifyContent: 'space-between', height: 40,
    alignItems: 'center'},
  button: {height: 43, textColor: 'white'},
  column: {width: 150, justifyContent: 'space-between'}
})

// TODO
//  add text styling to all
//  add dropdown menu items
//  integrate api

export default InputScreen;
