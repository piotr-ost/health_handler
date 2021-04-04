import React, {useEffect, useState} from 'react'
import {View, Text, ScrollView} from 'react-native'
import {WeeklyConsumptionButton} from "../components/Buttons"
import {ShoppingListHeader} from "../components/Headers"
import {ShoppingListSpinner} from "../components/Spinners"
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
            <ShoppingListHeader navigation={navigation} />
            <ScrollView>
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
                    ) ?? <ShoppingListSpinner />
                }
            </ScrollView>
            <Text>Total Cost: {Math.round(shoppingList?.cost) / 100}$</Text>
            <WeeklyConsumptionButton navigation={navigation} />
        </View>
    )
}

export default ShoppingListScreen;
