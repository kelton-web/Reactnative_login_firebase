import React, { useEffect, useState } from 'react';
import { View, Button, TouchableOpacity, Text, FlatList, Image, StyleSheet, ScrollView } from 'react-native';

import { utils } from '@react-native-firebase/app';
import storage, { FirebaseStorageTypes } from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import ButtonSubmit from '../components/_Shared/ButtonSubmit';
import auth from '@react-native-firebase/auth';




export const Galeries = () => {
  const [upload, setUpload] = React.useState<any>(null);
  const [percentage, setpercentage] = React.useState<number>(0);
  const [allImages, setAllImages] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isImport, setIsImport] = useState<boolean>(true);
  const [isZoom, setIsZoom] = useState<boolean>(false);
  const [valueZoom, setValueZoom] = useState<any>(null);

  const userUid = auth().currentUser?.uid;
  const urlArray: string[] = [];
  
  function listFilesAndDirectories(reference: FirebaseStorageTypes.Reference): any {
    return reference.list().then((result: { items: any[]; }) => {

      result.items.forEach(async (ref: { fullPath: string; }) => {
        console.log(ref.fullPath);
        
       storage().ref(ref.fullPath).getDownloadURL().then((downloadURL) => {
         urlArray.push(downloadURL);
         console.log("url",downloadURL);

         
         setAllImages(urlArray);
       })
    });
  });
}

const reference = storage().ref(`${userUid}/images`);
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
        
        const reference = storage().ref(`${userUid}/images/${imgName}`);
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
             .ref(`${userUid}/images/${imgName}`)
            
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
        
        const reference = storage().ref(`${userUid}/images/${imgName}`);
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



    const lookDelete = (item: string) => {
      setValueZoom(item);
      setIsZoom(true);
      setIsImport(false)
    }
    const renderItem = ({item} :  {item:string}) => {
      return (
        <TouchableOpacity onPress={() => lookDelete(item)}>
          <Image source={{uri: item}} style={{width:100,height : 100, margin: 3}}/>
        </TouchableOpacity>
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
const AnnuleZoom = () => {
  setIsZoom(false);
  setIsImport(true)
}
const SupprimeZoom = () => {
  let Name = valueZoom.substring(114, 154);
      console.log(valueZoom);
     storage().ref(`${userUid}/images/${Name}`).delete().then(() => {
      console.log("      File deleted successfully ");
       const newArray = allImages;
        const index = newArray.indexOf(Name);
        newArray.splice(index, 1);
        console.log(newArray);
        setIsZoom(false);
        setIsImport(true)
        listFilesAndDirectories(reference).then(() => {
          console.log('Finished listing');
          });
      }).catch((error) => {
        console.log("      Uh-oh, an error occurred!     ");
      }); 
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
            keyExtractor={(item: string) => item}
          />
          {isZoom && 
            (
              <View style={styles.ViewPicture}>
                <Image source={{uri: valueZoom}} style={{width: "100%",height : "100%", margin: 3}}/>
                <View style={{width: "100%",flexDirection: "row", justifyContent: "space-around"}}>
                  <ButtonSubmit title="Annuler" onPress={AnnuleZoom} style={styles.buttonStyleOne} textStyle={styles.textStyle} />
                  <ButtonSubmit title="Supprimer" onPress={SupprimeZoom} style={styles.buttonStyleTwo} textStyle={styles.textStyle} />
                </View>
              </View>
            )

          }
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
  buttonStyleTwo: {
    height: 50,
    width: 150,
    backgroundColor: "red",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "3%",
  },
  buttonStyleOne: {
    height: 50,
    width: 150,
    backgroundColor: "white",
    borderWidth: 1,
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
  },
  ViewPicture: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
  }
  });