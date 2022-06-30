import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react'

interface ButtonType {
onPress: () => void,
title: string,
}

const ButtonSubmit: React.FC<ButtonType> = ({onPress, title}) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
            <Text style={styles.textStyle}>{title}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default ButtonSubmit

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonStyle: {
        height: 50,
        width: "80%",
        backgroundColor: "rgba(38, 222, 129,1.0)",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    textStyle: {
        fontSize: 20
    }
})