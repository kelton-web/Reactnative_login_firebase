import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import  { createNativeStackNavigator }  from  '@react-navigation/native-stack' ;
import Home from '../screens/Home';
import SignUp from '../screens/SignUp';
import SecondSignUp from '../screens/SecondSignUp';
import ForgotPassword from '../screens/ForgotPassword';
import Login from '../screens/Login';
import { NavigateParams } from '../types/Types';

const Stack = createNativeStackNavigator<NavigateParams>();

const Navigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="SignUp">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="SecondSignUp" component={SecondSignUp} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})