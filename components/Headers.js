import React from "react"
import { Image, Text, View, StyleSheet } from "react-native"
import { GrayDivider } from "./Dividers"

export const HealthHandlerHeader = () => {
    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.headerText}>Health Handler</Text>
                <Image source={require('../assets/logo.png')} style={styles.smallLogo} />
            </View>
            <GrayDivider />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        marginTop: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 60,
        alignItems: 'center'
    },
    smallLogo: { width: 43, height: 36 },
    headerText: {
        fontSize: 30,
        lineHeight: 30,
        fontWeight: 'normal'
    }
})