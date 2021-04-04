import React from "react";
import {ActivityIndicator, Text, View} from "react-native";
import common, {GREEN} from "../common.style";

export const MealPlanSpinner = () => {
    return (
        <View style={{justifyContent: 'space-around', alignItems: 'center'}}>
            <Text>Generating the meal plan...</Text>
            <ActivityIndicator
                color={GREEN}
                style={{padding: 30}}
            />
        </View>
    )
}

export const RecipeDetailsSpinner = () => {
    return (
        <View style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
            <Text>Fetching the recipe...</Text>
            <ActivityIndicator color={GREEN} style={{padding: 30}}/>
        </View>
    )
}

export const ShoppingListSpinner = () => {
    return (
        <View style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
            <Text>Generating the shopping list...</Text>
            <ActivityIndicator color={common.GREEN} style={{padding: 30}}/>
        </View>
    )
}
