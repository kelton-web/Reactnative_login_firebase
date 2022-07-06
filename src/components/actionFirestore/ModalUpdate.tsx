import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import InputAll from '../_Shared/InputAll';
import auth from '@react-native-firebase/auth';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { FormValuesSignUp } from '../../types/Types';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema, validationSchemaLogin, validationSchemaUpdate } from '../../yup/verify';
import ButtonSubmit from '../_Shared/ButtonSubmit';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigateParams } from "../../types/Types";
import { CreateUserBase, LoginUserBase } from '../../firebase/Auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';

interface modalType {
    Key: string
    password: string
    firstname: string
    lastname: string
    mail: string

}
type TypeUpdate = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const ModalUpdate: React.FC<modalType>= ({Key, lastname, mail, password, firstname}) => {

    const navigation = useNavigation<NativeStackNavigationProp<NavigateParams>>();
    const user = auth().currentUser;


    const {control, handleSubmit, clearErrors, formState: {errors}} = useForm<TypeUpdate>({
       resolver: yupResolver(validationSchemaUpdate),
       mode: 'onSubmit',
    })
 
    const submitButtonUpdate = (value: TypeUpdate) => {
     clearErrors();
     if(user) {
        firestore()
        .collection('Users')
        .doc(user.uid)
        .collection('compte')
        .doc(Key)
        .update({
            firstName: value.firstName,
            lastName: value.lastName,
            email: value.email,
            password: value.password,
        })
        .then(() => {
            console.log('User Update!' + Key);
            setModalVisible(!modalVisible)
           });
       }
    }
   

    
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Modifier les informations</Text>
            <View style={styles.smallcontainerInput}>
            <Controller control={control} name="firstName" render={({field: {onChange, value, onBlur}, fieldState: {error}}) => (
                <InputAll value={value} placeholder={firstname} type="text" onChangeText={onChange} error={!!error} errorDetails={error?.message} onBlur={onBlur}/>
            )} />
            </View>
            <View style={styles.smallcontainerInput}>
            <Controller control={control} name="lastName" render={({field: {onChange, value, onBlur}, fieldState: {error}}) => (
                <InputAll value={value} placeholder={lastname} type="text" onChangeText={onChange} error={!!error} errorDetails={error?.message} onBlur={onBlur}/>
            )} />
            </View>
            <View style={styles.smallcontainerInput}>
            <Controller control={control} name="email" render={({field: {onChange, value, onBlur}, fieldState: {error}}) => (
                <InputAll value={value} placeholder={mail} type="email" onChangeText={onChange} error={!!error} errorDetails={error?.message} onBlur={onBlur}/>
            )} />
            </View>
            <View style={styles.smallcontainerInput}>
            <Controller control={control} name="password" render={({field: {onChange, value, onBlur}, fieldState: {error}}) => (
                <InputAll value={value} placeholder={password} type="password" onChangeText={onChange} error={!!error} errorDetails={error?.message} onBlur={onBlur}/>
            )} />
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={handleSubmit((value) => submitButtonUpdate(value))}
            >
              <Text style={styles.textStyle}>Modifier</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: '100%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 90,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  smallcontainerInput: {
    width: "100%",
    marginVertical: 5
  }
});

export default ModalUpdate;