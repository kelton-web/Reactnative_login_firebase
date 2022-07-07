
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SignOut, CreateDataFirestore, getAllFirestore } from '../firebase/Auth';
import React, { useEffect, useState } from "react";
import { FlatList, ImageBackground, StyleSheet, Text, View, Image } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormValuesSignUp } from '../types/Types';
import InputAll from "../components/_Shared/InputAll";
import ButtonSubmit from '../components/_Shared/ButtonSubmit';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigateParams } from "../types/Types";
import { CreateUserBase } from "../firebase/Auth";
import { validationSchemaHome } from "../yup/verify";
import firestore from '@react-native-firebase/firestore';
import { isTemplateElement } from '@babel/types';
import auth from '@react-native-firebase/auth';
import ListItem from '../components/tasks/ListItem';
import ModalUpdate from '../components/actionFirestore/ModalUpdate';


const Home = () => {

interface datafirestoreType {
    firstname: string;
    lastname: string;
    mail: string;
    password: string;
    key: any;
}

const navigation = useNavigation<NativeStackNavigationProp<NavigateParams>>();
const route = useRoute<RouteProp<NavigateParams>>();

const [userData, setUserData] = useState<datafirestoreType[]>([]);
const LookFacebook = () => {
  navigation.push('AddInfo');
};
const user = auth().currentUser;

useEffect(() => {
  if(user) {
    firestore()
    .collection('Users')
    .doc(user.uid)
    .collection('compte')
    .onSnapshot((querySnapshot) => {

      console.log('Total users: ', querySnapshot.size);
  
      const userInfoAll: datafirestoreType[] = [];
  
      querySnapshot.forEach(documentSnapshot => {
        console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
        let info = documentSnapshot.data();
        userInfoAll.push(
          {
            firstname: info.firstName,
            lastname: info.lastName,
            mail: info.email,
            password: info.password,
            key: documentSnapshot.id,
          }
        )
        //setIsLoading(true)
      });
      setUserData(userInfoAll)
    })
    
        
  }
}, [])



console.log("My data is : ",userData);

  const DeleteInfo = (key: string) => {
    if(user) {
        firestore()
        .collection('Users')
        .doc(user.uid)
        .collection('compte')
        .doc(key)
        .delete()
        .then(() => {
            console.log('User deleted!' + key);
          });
    }
}



const _renderItemAll = ({item}: {item: datafirestoreType}) => {
  return (
    <View>
      <ListItem 
      firstname={item.firstname}
      lastname={item.lastname}
      mail={item.mail}
      password={item.password}
      Key={item.key}
      onPress={(key) =>DeleteInfo(key)}
      />
    </View>
  )
}

  return (
        <ImageBackground source={require('../assets/planete.jpeg')} style={styles.imageBackground} >
            <View style={styles.container}>
              <View style={styles.infoStyle}>
                <Text style={{color: 'white'}}>Hello {route.params?.email}</Text>
                <Text style={{color: 'white'}} onPress={() => SignOut(navigation)}>Déconnexion</Text>
              </View>
              <View style={styles.containerAlien}>
                <Image source={require('../assets/alien1.png')} style={styles.alienStyle}/>
              </View>
              <View style={styles.containerInfoFirestore}>
                <View style={styles.styleFlatlist}>
                  <FlatList
                    data={userData}
                    renderItem={_renderItemAll}
                    keyExtractor={item => item.key}
                    />
                  </View>
                  <View style={styles.btnStyle}>
                    <ButtonSubmit onPress={() => LookFacebook()} title="Add Info" style={styles.buttonStyle} textStyle={styles.textStyle}/>
                  </View>
              </View>
            </View>
        </ImageBackground>
  )
}

export default Home

const styles = StyleSheet.create({
  imageBackground: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
    alignItems: "center",
  },
  container: {
   flex: 1,
   width: "100%",
   justifyContent: "space-between",
  },
  infoStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 1)",
    height: 30,
    width: "100%"
  },
  containerInfoFirestore: {
    width: "100%",
    height: "80%",
    flex: 1,
    justifyContent: "center",
    marginBottom: 20,
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
  styleFlatlist: {
    width: "100%",
    height: "80%",
  },
  btnStyle: {
    top: 20
  },
  containerAlien: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    top: 25,
    right: 5,
  },
  alienStyle: {
    width: "100%",
    height: 200,
    resizeMode: "contain"
  }

})