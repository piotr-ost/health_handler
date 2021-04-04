import React from 'react'
import {Text, View, StyleSheet} from 'react-native'
import {ThinGrayDivider} from './Dividers'
import {GREEN} from '../common.style'

export default ({extendedIngredients}) => {
    return (
        <View>
            <ThinGrayDivider />
            <View style={styles.recipeIngredients}>
                {extendedIngredients.map(({name, amount, unit}) =>
                    <Ingredient key={name} name={name} amount={amount} unit={unit} />
                )}
            </View>
            <ThinGrayDivider />
        </View>
    )
}

const Ingredient = ({amount, unit, name}) => {
    if (unit === 'teaspoon')
        unit = 'tsp'
    if (unit === 'pound')
        unit = 'lbs'
    if (unit === '')
        unit = 'x'
    return (
        <View style={styles.ingredient}>
            <Text>
                <Text style={{color: GREEN}}>{amount} {unit} </Text>
                <Text>{name}</Text>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    recipeIngredients: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    ingredient: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%'
    }
})