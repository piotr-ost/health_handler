import React, {useEffect, useState} from 'react'
import {View, Text, ActivityIndicator} from 'react-native'
import {ReturnButton, WeeklyConsumptionButton} from "../components/Buttons"
import {Icon} from 'react-native-elements'
import {GrayDivider} from "../components/Dividers"
import {generateShoppingList} from "../ApiCalls"

import {Product} from '../components/Product'

import shoppingListMock from "../products_api/shopping_lists/shoppingList3"
import common from '../common.style'


const ShoppingListScreen = ({route, navigation}) => {
    const [shoppingList, setShoppingList] = useState(null)
    const {user} = route.params
    const {username, hash} = user
    useEffect(() => {
        setShoppingList(shoppingListMock)
        // if (!shoppingList)
        //   generateShoppingList(username, hash).then(r => setShoppingList(r.data))
    }, [])
    return (
        <View style={common.screen}>
            <View>
                <View style={common.header}>
                    <ReturnButton
                        navigation={navigation}
                        onPress={() => navigation.navigate('MealPlanScreen')}
                    />
                    <Text style={{fontSize: 30}}>Shopping list</Text>
                    <Icon onPress={() => {}} type='font-awesome' name='floppy-o' color='#4EB849'/>
                </View>
                <GrayDivider/>
            </View>
            {
                shoppingList?.aisles?.map(aisle =>
                    aisle.items.map(item =>
                        <Product
                            id={item.ingredientId}
                            key={item.id}
                            name={item.name}
                            measures={item.measures}
                            cost={item.cost}
                        />
                    )
                ) ??
                <View style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                    <Text>Generating the shopping list...</Text>
                    <ActivityIndicator color={common.GREEN} style={{padding: 30}}/>
                </View>
            }
            <Text>Total Cost: {Math.round(shoppingList?.cost) / 100}$</Text>
            <WeeklyConsumptionButton />
        </View>
    )
}

export default ShoppingListScreen;
