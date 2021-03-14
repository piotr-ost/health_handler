import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";


const GREEN = '#6FBF44'

export const DropdownIcon = ({ onPress }) => {
    return <Icon type="font-awesome" name="caret-down" color={GREEN} onPress={onPress} />;
}

export const Dropdowns = ({ text, onPress }) => {
    return (
        <TouchableOpacity style={styles.dropdown} onPress={onPress}>
            <Text>{text}</Text>
            <DropdownIcon />
        </TouchableOpacity>
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