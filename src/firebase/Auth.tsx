import auth from "@react-native-firebase/auth";

import { NavigateParams, FormValuesSignUp } from '../types/Types';


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


export const SignOut = (navigation: any) => {
  auth()
  .signOut()
  .then(() => {
    console.log('User signed out!')
    navigation.navigate('Login')
  });
}