import React, {useState} from 'react'
import {View} from 'react-native'
import {CheckBox} from "react-native-elements"
import {MainButton} from '../components/Buttons'
import {Slider} from '../components/Slider'
import {DropdownSection} from "../components/Dropdowns"
import {HealthHandlerHeader} from '../components/Headers'
import {addToUserPlan, getUserPlan} from '../ApiCalls'
import AsyncStorage from '@react-native-async-storage/async-storage'
import common, {GREEN} from '../common.style'
import lodash from 'lodash'


const InputScreen = ({navigation}) => {
    // TODO this data has to come from async storage
    const [userData, setUserData] = useState({
        vegetarian: false,
        vegan: false,
        nutFree: false,
        halal: false,
        lactoseFree: false,
        fishAllergy: false
    })
    const [price, setPrice] = useState(10)
    const [time, setTime] = useState(60)
    const [calories, setCalories] = useState(2500)
    const [waiting, setWaiting] = useState(false)
    const handleClick = async () => {
        setWaiting(true)
        try {
            const userJson = await AsyncStorage.getItem('user1')
            const user = JSON.parse(userJson)
            if (user) {
                const {username, hash} = user
                getUserPlan(user.username, user.hash)
                    .then(r => {
                        if (lodash.some(r.data.days)) {
                            navigation.navigate("MealPlanScreen", {
                                data: r.data,
                                user: user,
                                userInput: {
                                    userData: userData,
                                    price: price,
                                    time: time,
                                    calories: calories,
                                }
                            })
                            setWaiting(false)
                        } else {
                            addToUserPlan(username, hash)
                            handleClick()
                        }
                    })
                    .catch(e => console.log(e))
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <View style={[common.screen, {justifyContent: 'space-around'}]}>
            <HealthHandlerHeader />
            <DropdownSection />
            <View>
                <View style={{padding: 10}}>
                    <Slider
                        value={price}
                        minValue={1}
                        maxValue={20}
                        step={0.05}
                        onValueChange={(value) => setPrice(value)}
                        unit={'£/meal'}
                    />
                    <Slider
                        value={time}
                        minValue={15}
                        maxValue={100}
                        step={1}
                        onValueChange={(value) => setTime(value)}
                        unit={'minutes'}
                    />
                    <Slider
                        value={calories}
                        minValue={1500}
                        maxValue={4000}
                        step={50}
                        onValueChange={(value) => setCalories(value)}
                        unit={'kcal'}
                    />
                </View>
                <View style={common.flexRow}>
                    <View style={common.column}>
                        <View>
                            <CheckBox
                                checked={userData.vegetarian}
                                title="Vegetarian"
                                checkedColor={GREEN}
                                onPress={() => setUserData({
                                    ...userData,
                                    vegetarian: !userData.vegetarian
                                })}
                            />
                            <CheckBox
                                checked={userData.nutFree}
                                title="Nut free"
                                checkedColor={GREEN}
                                onPress={() => setUserData({
                                    ...userData,
                                    nutFree: !userData.nutFree
                                })}
                            />
                            <CheckBox
                                checked={userData.halal}
                                title="Halal"
                                checkedColor={GREEN}
                                onPress={() => setUserData({
                                    ...userData,
                                    halal: !userData.halal
                                })}
                            />
                        </View>
                    </View>
                    <View style={common.column}>
                        <View>
                            <CheckBox
                                checked={userData.vegan}
                                title="Vegan"
                                checkedColor={GREEN}
                                onPress={() => setUserData({
                                    ...userData,
                                    vegan: !userData.vegan
                                })}
                            />
                            <CheckBox
                                checked={userData.lactoseFree}
                                title="Nut free"
                                checkedColor={GREEN}
                                onPress={() => setUserData({
                                    ...userData,
                                    lactoseFree: !userData.lactoseFree
                                })}
                            />
                            <CheckBox
                                checked={userData.fishAllergy}
                                title="No fish"
                                checkedColor={GREEN}
                                onPress={() => setUserData({
                                    ...userData,
                                    fishAllergy: !userData.fishAllergy
                                })}
                            />
                        </View>
                    </View>
                </View>
                <View style={{alignSelf: 'center', marginBottom: 50}}>
                    <MainButton
                        onPress={handleClick}
                        text={!waiting ? "Create plan" : "Sending..."}
                    />
                </View>
            </View>
        </View>
    )
}

export default InputScreen
