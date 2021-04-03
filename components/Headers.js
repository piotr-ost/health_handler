import React from "react"
import {Image, Text, View, StyleSheet} from "react-native"
import {GrayDivider} from "./Dividers"
import {ReturnButton, ShoppingListButton} from "./Buttons";
import common from '../common.style'

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
