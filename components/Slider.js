import React from "react"
import { Text, View } from "react-native"
import { Slider as Slider_ } from "react-native-elements"


const GREEN = '#6FBF44'

export const Slider = ({ value, minValue, maxValue, step, onValueChange, unit }) => {
    return (
        <View>
            <Slider_
                value={value}
                minimumValue={minValue}
                maximumValue={maxValue}
                step={step}
                onValueChange={onValueChange}
                thumbStyle={{ height: 20, width: 20, backgroundColor: GREEN }}
                trackStyle={{ backgroundColor: 'transparent' }}
            />
            <Text style={{ alignSelf: 'center' }}>{value} {unit}</Text>
        </View>
    )
}
