import React from "react";
import {Image, Text, View, StyleSheet} from "react-native";
import {GreenDivider} from "./Dividers";


export const Product = ({name, imgUrl, amount, unit, price}) => {
    let mainText = name.charAt(0).toUpperCase() + name.slice(1)
    return (
        <View>
            <View style={{flexDirection: 'row'}}>
                <Image source={{uri: imgUrl}} style={styles.productImage} />
                <View style={{display: 'flex', justifyContent: 'space-around', padding: 10}}>
                    <Text style={styles.mainText}>{mainText}</Text>
                    <Text>
                        <Text>Quantity: {amount}{unit} {'\t'}</Text>
                        <Text>Price: {Math.round(price) / 100}£</Text>
                    </Text>
                </View>
            </View>
            <GreenDivider />
        </View>
    )
}

const styles = StyleSheet.create({
    productImage: {
        width: 80,
        height: 80,
        marginRight: 5
    },
    mainText: {
        fontSize: 16,
        width: 280,
        fontWeight: '600'
    }
})