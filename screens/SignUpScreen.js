import React, { useState } from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'
import { Sainsburys } from '../components/SupermarketCards'
import GreenButton from '../components/GreenButton'
import TextField from '../components/TextField'
import SmallLogo from '../components/SmallLogo'
import common from '../common.style'


const SignInScreen = ({ navigation }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  return (
    <View style={styles.screen}>
      <View style={styles.loginContainer}>
        <View style={{marginTop: 100}}>
          <SmallLogo />
          <Text style={common.headingMain}>
            Create an account
          </Text>
        </View>
        <View style={{marginTop: 55}}>
          <TextField 
            label={'Name'} 
            value={name} 
            onChange={setName} 
            capitalize='sentences'
            correct={false}
          />
          <TextField 
            label={'Email'} 
            value={email} 
            onChange={setEmail} 
            capitalize='none'
            correct={false}
          />
          <TextField 
            label={'Password'} 
            value={password} 
            onChange={setPassword} 
            secure={true} 
            capitalize='none'
            correct={false}
          />
          <TextField 
            label={'Confirm Password'} 
            value={passwordConfirm} 
            onChange={setPasswordConfirm} 
            secure={true} 
            capitalize='none'
            correct={false}
          />
          <View style={{marginTop: 30}}>
            <GreenButton  text={'Login'} onPress={() => {}} />
          </View>
        </View>
      </View>
        <View style={{position: 'absolute', bottom: '6%', alignSelf: 'center'}}>
          <Text style={common.text}>
            Already a member? {'\t'}
            <Text 
              style={{color: '#5AD710', fontFamily: 'PoppinsBold'}}
              onPress={() => navigation.navigate('SignInScreen')}
            >
              Sign in 
            </Text>
          </Text>
        </View>
    </View>
  )
}
// todo: for both screens -> validate email and ensure passwords match before django req

const styles = StyleSheet.create({
  screen: {
    ...common.screen,
    paddingHorizontal: 40
  },
})

export default SignInScreen 
