import React from "react"
import {SafeAreaView, ScrollView, View} from "react-native"
import {MealsDay} from "./MealsDay"

export default ({mealPlan, navigation, days}) => {
    return (
        <View>
            <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {mealPlan.map(({items}, index) => {
                        return <MealsDay
                            navigation={navigation}
                            dayName={days[index]}
                            items={items}
                            key={days[index]}
                        />
                    })}
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}
