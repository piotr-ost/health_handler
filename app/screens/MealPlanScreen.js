import React, {useState, useEffect} from 'react'
import {View} from 'react-native'
import {MealPlanHeader} from '../components/Headers'
import MealPlanView from '../components/MealPlanView'
import {MealPlanSpinner} from '../components/Spinners'
import common from '../common.style'


const MealPlanScreen = ({route, navigation}) => {
    const [mealPlan, setMealPlan] = useState(null);
    let days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    const dayToday = new Date().getDay() - 1 // sunday is 0
    days = [...days.slice(dayToday), ...days.slice(0, dayToday)]
    const {data, user} = route.params
    useEffect(() => {
        setMealPlan(data?.days)
    }, []);

    return (
        <View style={common.screen}>
            <MealPlanHeader navigation={navigation} user={user} />
                {mealPlan
                    ? <MealPlanView
                        mealPlan={mealPlan}
                        navigation={navigation}
                        days={days}
                    />
                    : <MealPlanSpinner />
                }
        </View>
    )
}

export default MealPlanScreen
