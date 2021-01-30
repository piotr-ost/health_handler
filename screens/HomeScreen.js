import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text, Dimensions} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.mainLogo} />
      <Image source={require('../assets/logo_text.png')} style={styles.logoText} />
      <View >
        <TouchableOpacity style={styles.button}
                          onPress={() => navigation.navigate('InputScreen')}>
          <Text style={{color: 'white', fontStyle: 'KumbhSans-Regular',
            fontSize: 20}}>Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 200,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 8,
    alignItems: 'center'
  },
  mainLogo: {
    display: 'flex',
    width: 200,
    height: 168,
    alignSelf: 'center',
    paddingBottom: 100
  },
  logoText: {
    width: 166,
    height: 82,
    marginTop: 30,
    alignSelf: 'center'
  },
  button: {
    width: 200, height: 50, borderRadius: 12, shadowColor: '#000',
    shadowOffset: {width: 0, height: 3}, shadowOpacity: 0.3,
    shadowRadius: 4.5, elevation: 7, marginTop: 120, alignItems: 'center',
    justifyContent: 'center', display: 'flex', backgroundColor: '#4EB849',
  }
});

export default HomeScreen;