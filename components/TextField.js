import React from 'react'
import { TextInput, View, Text, StyleSheet } from 'react-native'
import common from '../common.style'

export default ({ label, value, onChange, secure, capitalize, correct, type }) => {
  return (
    <View>
      <Text style={styles.label}>
        {label} 
      </Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        secureTextEntry={secure}
        autoCapitalize={capitalize}
        autoCorrect={correct}
        autoCompleteType={type}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    ...common.text,
    fontSize: 14,
    lineHeight: 21,
    color: '#6D6D6D',
  },
  input: {
    width: '100%',
    height: 48,
    borderRadius: 7,
    borderColor: '#DFDFDF',
    borderWidth: 1,
    paddingHorizontal: 15,
    marginBottom: 12
  }
})
