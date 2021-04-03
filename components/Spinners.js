import React from "react";
import {ActivityIndicator, Text, View} from "react-native";
import {GREEN} from "../common.style";

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
