import React from "react"
import {Image, Text, View, StyleSheet} from "react-native"
import {GrayDivider} from "./Dividers"
import {ReturnButton, ShoppingListButton} from "./Buttons";
import common from '../common.style'
import {Icon} from "react-native-elements";

export const HealthHandlerHeader = () => {
    return (
        <View>
            <View style={common.header}>
                <Text style={styles.headerText}>Health Handler</Text>
                <Image source={require('../assets/logo.png')} style={styles.smallLogo}/>
            </View>
            <GrayDivider/>
        </View>
    )
}

export const MealPlanHeader = ({navigation, user}) => {
    return (
        <View>
            <View style={common.header}>
                <ReturnButton onPress={() => navigation.navigate('InputScreen')}/>
                <Text style={{fontSize: 30}}>Meal Plan</Text>
                <ShoppingListButton onPress={() => navigation.navigate('ShoppingListScreen', {user: user})}/>
            </View>
            <GrayDivider/>
        </View>
    )
}

export const RecipeHeader = ({navigation}) => {
    return (
        <View>
            <View style={common.header}>
                <ReturnButton onPress={() => {navigation.goBack()}} />
                <Text>Recipe</Text>
                <View />
            </View>
            <GrayDivider/>
        </View>
    )
}

export const ShoppingListHeader = ({navigation}) => {
    return  (
        <View>
            <View style={common.header}>
                <ReturnButton
                    navigation={navigation}
                    onPress={() => navigation.navigate('MealPlanScreen')}
                />
                <Text style={{fontSize: 30}}>Shopping list</Text>
                <Icon
                    onPress={() => {}}
                    type='font-awesome'
                    name='floppy-o'
                    color='#4EB849'
                />
            </View>
            <GrayDivider/>
        </View>
    )
}

export const ConsumptionHeader = ({navigation}) => {
    return (
        <View>
            <View style={common.header}>
                <ReturnButton onPress={() => navigation.navigate("ShoppingListScreen")}/>
                <Text style={{fontSize: 24}}>Weekly consumption</Text>
                <Text />
            </View>
            <GrayDivider />
        </View>
    )
}

const styles = StyleSheet.create({
    smallLogo: {
        width: 43,
        height: 36
    },
    headerText: {
        fontSize: 30,
        lineHeight: 30,
        fontWeight: 'normal'
    }
})
