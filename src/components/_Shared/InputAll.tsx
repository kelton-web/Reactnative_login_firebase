import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

interface InputType {
    value: string,
    placeholder: string,
    onChangeText: (value: string) => void,
    error?: boolean,
    errorDetails?: string,
    onBlur: () => void,
    type: "password" | "text" | "email"
}

const InputAll: React.FC<InputType> = ({error = false, errorDetails,type,...props}) => {
const [isVisible, SetIsVisible] = useState<boolean>(type !== "password")
      const isVisibleFunction = () => {
        SetIsVisible(!isVisible)
      }

  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        keyboardType={type === "email" ? "email-address" : "default"}
        secureTextEntry={!isVisible}
        style={error ? {borderWidth: 1,
          backgroundColor: '#FFFFFF',
          borderColor: 'red',
          height: 50,
          width: '80%',
          paddingHorizontal: 20,
          position: 'relative',
          paddingRight: type === "password" ?  44 : 5,
          borderRadius: 7} : {borderWidth: 1,
            backgroundColor: '#FFFFFF',
            borderColor: 'gray',
            position: 'relative',
            paddingRight: type === "password" ?  44 : 5,
            height: 50,
            width: '80%',
            paddingHorizontal: 20,
            borderRadius: 7}}
      />
      {!!errorDetails && (
        <Text style={{color: 'red', textAlign: 'center'}}>{errorDetails}</Text>
      ) }
     {type === "password" &&
            <View style={{position: 'absolute',right: 50}}>
               {isVisible ? <Text><Ionicons name='eye-off' size={28} color='green' onPress={isVisibleFunction} /></Text> : <Text><Ionicons name='eye' size={29} color='green' onPress={isVisibleFunction} /></Text>}
            </View>
      }
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