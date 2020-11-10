import React from 'react';
import {View, Image, StyleSheet, Button} from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.main_logo} />
      <Image source={require('../assets/logo_text.png')} style={styles.logo_text} />
      <View style={styles.button_box}>
        <Button title="Start"/>
      </View>
    <Button title="Terms of service" color="#676767"
            style={styles.terms_of_service}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 8,
    alignItems: 'center'
  },
  main_logo: {
    display: 'flex',
    width: 200,
    height: 168,
    alignSelf: 'center',
    paddingBottom: 100
  },
  logo_text: {
    width: 166,
    height: 82,
    marginTop: 30,
    alignSelf: 'center'
  },
  button_box: {
    backgroundColor: 'transparent',
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
    marginTop: 75
  },
  terms_of_service: {
    position: 'absolute',
    fontFamily: "Kumbh Sans",
    fontStyle: 'normal',
    fontSize: 14,
    bottom: 0
  }
});

export default HomeScreen;