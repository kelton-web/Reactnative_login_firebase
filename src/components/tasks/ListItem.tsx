import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ButtonSubmit from '../_Shared/ButtonSubmit';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import ModalUpdate from '../actionFirestore/ModalUpdate';

interface PropsType {
    firstname: string
    lastname: string
    mail: string
    password: string
    Key: any;
    onPress: (key: string) => void,
    onPressIn: (key: string) => void,
}
//auth().currentUser.delete(), il me semble
const ListItem: React.FC<PropsType> = ({firstname, lastname, mail, password, onPress, onPressIn, Key}) => {
console.log('key', Key);
   // const user = auth().currentUser;

  return (
    <View style={styles.container}>
        <View style={styles.smallContainer}>
            <View style={{flex: 1, marginLeft: 6}}>
                <View>
                    <Text>{firstname + ' ' + lastname}</Text>
                </View>
                <View>
                    <Text>{mail}</Text>
                </View>
                <View>
                    <Text>{password}</Text>
                </View>
            </View>
            <View style={styles.containerButton}>
                <ModalUpdate Key={Key} firstname={firstname} lastname={lastname} mail={mail} password={password}/>
                <ButtonSubmit onPress={() => onPress(Key)} title="Delete Info" style={styles.buttonStyleOne} textStyle={styles.textStyle}/>
            </View>
        </View>
    </View>
  )
}

export default ListItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 5,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    smallContainer: {
        flexDirection: "row",
        backgroundColor: "rgba(220, 221, 225,1.0)",
        width: "90%",
        
    },
    buttonStyle: {
        paddingHorizontal: 5,
        paddingVertical: 5,
        backgroundColor: "rgba(38, 222, 129,1.0)",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 8
      },
    buttonStyleOne: {
        paddingHorizontal: 5,
        paddingVertical: 5,
        backgroundColor: "rgba(255, 82, 82,1.0)",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 8
      },
      textStyle: {
          fontSize: 12
      },
      containerButton: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 10,
      },
})