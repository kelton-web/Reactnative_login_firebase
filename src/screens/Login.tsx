import  * as React from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { FormValuesSignUp } from '../types/Types';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema, validationSchemaLogin } from '../yup/verify';
import ButtonSubmit from '../components/_Shared/ButtonSubmit';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigateParams } from "../types/Types";
import { CreateUserBase, LoginUserBase } from '../firebase/Auth';
import InputAll from '../components/_Shared/InputAll';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'



const Login = () => {
  const navigation = useNavigation<NativeStackNavigationProp<NavigateParams>>();

   const {control, handleSubmit, clearErrors, formState: {errors}} = useForm<FormValuesSignUp>({
      resolver: yupResolver(validationSchemaLogin),
      mode: 'onSubmit',
   })

   const userID = auth().currentUser?.uid;
   const userMail = auth().currentUser?.email;
   React.useEffect(() => {

     if (userID) {
      navigation.replace('Home');
    }
   },[])

/*    const storeData = async (value: FormValuesSignUp, navigation: any) => {

    let UID123_object = {
      name: value.email,
      password: value.password,
    };
    if(userID){
     try {
       await AsyncStorage.setItem( 'UID123', JSON.stringify(UID123_object)),
       console.log(value.email)
     } catch (e) {
       // saving error
     }
    }
   } */


   
   
   const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true })
   
   const HandleBiometrics = async ()   => {
     
     console.log("================================");
     
     rnBiometrics.isSensorAvailable()
     .then((resultObject) => {
       const { available, biometryType } = resultObject
   
       if (available && biometryType === BiometryTypes.TouchID) {
       /*   rnBiometrics.createKeys()
        .then((resultObject) => {
          const { publicKey } = resultObject
          console.log(publicKey)
        })  */
         console.log('TouchID is supported')
       } else if (available && biometryType === BiometryTypes.FaceID) {
         console.log('FaceID is supported')
       } else if (available && biometryType === BiometryTypes.Biometrics) {
         console.log('Biometrics is supported')
       } else {
         console.log('Biometrics not supported')
       }
     })
     .catch(error => {
      console.log("Voir mon erreur",error)
  })
}

/* const rnBiometricsdelete = () => {
  console.log("resultObject =================================================")
  
  rnBiometrics.deleteKeys()
  .then((resultObject) => {
    const { keysDeleted } = resultObject
    
    if (keysDeleted) {
      console.log('Successful deletion')
    } else {
      console.log('Unsuccessful deletion because there were no keys to delete')
    }
  }) 
  AsyncStorage.removeItem('UID1234')

}*/



let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()
let payload = epochTimeSeconds + 'some message'
const [isSuccess, setIsSuccess] = React.useState<boolean>(false);

const rnBiometricsSignature = () => {
  console.log('signature avant', payload);
 
  rnBiometrics.createSignature({
      promptMessage: 'Sign in',
      payload: payload
    })
    .then((resultObject) => {
      const { success, signature } = resultObject;
      console.log('signature', success, signature);
      console.log('signature', payload);

      AsyncStorage.getItem('UID1234', (err, result) => {
        console.log("Le resultat" + result);
        console.log("Le resultat" + result);
         if(result) {
          const userObject = JSON.parse(result)
          console.log("resultat" + userObject.name);
  
          auth()
          .signInWithEmailAndPassword(userObject.name, userObject.password)
          .then(() => {
            navigation.replace('Home');
          })
        } 
      });
      
 
      if (success) {
        console.log(signature)
        setIsSuccess(true);
        //verifySignatureWithServer(signature, payload)
      }
    })
    
}

  const rnBiometricsReact = () => {
    console.log("resultObject =================================================")
    
    rnBiometrics.biometricKeysExist()
      .then((resultObject) => {
        const { keysExist } = resultObject
        console.log("resultObject", resultObject)
        
        if (isSuccess !== true) {
          console.log();
        rnBiometricsSignature()
        }/* else {
          rnBiometricsPromptLog()
        } */

        if (keysExist) {
          console.log('Keys exist')
        } else {
          console.log('Keys do not exist or were deleted')
        }
      })
    }
 /*  const rnBiometricsPromptLog = () => {
rnBiometrics.simplePrompt({promptMessage: 'Confirm fingerprint'})
  .then((resultObject) => {
    const { success } = resultObject
    console.log('login')
    if (success) {
      console.log('successful biometrics provided')
      auth()
      .signInWithEmailAndPassword('thug@gmail.com', 'Ganggang')
      .then(() => {
        console.log('signed in!');
        navigation.replace('Home');
    })
    } else {
      console.log('user cancelled biometric prompt')
    }
  })
  .catch(() => {
    console.log('biometrics failed')
  })
 }  */



React.useEffect(() => {
  HandleBiometrics();
},[]) 
   
   const submitButtonLogin = (value: FormValuesSignUp) => {
    clearErrors();
      LoginUserBase(value, navigation)

      /* storeData(value, navigation) */

     /*  if(value) {
        AsyncStorage.setItem( 'UID123', JSON.stringify(UID123_object)),
        console.log(value.email)
      } else {
        console.log("Pas de user");
      } */

     
   }



   React.useEffect(() => {
    
   AsyncStorage.getItem('UID123', (err, result) => {
      console.log("Le resultat" + result);
      console.log("Le resultat" + result);
      /* if(result) {
        const userObject = JSON.parse(result)
        console.log("resultat" + userObject.name);

        auth()
        .signInWithEmailAndPassword(userObject.name, userObject.password)
        .then(() => {
          navigation.replace('Home');
        })
      } */
    });
   }, [])

/*    if (userID) {
    navigation.replace('Home');
  } */

   const submitButtonSignup = () => {
      navigation.navigate('SignUp');
   }

   const HandleForgot = () => {
      navigation.navigate('SendEmailForgotPassword');
   }



  return (
    <View style={styles.container}>
      <ImageBackground source={require("../assets/planete.jpeg")} style={styles.imageBackground}>
        <View style={styles.smallContainer}>
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
          <View style={styles.MotdePasse}>
            <Text style={{color: 'white', fontWeight: 'bold'}} onPress={HandleForgot}>Mot de passe oublié ?</Text>
          </View>
          <View style={styles.submitButtonStyle}>
            <ButtonSubmit title="Connexion" onPress={handleSubmit((value) => submitButtonLogin(value))} style={styles.buttonStyle} textStyle={styles.textStyle} />
          </View>
          <View style={styles.submitButtonStyle}>
            <ButtonSubmit title="Inscription" onPress={submitButtonSignup} style={styles.buttonInscriptionStyle} textStyle={styles.textStyle} />
              <TouchableOpacity style={{justifyContent: "flex-end", paddingVertical: 30, width: "100%", alignItems: "center"}} onPress={() => rnBiometricsReact()}>
                <Text><Image source={require('../assets/touchid-.png')} style={styles.imageTouch} /></Text>
              </TouchableOpacity>
             {/*  <TouchableOpacity style={{backgroundColor: "red", justifyContent: "center", paddingVertical: 10, width: "50%"}} onPress={() => rnBiometricsdelete()}>
                <Text>Empreinte delete</Text>
              </TouchableOpacity> */}
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
    marginBottom: 8,
    width: "100%",
    justifyContent: "center",
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
  },
  MotdePasse: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    left: 70,
  },
  imageTouch: {
    width: 80,
    height: 80,
  }
})




