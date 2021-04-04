import React from "react"
import {Text, TouchableOpacity, View} from "react-native"
import {DropdownIcon} from "./Dropdowns"
import {GreenDivider} from "./Dividers"
import {Meal} from "./Meal"
import common from '../common.style'

export const MealsDay = ({navigation, dayName, items}) => {
    function* mealGen() {
        const mealTypes = ['BREAKFAST', 'LUNCH', 'DINNER']
        while (true)
            for (let meal of mealTypes)
                yield meal
    }

    let gen = mealGen()
    return (
        <View>
            <TouchableOpacity style={common.flexRow} onPress={() => {}}>
                <Text style={{fontSize: 16, textTransform: 'capitalize', marginVertical: 10}}>
                    {dayName}
                </Text>
                <DropdownIcon/>
            </TouchableOpacity>
            <GreenDivider/>
            <View style={{marginVertical: 15}}>
                {items.map(({type, value, id}) => {
                    if (type === 'RECIPE') {
                        return <Meal
                            imageType={value.imageType}
                            title={value.title}
                            key={id}
                            navigation={navigation}
                            id={value.id}
                            mealType={gen.next().value}
                            type={type}
                        />
                    } else if (type === 'INGREDIENTS') {
                        let ingredient = value.ingredients[0]
                        console.log(ingredient)
                        return <Meal
                            title={ingredient.name}
                            key={id}
                            mealType={'SNACK'}
                            type={type}
                            id={id}
                            amount={ingredient.amount}
                            unit={ingredient.unit}
                            image={ingredient.image}
                        />
                    } else if (type === 'PRODUCT') {
                        return <Meal
                            title={value.title}
                            id={value.id}
                            key={id}
                            mealType={'SNACK'}
                            imageType={value.imageType}
                            type={type}
                        />
                    }
                })}
            </View>
        </View>
    )
}
