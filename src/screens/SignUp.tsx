import React from "react";
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormValuesSignUp } from '../types/Types';
import InputAll from "../components/_Shared/InputAll";
import ButtonSubmit from '../components/_Shared/ButtonSubmit';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigateParams } from "../types/Types";
import { CreateUserBase } from "../firebase/Auth";
import { validationSchema } from "../yup/verify";

const SignUp = () => {

const navigation = useNavigation<NativeStackNavigationProp<NavigateParams>>();

  const {control, clearErrors, handleSubmit, formState: {errors}} = useForm<FormValuesSignUp>({
    resolver: yupResolver(validationSchema),
    mode: 'onSubmit',
  })


    const HandlePressSubmit = (value: FormValuesSignUp) => {
    clearErrors();
    console.log("Press Submit");
    CreateUserBase(value, navigation)
  }
   
  return (
    <View>
        <ImageBackground source={require('../assets/planete.jpeg')} style={styles.imageBackground} >
          <View style={styles.blurStyle}>
            <View style={styles.smallContain}>
              <View style={styles.inputContainStyle}>
                <Controller control={control} name="email" render={({field: {onChange, value, onBlur}, fieldState: {error}}) => (
                  <InputAll value={value} placeholder="Email" type="email" onChangeText={onChange} error={!!error} errorDetails={error?.message} onBlur={onBlur}/>
                )} />
              </View>
              <View style={styles.inputContainStyle}>
                <Controller control={control} name="password" render={({field: {onChange, value, onBlur}, fieldState: {error}}) => (
                  <InputAll value={value} placeholder="Mot de passe" type="password" onChangeText={onChange} error={!!error} errorDetails={error?.message} onBlur={onBlur}/>
                )} />
              </View>
              <View style={styles.inputContainStyle}>
                <Controller control={control} name="confirmPassword" render={({field: {onChange, value, onBlur}, fieldState: {error}}) => (
                  <InputAll value={value} placeholder="Confimer votre mot de passe" type="password" onChangeText={onChange} error={!!error} errorDetails={error?.message} onBlur={onBlur}/>
                )} />
                
              </View>
              
            </View>
              {errors && Object.keys(errors).length > 0 && <Text style={{color: 'red', textAlign: 'center', paddingBottom: 4}}>Veuillez remplir tout les champs obligatoire </Text>}
            <ButtonSubmit onPress={handleSubmit((value) => HandlePressSubmit(value))} title="Créer un compte" style={styles.buttonStyle} textStyle={styles.textStyle}/>
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