import React from "react";
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormValuesSignUp } from '../types/Types';
import InputAll from "../components/_Shared/InputAll";
import ButtonSubmit from '../components/_Shared/ButtonSubmit';
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigateParams } from "../types/Types";

const SignUp = () => {

const navigation = useNavigation<NativeStackNavigationProp<NavigateParams>>();

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Veuillez saisir votre prénom"),
    lastName: Yup.string().required("Veuillez saisir votre nom"),
    email: Yup.string()
      .email("Veuillez saisir une adresse mail valide")
      .required("Veuillez saisir une adresse mail"),
    password: Yup.string()
      .min(6, "Veuillez saisir au moins 6 caractères")
      .required("Veuillez saisir un mot de passe"),
    confirmPassword: Yup.string()
      .required("Veuillez confirmer votre mot de passe")
      .oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas"),
  }).required();

  const {control, clearErrors, handleSubmit, formState: {errors}} = useForm<FormValuesSignUp>({
    resolver: yupResolver(validationSchema),
    mode: 'onSubmit',
  })


    const HandlePressSubmit = (value: FormValuesSignUp) => {
    clearErrors();
    console.log("Press Submit");
    
    auth()
      .createUserWithEmailAndPassword(value.email, value.password)
      .then(() => {
        console.log('User account created & signed in!');
        navigation.navigate('Home');
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
   
  return (
    <View>
        <ImageBackground source={require('../assets/planete.jpeg')} style={styles.imageBackground} >
          <View style={styles.blurStyle}>
            <View style={styles.smallContain}>
              <View style={styles.inputContainStyle}>
                <Controller control={control} name="firstName" render={({field: {onChange, value, onBlur}, fieldState: {error}}) => (
                  <InputAll value={value} placeholder="Prénom" onChangeText={onChange} error={!!error} errorDetails={error?.message} onBlur={onBlur}/>
                )} />
              </View>
              <View style={styles.inputContainStyle}>
                <Controller control={control} name="lastName" render={({field: {onChange, value, onBlur}, fieldState: {error}}) => (
                  <InputAll value={value} placeholder="Nom" onChangeText={onChange} error={!!error} errorDetails={error?.message} onBlur={onBlur}/>
                )} />
              </View>
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
              <View style={styles.inputContainStyle}>
                <Controller control={control} name="confirmPassword" render={({field: {onChange, value, onBlur}, fieldState: {error}}) => (
                  <InputAll value={value} placeholder="Confimer votre mot de passe" onChangeText={onChange} error={!!error} errorDetails={error?.message} onBlur={onBlur}/>
                )} />
              </View>
            </View>
              {errors && Object.keys(errors).length > 0 && <Text style={{color: 'red', textAlign: 'center', paddingBottom: 4}}>Veuillez remplir tout les champs obligatoire </Text>}
            <ButtonSubmit onPress={handleSubmit((value) => HandlePressSubmit(value))} title="Créer un compte"/>
          </View>
        </ImageBackground>
         
    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({
  imageBackground: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  blurStyle: {
   
    shadowOpacity: 1,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 0.5,
    borderColor: "rgba(99, 110, 114,1.0)",
    backgroundColor: "rgba(93, 103, 100, 0.5)",
    marginBottom: "10%",
    height: "70%",
    width: "95%",
    borderRadius: 10,
  },
  smallContain: {
    marginTop: 20,
  },
  inputContainStyle: {
    paddingBottom: "5%",
  }
})