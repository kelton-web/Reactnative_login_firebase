import React, {useState} from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import InputAll from '../components/_Shared/InputAll';
import { useNavigation } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginUserBase } from '../firebase/Auth';
import { validationSchemaSendMail } from '../yup/verify';
import { NavigateParams } from '../types/Types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import auth, { firebase } from '@react-native-firebase/auth';
import ButtonSubmit from '../components/_Shared/ButtonSubmit';


type FormValuesSendMail = {
  
  email: string;
}



const SendEmailForgotPassword = () => {
    const [isGood, setIsGood] = useState<boolean>(true);

    const navigation = useNavigation<NativeStackNavigationProp<NavigateParams>>();
    
    const {control, handleSubmit, clearErrors, formState: {errors}} = useForm<FormValuesSendMail>({
        resolver: yupResolver(validationSchemaSendMail),
        mode: 'onSubmit',
    })
    
    const SendEmailForgot = (value: FormValuesSendMail, navigation: any) => {
        //const auth = getAuth();
        console.log("get mail" + value.email)
        firebase.auth().sendPasswordResetEmail(value.email).then((response) => setIsGood(false));
    }

  const submitButtonSendEmail = (value: FormValuesSendMail) => {
   clearErrors();
   SendEmailForgot(value, navigation)
  }

  return (
    <ImageBackground source={require('../assets/planete.jpeg')} style={styles.imageBackground} >
      <View style={styles.container}>
        <View style={{flex: 2,  justifyContent: "flex-end"}}>
          <View style={styles.smallContainer}>
            <Controller control={control} name="email" render={({field: {onChange, value, onBlur}, fieldState: {error}}) => (
                      <InputAll value={value} placeholder="Entrez votre email" type="email" onChangeText={onChange} error={!!error} errorDetails={error?.message} onBlur={onBlur}/>
                  )} />
          </View>
          <View>
            <ButtonSubmit title="Envoyer" onPress={handleSubmit((value) => submitButtonSendEmail(value))} style={styles.buttonStyle} textStyle={styles.textStyle} />
          </View>
        </View>
        {isGood && (
            <View style={styles.imgStyle}>
                <Image source={require("../assets/aliensnasapng.png")} style={styles.imgAlien}/>
            </View>
        )}
        {!isGood && (
            <View style={styles.imgStyle}>
                <Image source={require("../assets/istock-alien.png")} style={styles.imgAlien}/>
            </View>
        )}
      </View>
    </ImageBackground>
  )
}

export default SendEmailForgotPassword

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
    justifyContent: "flex-end",
  },
  imgAlien: {
    width: 400,
    height: 300,
    resizeMode: "cover",
  }

})