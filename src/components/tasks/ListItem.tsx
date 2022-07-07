import { Image, StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import ButtonSubmit from '../_Shared/ButtonSubmit';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import ModalUpdate from '../actionFirestore/ModalUpdate';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { arrayPlanete } from '../../utils/DataPlanete';



interface PropsType {
    firstname: string
    lastname: string
    mail: string
    password: string
    Key: any;
    onPress: (key: string) => void,
}

//auth().currentUser.delete(), il me semble
const ListItem: React.FC<PropsType> = ({firstname, lastname, mail, password, onPress, Key}) => {
    const [isVisible, setIsvisible] =useState<boolean>(false)
    const [isLock, setIsLock] = useState<boolean>(false);
    
    let rand = Math.floor(Math.random()*arrayPlanete.length);
    let rValue = arrayPlanete[rand];
    //console.log("mon array" + rValue)

    // const user = auth().currentUser;
const isVisibleFunction = () => {
    setIsvisible(!isVisible);
}

  return (
    <View style={styles.container}>
        <View style={styles.smallContainer}>
            <View style={styles.containeLogo}>
                <Image source={rValue} style={styles.logo} />
            </View>
            <View style={styles.styleInfoDelete}>

                <View style={styles.containerInfo}>
                    <View>
                        <View style={styles.containNameStyle}>
                            <Text style={styles.textNameStyle}>{firstname + " "}<Text style={{fontSize: 13}}>{`(${lastname})`}</Text></Text>
                        </View>
                        <View style={styles.separator}/>
                        <View>
                            <Text style={{color: 'white'}}>{mail}</Text>
                        </View>
                        <View style={{}}>
                           {isLock ? <Text style={{color: 'lightgray', marginBottom: 5}}>{password}</Text> : <Text style={{color: 'lightgray', marginBottom: 5}}>********</Text> }
                           <View style={{position: 'absolute', right: 0}}>
                           {isLock ?  <Text><Ionicons name='eye-off' size={20} color='white' onPress={() => setIsLock(!isLock)} /></Text> : <Text><Ionicons name='eye' size={20} color='white' onPress={() => setIsLock(!isLock)} /></Text> }
                           </View>
                        </View>
                    </View>
                </View>
                <View style={styles.containerButton}>
                    <View  style={{ top: 8,right: 0, position: 'absolute',  zIndex: 8}}>
                        <Text><Ionicons name='ellipsis-vertical' size={28} color='white' onPress={isVisibleFunction} /></Text>
                    </View>
                    {isVisible && (
                        <View style={{height: '100%', width: '100%',}}>
                            <ModalUpdate Key={Key} firstname={firstname} lastname={lastname} mail={mail} password={password}/>
                            <Text style={{top: -10}}><Icon name='delete' size={28} color='white' onPress={() => onPress(Key)} /></Text>
                        </View>
                    )}

                </View>
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
        width: "90%",
        flexDirection: "row",
        height: 120,
        justifyContent: "space-between",
    },
    containerInfo: {
        
       
    },
    containeLogo: {
        flex: .5,
        justifyContent: "center",
        alignItems: "flex-start",
        width: "100%",
        zIndex: 9
    },
    styleInfoDelete: {
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center",
        backgroundColor: "rgba(48, 51, 107,1.0)",
        borderRadius: 10,
        width: "85%",
        paddingLeft: "15%",
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
          fontSize: 12,
      },
      containerButton: {
        height: "100%",
        paddingHorizontal: 5,
      },
      containNameStyle: {
        marginBottom: 10
      },
      textNameStyle: {
        fontSize: 20,
        fontWeight: "600",
        top: 5,
        color: "white"
      },
      separator: {
        width: 50,
        height: 2,
        backgroundColor: "rgba(15, 188, 249,1.0)",
        marginBottom: 10
      },
      logo: {
        width: 90,
        height: 90,
        borderRadius: 50,
        resizeMode: "cover"
        
      }
})