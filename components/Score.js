import {Text, View} from "react-native";
import {ThinGrayDivider} from "./Dividers";
import {GREEN} from '../common.style'
import React from "react";

export default ({healthScore}) => {
    return (
        <View style={{width: '100%'}}>
            <Text>HealthHandler score:</Text>
            <Text>
                <Text style={{color: GREEN, fontSize: 40, fontWeight: '700'}}>{healthScore}</Text>
                <Text style={{color: GREEN, fontSize: 25, fontWeight: '500'}}> / 100</Text>
                <Text style={{color: 'gray', fontSize: 10, position: 'absolute', right: 0, bottom: 0, marginBottom: 10}}>
                    Courtesy of Spoonacular
                </Text>
            </Text>
            <ThinGrayDivider />
        </View>
    )
}
