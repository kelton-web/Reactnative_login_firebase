import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import InputAll from '../components/_Shared/InputAll';
import { useNavigation } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginUserBase } from '../firebase/Auth';
import { validationSchemaForgot } from '../yup/verify';
import { NavigateParams } from '../types/Types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import ButtonSubmit from '../components/_Shared/ButtonSubmit';

type FormValuesForgot = {
  
  password: string;
}

export const ForgotenPassword = (value: FormValuesForgot, navigation: any) => {
  auth()
    .signInWithEmailAndPassword("hello", value.password)
    .then(() => {
      console.log('signed in!');
      navigation.replace('Home',{password: value.password});

    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
}
const ForgotPassword = () => {
  const navigation = useNavigation<NativeStackNavigationProp<NavigateParams>>();

  const {control, handleSubmit, clearErrors, formState: {errors}} = useForm<FormValuesForgot>({
     resolver: yupResolver(validationSchemaForgot),
     mode: 'onSubmit',
  })

  const submitButtonForgot = (value: FormValuesForgot) => {
   clearErrors();
   ForgotenPassword(value, navigation)
  }

  return (
    <ImageBackground source={require('../assets/planete.jpeg')} style={styles.imageBackground} >
      <View style={styles.container}>
        <View style={{flex: 2,  justifyContent: "flex-end"}}>
          <View style={styles.smallContainer}>
            <Controller control={control} name="password" render={({field: {onChange, value, onBlur}, fieldState: {error}}) => (
                      <InputAll value={value} placeholder="Nouveau mot de passe" type="password" onChangeText={onChange} error={!!error} errorDetails={error?.message} onBlur={onBlur}/>
                  )} />
          </View>
          <View>
            <ButtonSubmit title="Connexion" onPress={handleSubmit((value) => submitButtonForgot(value))} style={styles.buttonStyle} textStyle={styles.textStyle} />
          </View>
        </View>
        <View style={styles.imgStyle}>
          <Image source={require("../assets/istock-alien.png")} style={styles.imgAlien}/>
        </View>
      </View>
    </ImageBackground>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
  imageBackground: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    
  },
  smallContainer: {
    marginBottom: 12
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
  },
  imgStyle: {
    width: "100%",
    flex: 2,
    justifyContent: "flex-start",
  },
  imgAlien: {
    width: 400,
    height: 400
  }

})