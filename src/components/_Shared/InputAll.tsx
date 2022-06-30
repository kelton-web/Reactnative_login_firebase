import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

interface InputType {
    value: string,
    placeholder: string,
    onChangeText: (value: string) => void,
    error?: boolean,
    errorDetails?: string,
    onBlur: () => void,
}

const InputAll: React.FC<InputType> = ({error = false, errorDetails,...props}) => {
  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        style={error ? {borderWidth: 1,
          backgroundColor: '#FFFFFF',
          borderColor: 'red',
          height: 50,
          width: '80%',
          padding: 20,
          borderRadius: 7} : {borderWidth: 1,
            backgroundColor: '#FFFFFF',
            borderColor: 'gray',
            height: 50,
            width: '80%',
            padding: 20,
            borderRadius: 7}}
      />
      {!!errorDetails && (
        <Text style={{color: 'red', textAlign: 'center'}}>{errorDetails}</Text>
      ) }
    </View>
  )
}

export default InputAll

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  /* inputStyle: {
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    height: 50,
    width: '80%',
    padding: 20,
    borderRadius: 7
  } */
})