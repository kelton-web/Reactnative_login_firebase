import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { NavigateParams } from '../types/Types';


const Home = () => {
    const navigation = useNavigation<NativeStackNavigationProp<NavigateParams>>();
  return (
    <View>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text>Home</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})