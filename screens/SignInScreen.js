import React, { useState } from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'
import { Sainsburys } from '../components/SupermarketCards'
import GreenButton from '../components/GreenButton'
import TextField from '../components/TextField'
import SmallLogo from '../components/SmallLogo'
import common from '../common.style'


const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={styles.screen}>
      <View style={styles.loginContainer}>
        <View>
          <SmallLogo />
          <Text style={common.headingMain}>
            Welcome!
          </Text>
          <Text style={[common.text, {marginTop: 5}]}>
            Sign in to continue.
          </Text>
        </View>
        <View>
          <TextField 
            label={'Email'} 
            value={email} 
            onChange={setEmail} 
          />
          <TextField 
            label={'Password'} 
            value={password} 
            onChange={setPassword} 
            secureTextEntry={true} 
          />
          <GreenButton text={'Login'} onPress={() => {}} />
        </View>
        <View>
          <Text style={common.text}>
            New to Health Handler? {'\t'}
            <Text 
              style={{color: '#5AD710', fontFamily: 'PoppinsBold'}}
              onPress={() => navigation.navigate('SignUpScreen')}
            >
              Sign up
            </Text>
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    ...common.screen
  },
})

export default SignInScreen 
