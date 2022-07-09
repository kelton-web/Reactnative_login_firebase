import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import  { createNativeStackNavigator }  from  '@react-navigation/native-stack' ;
import Home from '../screens/Home';
import SignUp from '../screens/SignUp';
import ForgotPassword from '../screens/ForgotPassword';
import Login from '../screens/Login';
import { NavigateParams } from '../types/Types';
import AddInfo from '../components/actionFirestore/AddInfo';
import ModalUpdate from '../components/actionFirestore/ModalUpdate';
import SendEmailForgotPassword from '../screens/SendEmailForgotPassword';

const Stack = createNativeStackNavigator<NavigateParams>();

const Navigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Home" component={Home} options={{ title: 'Accueil' }}/>
            <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Inscription' }}/>
            <Stack.Screen name="Login" component={Login} options={{ title: 'Se connecter' }}/>
            <Stack.Screen name="ModalUpdate" component={ModalUpdate} options={{ title: 'Modifier les informations' }}/>
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="AddInfo" component={AddInfo} options={{ title: 'Ajouter une informations' }}/>
            <Stack.Screen name="SendEmailForgotPassword" component={SendEmailForgotPassword} options={{ title: 'Mot de passe oublié' }}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})