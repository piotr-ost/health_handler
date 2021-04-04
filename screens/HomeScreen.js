import React from 'react'
import {View, Image, StyleSheet} from 'react-native'
import {MainButton} from '../components/Buttons'
import {connectUser} from '../ApiCalls'
import AsyncStorage from "@react-native-async-storage/async-storage"
import common from '../common.style'


const HomeScreen = ({navigation}) => {
    const handleClick = async () => {
        try {
            const userJson = await AsyncStorage.getItem('user1')
            if (userJson) {
                const user = JSON.parse(userJson)
                console.log('retrieved the guy', user)
                navigation.navigate('InputScreen', {user: user})
            } else {
                const [username, hash] = await connectUser()
                let user = JSON.stringify({
                    username: username,
                    hash: hash
                })
                await AsyncStorage.setItem('user1', user)
                console.log('new guy', user)
                navigation.navigate('InputScreen', {user: user})
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <View style={styles.screen}>
            <View />
            <View>
                <Image
                    source={require('../assets/logo.png')}
                    style={styles.mainLogo}
                />
                <Image
                    source={require('../assets/logo_text.png')}
                    style={styles.logoText}
                />
            </View>
            <MainButton text={'Start'} onPress={handleClick}/>
            <View />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        ...common.screen,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    mainLogo: {
        width: 200,
        height: 168,
    },
    logoText: {
        width: 166,
        height: 82,
        marginTop: 30,
    },
})

export default HomeScreen