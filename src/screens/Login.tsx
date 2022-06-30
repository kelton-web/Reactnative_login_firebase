import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';

const Login = () => {

   const ValidationSchema = Yup.object({
    email: Yup.string().email('Veuillez rentrez un mail valide').required('Veuillez rentrez votre mail'),
    password:  Yup.string().min(6,'Veuillez saisir au moins 6 caracteres').required('Veuillez saisir votre mot de passe'),
   })

   
  return (
    <View>
      
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})