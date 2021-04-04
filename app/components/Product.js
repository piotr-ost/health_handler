import React from "react";
import {Image, Text, View, StyleSheet} from "react-native";
import {GreenDivider} from "./Dividers";


export const Product = ({ id, name, measures, cost }) => {
    // TODO this has to be implemented in a scroll-down view
    const unit = measures.metric?.unit !== 1 ? measures.metric?.unit : ''
    const measure = measures.metric?.amount.toString() + unit
    const img = name.split(' ').join('-')
    const uri = `http://spoonacular.com/cdn/ingredients_100x100/${img}.jpg`
    console.log(uri)
    return (
        <View>
            <View style={{flexDirection: 'row'}}>
                <Image source={{uri: uri}} style={styles.productImage} />
                <View>
                    <Text>{name}</Text>
                    <Text>
                        <Text>Quantity: {measure} {'\t'}</Text>
                        <Text>Price: {Math.round(cost) / 100}$</Text>
                    </Text>
                </View>
            </View>
            <GreenDivider />
        </View>
    )
}

const styles = StyleSheet.create({
    productImage: {
        width: 30,
        height: 30,
        borderRadius: 30,
        marginRight: 5
    }
})