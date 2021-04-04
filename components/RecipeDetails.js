import React from "react";
import {Image, Text, View, StyleSheet} from "react-native";
import {DairyIcon, GlutenIcon, VeganIcon, VegetarianIcon} from "./Icons";
import common from '../common.style'

export default ({title, uri, vegetarian, vegan, glutenFree, dairyFree}) => {
    return (
        <View style={styles.recipeDetails}>
            <Image source={{uri: uri}} style={styles.recipeImage} />
            <Text style={styles.title}>{title}</Text>
            <View style={common.flexRow}>
                <VegetarianIcon vegetarian={vegetarian} />
                <VeganIcon vegan={vegan} />
                <GlutenIcon gluten={glutenFree} />
                <DairyIcon dairy={dairyFree} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    recipeDetails: {
        alignItems: 'center',
        marginVertical: 20
    },
    recipeImage: {
        width: 100,
        height: 100,
        borderRadius: 60
    },
    title: {fontWeight: '500'}
})
