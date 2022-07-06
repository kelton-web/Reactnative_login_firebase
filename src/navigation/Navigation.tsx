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

const Stack = createNativeStackNavigator<NavigateParams>();

const Navigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ModalUpdate" component={ModalUpdate} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="AddInfo" component={AddInfo} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})