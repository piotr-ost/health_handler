import React from "react";
import {Image, Text, View, StyleSheet} from "react-native";
import {Icon} from "react-native-elements";
import {ThinGrayDivider} from "./Dividers";
import common, {GREEN} from '../common.style'


export const Meal = ({navigation, id, imageType, title, mealType, amount, unit, type, image}) => {
    let uri
    if (type === 'INGREDIENTS')
        uri = image.replace('100x100', '250x250')
    else if (type === 'RECIPE')
        uri = `http://spoonacular.com/recipeImages/${id}-240x150.${imageType}`
    else if (type === 'PRODUCT')
        uri = `http://spoonacular.com/productImages/${id}-312x231.${imageType}`
    return (id && title &&
        <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={[common.flexRow, {paddingBottom: 6}]}>
                <Image style={styles.mealImage} source={uri ? {uri: uri} : {}}/>
                <View>
                    <Text style={styles.text}>{mealType}</Text>
                    {amount
                        ? <Text style={styles.mealLabel}>{title}: {amount} {unit}</Text>
                        : <Text style={styles.mealLabel}>{title}</Text>
                    }
                </View>
                <View style={common.flexRow}>
                    {navigation &&
                    <Icon
                        onPress={() => navigation.navigate('RecipeDetailsScreen', {
                            id: id,
                            uri: uri,
                            title: title
                        })}
                        type="font-awesome"
                        name="question"
                        color={GREEN}
                        size={15}
                        style={{marginRight: 5}}
                    />
                    }
                </View>
            </View>
            <ThinGrayDivider/>
        </View>
    )
}

const styles = StyleSheet.create({
    mealLabel: {
        width: 250,
        fontSize: 16
    },
    mealImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 8
    },
    text: {
        color: common.GREEN,
        fontSize: 11
    },
})