import React, { useState } from 'react'
import { 
  View, 
  Image, 
  StyleSheet, 
  Text, 
  ScrollView, 
  SafeAreaView
} from 'react-native'
import { Sainsburys } from '../components/SupermarketCards'
import GreenButton from '../components/GreenButton'
import TextField from '../components/TextField'
import SmallLogo from '../components/SmallLogo'
import common from '../common.style'


const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [resultText, setResultText] = useState(null)

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const signUp = () => {
    const urlBase = 'https://handler.health/'
    fetch(urlBase + 'auth/registration/', {
      method: 'POST',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ username, email, password1, password2 })
    })
      .then(r => r.json())
      .then(r => {
        console.log(r)
        if (!r.key) {
          let res = ''
          for (let entry of Object.entries(r)) {
            const [field, [problem]] = entry 
            console.log(field, problem)
            res += capitalize(field) + ': ' + problem + '\n'
          }
          setResultText(res)
        } else {
          navigation.navigate('StartScreen', { 
            token: r.key, 
            username: username 
          })
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <View style={styles.screen}>
      <View style={styles.loginContainer}>
        <View style={
          resultText ? {marginTop: 50} : {marginTop: 100}
        }>
          <SmallLogo />
          <Text style={common.headingMain}>
            Create an account
          </Text>
              <View>
          {
            resultText &&
          <SafeAreaView>
            <ScrollView style={styles.scrollView}>
              <Text style={styles.resultText}>
                {resultText}
              </Text>
            </ScrollView>
          </SafeAreaView>
          }
              </View>
        </View>
        <View style={!resultText ? {marginTop: 55} : {}}>
          <TextField 
            label={'Username'} 
            value={username} 
            onChange={setUsername} 
            capitalize='none'
            correct={false}
          />
          <TextField 
            label={'Email'} 
            value={email} 
            onChange={setEmail} 
            capitalize='none'
            correct={false}
            type={'email'}
          />
          <TextField 
            label={'Password'} 
            value={password1} 
            onChange={setPassword1} 
            secure={true} 
            capitalize={'none'}
            correct={false}
            type={'password'}
          />
          <TextField 
            label={'Confirm Password'} 
            value={password2} 
            onChange={setPassword2} 
            secure={true} 
            capitalize={'none'}
            correct={false}
            type={'password'}
          />
          <View style={{marginTop: 30}}>
            <GreenButton text={'Sign up'} onPress={signUp} />
          </View>
        </View>
      </View>
      <View style={{
        position: 'absolute', bottom: '8%', alignSelf: 'center'
      }}>
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

const styles = StyleSheet.create({
  screen: {
    ...common.screen,
    paddingHorizontal: 40
  },
  resultText: {
    ...common.text, 
    marginTop: 5,
    fontSize: 15,
    color: 'red'
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    height: 48, 
    marginBottom: 25, 
    marginTop: 8
  }
})

export default SignUpScreen 
