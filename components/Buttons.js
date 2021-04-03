import React from 'react'
import {TouchableOpacity, Text, StyleSheet} from 'react-native'
import {Icon} from 'react-native-elements'
import {GREEN} from '../common.style'

export const ReturnButton = ({navigation, onPress}) => {
    return <Icon onPress={onPress} type="font-awesome" name="arrow-left" color={GREEN}/>
}

export const MainButton = ({onPress, text}) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={{color: 'white', fontSize: 20}}>{text}</Text>
        </TouchableOpacity>
    )
}

export const ShoppingListButton = ({onPress}) => {
    return <Icon
        type="font-awesome"
        name="shopping-cart"
        onPress={onPress}
        color={GREEN}
    />
}

export const WeeklyConsumptionButton = ({navigation}) => {
    return <MainButton
        text={'Weekly Consumption'}
        onPress={() => navigation.navigate("ConsumptionScreen")}
    />
}

const styles = StyleSheet.create({
    button: {
        width: 200,
        height: 50,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.5,
        elevation: 7,
        marginTop: 120,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        backgroundColor: '#4EB849'
    }
})
