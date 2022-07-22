import React, { useEffect, useState } from 'react';
import { View, Button, TouchableOpacity, Text, FlatList, Image, StyleSheet, ScrollView } from 'react-native';

import { utils } from '@react-native-firebase/app';
import storage, { FirebaseStorageTypes } from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import ButtonSubmit from '../components/_Shared/ButtonSubmit';



export const Galeries = () => {
  const [upload, setUpload] = React.useState<any>(null);
  const [percentage, setpercentage] = React.useState<any>(0);
  const [allImages, setAllImages] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState<any>(false);
  const [isImport, setIsImport] = useState<any>(true);

  const urlArray: string[] = [];
  
  function listFilesAndDirectories(reference: FirebaseStorageTypes.Reference): any {
    return reference.list().then((result: { items: any[]; }) => {
      
      result.items.forEach(async (ref: { fullPath: any; }) => {
       const url = await storage().ref(ref.fullPath).getDownloadURL();
      urlArray.push(url);
      setAllImages(urlArray);
    });
  });
}

const reference = storage().ref('images');
useEffect(() => {
  listFilesAndDirectories(reference).then(() => {
    console.log('Finished listing');
    
    });
},[upload])





   const handleSubmitPicture = () => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      }).then(async image => {
        console.log(image);
        let imgName = image.path.substring(image.path.lastIndexOf('/') + 1);
        console.log(imgName);
        
        const reference = storage().ref("images/" + imgName);
        const task = reference.putFile(image.path);
        setUpload(image.path);          
        try {

          task.on('state_changed', taskSnapshot => {
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
            setpercentage(Math.round((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100))
          });

          task.then( async () => {
            console.log('Image uploaded to the bucket!');
            const mDownloadUrl = storage()
             .ref('images/' + imgName)
            
           });
          }
         catch (error) {
          console.log(error);
        }
      });
      HandleStateInverse();
    };  


   const handleSubmitCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      }).then(async image => {
        console.log(image);
        let imgName = image.path.substring(image.path.lastIndexOf('/') + 1);
        console.log(imgName);
        
        const reference = storage().ref("images/" + imgName);
        const task = reference.putFile(image.path);
        setUpload(image.path);
        try {

          task.on('state_changed', taskSnapshot => {
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
            setpercentage(Math.round((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100))
          });

          task.then( async () => {
            console.log('Image uploaded to the bucket!');
            const mDownloadUrl = storage()
             .ref('images/' + imgName)
            
           });
          }
         catch (error) {
          console.log(error);
        }
      });
      HandleStateInverse();

    };  

/*     const getUploadImages = async () => {
      //const url = await storage().ref('images/').getDownloadURL();
      const urlArray: any[] = [];
      urlArray.push(url);
      setImages([...urlArray]);
      console.log('Image Upload URL : ', url);
      console.log('Image Upload URL : ', allImages);
    } */

    const renderItem = ({item} :  {item:string}) => {
      return (
              <Image source={{uri: item}} style={{width:100,height : 100, margin: 3}}/>
      )
    }
   
const HandleState = () => {
  setIsVisible(true);
  setIsImport(false)
}
const HandleStateInverse = () => {
  setIsVisible(false);
  setIsImport(true)
}



  return (
    <View style={styles.container}>
      {percentage != 0 ?
        <Text>{percentage} % uploaded !</Text>
      : null } 

    
          <FlatList
            data={allImages}
            renderItem={renderItem}
            numColumns={3}
          />
      {isVisible &&(

      <View style={styles.containerImport}>
        <ButtonSubmit title="Import galerie" onPress={handleSubmitPicture} style={styles.buttonStyle} textStyle={styles.textStyle} />
        <ButtonSubmit title="Prendre une photo" onPress={handleSubmitCamera} style={styles.buttonStyle} textStyle={styles.textStyle} />
        <Text style={styles.StyleAnnule} onPress={HandleStateInverse}>Annuler</Text>
      </View>
      )}
      {isImport && (
        <Text style={styles.StyleAnnule} onPress={() => HandleState()}>Import</Text>
      )}
     
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  imageBackground: {
    height: 100,
    width: 100,
  },
  listImage: {
    width: 300,
    height: 300,
  },
  containerImport: {
    height: 200,
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  buttonStyle: {
    height: 50,
    width: "80%",
    backgroundColor: "rgba(38, 222, 129,1.0)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "3%",

  },
  textStyle: {
      fontSize: 20
  },
  StyleAnnule: {
    fontSize: 18,
    width: "100%",
    textAlign: "center",
    paddingTop: "8%",
  }
  });