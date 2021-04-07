import React, {useEffect, useState} from 'react'
import {View, Text, ScrollView} from 'react-native'
import {WeeklyConsumptionButton} from "../components/Buttons"
import {ShoppingListHeader} from "../components/Headers"
import {ShoppingListSpinner} from "../components/Spinners"
import {generateShoppingList, convertShoppingList} from "../ApiCalls"
import {Product} from '../components/Product'
import common from '../common.style'
import lodash from 'lodash'

const ShoppingListScreen = ({route, navigation}) => {
    const [shoppingList, setShoppingList] = useState(null)
    const {user} = route.params
    const {username, hash} = user
    useEffect(() => {
        if (!shoppingList)
            generateShoppingList(username, hash)
                .then(r1 =>
                    convertShoppingList(r1.data)
                        .then(shoppingList => {
                            setShoppingList(
                                lodash.zip(
                                    Object.values(shoppingList.data.name),
                                    Object.values(shoppingList.data.img_url),
                                    Object.values(shoppingList.data.amount),
                                    Object.values(shoppingList.data.unit),
                                    Object.values(shoppingList.data.price)
                                )
                            )
                            console.log(shoppingList.data)
                        })
                )
    }, [])
    return (
        <View style={common.screen}>
            <ShoppingListHeader navigation={navigation} />
            <ScrollView>
                {
                    shoppingList?.map(([name, imgUrl, amount, unit, price]) =>
                            <Product
                                key={name}
                                name={name}
                                imgUrl={imgUrl}
                                amount={amount}
                                unit={unit}
                                price={price}
                            />
                        ) ?? <ShoppingListSpinner />
                }
            </ScrollView>
        </View>
    )
}

export default ShoppingListScreen
