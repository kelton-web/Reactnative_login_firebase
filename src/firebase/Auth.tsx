import auth from "@react-native-firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 
import firestore from '@react-native-firebase/firestore';
import { NavigateParams, FormValuesSignUp } from '../types/Types';
import { login } from '../types/Interface';
import { Alert } from "react-native";


/* ********* Create User SignUp ****************/

export const CreateUserBase = (value: FormValuesSignUp, navigation: any) => {
    auth()
      .createUserWithEmailAndPassword(value.email, value.password)
      .then(() => {
        console.log('User account created & signed in!');
        navigation.navigate('Login', {email: value.email});
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


/* ********* Data FireStore Home ****************/

export const CreateDataFirestore = (value: FormValuesSignUp, navigation: any) => {
  // Add a new document in collection "cities"
   console.log(
      value.firstName + '\n' +
      value.lastName + '\n' +
      value.email + '\n' +
      value.password,
    );
  firestore()
  .collection('Users')
  .add({
    firstName: value.firstName, 
    lastName: value.lastName,
    email: value.email,
    password: value.password,
  })
  .then(() => {
    console.log('User added!');
  }).catch(error => {
      console.log('That database echoue!');
    

    console.error(error);
  });
      
}

/* ********* login ****************/

export const LoginUserBase = (value: FormValuesSignUp, navigation: any) => {
    auth()
      .signInWithEmailAndPassword(value.email, value.password)
      .then(() => {
        console.log('signed in!');
        navigation.navigate('Home',{email: value.email});
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

/* ********* sign out user ****************/

export const SignOut = (navigation: any) => {
  auth()
  .signOut()
  .then(() => {
    console.log('User signed out!')
    navigation.navigate('Login')
  });
}