import auth from "@react-native-firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 
import firestore from '@react-native-firebase/firestore';
import { NavigateParams, FormValuesSignUp } from '../types/Types';
import * as React from 'react';
import { AsyncStorage } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';

const user = auth().currentUser?.uid;




/* ********* Create User SignUp ****************/

const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true })

export const CreateUserBase = (value: FormValuesSignUp, navigation: any) => {
    auth()
      .createUserWithEmailAndPassword(value.email, value.password)
      .then(() => {
        console.log('User account created & signed in!');
        let UID123_object = {
          name: value.email,
          password: value.password,
        };
       
           AsyncStorage.setItem( 'UID123', JSON.stringify(UID123_object)),
           console.log(value.email)
        navigation.navigate('Home', {email: value.email, password: value.password});

        rnBiometrics.createKeys()
        .then((resultObject) => {
          const { publicKey } = resultObject
          console.log(publicKey)
        })
        let UID1234_object = {
          name: value.email,
          password: value.password,
          publicKey: value.publicKey,
        };
        AsyncStorage.setItem( 'UID1234', JSON.stringify(UID1234_object)),
        console.log(value.email, value.password, value.publicKey);

      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('Cette adresse email est déjà utilisée !');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('Le mail est ne correspond à aucun compte !');
        }
        if (error.code === 'auth/wrong-password') {
          console.log('Le mot de passe correspond à aucun compte !');
        }

        //console.error(error);
      });
}


/* ********* Data FireStore Home ****************/

export const CreateDataFirestore = (value: FormValuesSignUp, navigation: any) => {
  // Add a new document in collection "cities"
  const user = auth().currentUser;
   console.log(
      value.firstName + '\n' +
      value.lastName + '\n' +
      value.email + '\n' +
      value.password,
    );
    if(user) {
  firestore()
  .collection('Users')
  .doc(user.uid)
  .collection('compte')
  .add({
    firstName: value.firstName, 
    lastName: value.lastName,
    email: value.email,
    password: value.password,
  })
  .then(() => {
    console.log('User added!');
    navigation.navigate('Home'); 
  }).catch(error => {
      console.log('That database echoue!');
    

    console.error(error);
  });
  }
}

/* ********* login ****************/

export const LoginUserBase = (value: FormValuesSignUp, navigation: any) => {
    auth()
      .signInWithEmailAndPassword(value.email, value.password)
      .then(() => {
        console.log('signed in!');
        navigation.replace('Home',{email: value.email});

        let UID123_object = {
          name: value.email,
          password: value.password,
        };
           AsyncStorage.setItem( 'UID123', JSON.stringify(UID123_object)),
           console.log(value.email)


           let UID1234_object = {
            name: value.email,
            password: value.password,
            publicKey: value.publicKey,
          };
          AsyncStorage.setItem( 'UID1234', JSON.stringify(UID1234_object)),
          console.log(value.email, value.password, value.publicKey);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('Cette adresse email est déjà utilisée !');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('Le mail est ne correspond à aucun compte !');
        }
        if (error.code === 'auth/wrong-password') {
          console.log('Le mot de passe correspond à aucun compte !');
        }
        if (error.code === 'auth/user-not-found') {
          console.log('L\'utilisateur existe pas !');
        }

        console.error(error);
      });


    }
    
    
    
/* ********* sign out user ****************/

export const SignOut = (navigation: any) => {
  auth()
  .signOut()
  .then(() => {
    console.log('User signed out!')
    AsyncStorage.removeItem('UID123')
    navigation.replace('Login')
  });
}
/* ********* get firestore ****************/

export const getAllFirestore = () => {
  firestore()
  .collection('Users')
  .get()
  .then(querySnapshot => {
    console.log('Total users: ', querySnapshot.size);

    querySnapshot.forEach(documentSnapshot => {
      console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
    });
  });
}