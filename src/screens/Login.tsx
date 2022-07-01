import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { FormValuesSignUp } from '../types/Types';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema, validationSchemaLogin } from '../yup/verify';
import ButtonSubmit from '../components/_Shared/ButtonSubmit';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigateParams } from "../types/Types";
import { CreateUserBase, LoginUserBase } from '../firebase/Auth';
import InputAll from '../components/_Shared/InputAll';



const Login = () => {
  const navigation = useNavigation<NativeStackNavigationProp<NavigateParams>>();

   const {control, handleSubmit, clearErrors, formState: {errors}} = useForm<FormValuesSignUp>({
      resolver: yupResolver(validationSchemaLogin),
      mode: 'onSubmit',
   })

   const submitButtonLogin = (value: FormValuesSignUp) => {
    clearErrors();
      LoginUserBase(value, navigation)
   }
   const submitButtonSignup = () => {
      navigation.navigate('SignUp');
   }

  return (
    <View style={styles.container}>
      <ImageBackground source={require("../assets/planete.jpeg")} style={styles.imageBackground}>
        <View style={styles.smallContainer}>
          <View style={styles.inputContainStyle}>
            <Controller control={control} name="email" render={({field: {onChange, value, onBlur}, fieldState: {error}}) => (
                <InputAll value={value} placeholder="Email" onChangeText={onChange} error={!!error} errorDetails={error?.message} onBlur={onBlur}/>
            )} />
          </View>
          <View style={styles.inputContainStyle}>
            <Controller control={control} name="password" render={({field: {onChange, value, onBlur}, fieldState: {error}}) => (
                <InputAll value={value} placeholder="Mot de passe" onChangeText={onChange} error={!!error} errorDetails={error?.message} onBlur={onBlur}/>
            )} />
            
          </View>
          <View style={styles.submitButtonStyle}>
            <ButtonSubmit title="Connexion" onPress={handleSubmit((value) => submitButtonLogin(value))} style={styles.buttonStyle} textStyle={styles.textStyle} />
          </View>
          <View style={styles.submitButtonStyle}>
            <ButtonSubmit title="Inscription" onPress={submitButtonSignup} style={styles.buttonInscriptionStyle} textStyle={styles.textStyle} />
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  smallContainer: {
    width: '100%',
    
  },
  imageBackground: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainStyle: {
    paddingBottom: "2%",
  },
  submitButtonStyle: {
    paddingTop: '3%',
  },
  buttonStyle: {
    height: 50,
    width: "80%",
    backgroundColor: "rgba(38, 222, 129,1.0)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonInscriptionStyle: {
    height: 50,
    width: "80%",
    backgroundColor: "rgb(206, 203, 211)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
      fontSize: 20
  }
})