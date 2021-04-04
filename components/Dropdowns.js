import React from "react";
import {Text, TouchableOpacity, StyleSheet, View} from "react-native";
import {Icon} from "react-native-elements";
import {GreenDivider} from "./Dividers";
import {GREEN} from '../common.style'

export const DropdownIcon = ({onPress}) => {
    return <Icon type="font-awesome" name="caret-down" color={GREEN} onPress={onPress}/>;
}

export const Dropdown = ({text, onPress}) => {
    return (
        <TouchableOpacity style={styles.dropdown} onPress={onPress}>
            <Text>{text}</Text>
            <DropdownIcon/>
        </TouchableOpacity>
    )
}

export const DropdownSection = () => {
    return (
        <View>
            <Dropdown
                text={'View existing meal plans'}
                onPress={() => {}}
            />
            <View style={[styles.flexRow, {height: 40}]}>
            </View>
            <Dropdown
                onPress={() => {}}
                text="Select a supermarket..."
                type="wide"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    dropdown: {
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 3,
        justifyContent: 'space-between',
        padding: 6,
        borderColor: GREEN,
        borderWidth: 1,
        height: 35,
        marginTop: 10
    }
})