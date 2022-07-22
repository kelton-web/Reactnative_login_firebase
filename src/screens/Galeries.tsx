import React, { useEffect, useState } from 'react';
import { View, Button, TouchableOpacity, Text, FlatList, Image, StyleSheet } from 'react-native';

import { utils } from '@react-native-firebase/app';
import storage, { FirebaseStorageTypes } from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';



export const Galeries = () => {
  const [upload, setUpload] = React.useState<any>(null);
  const [percentage, setpercentage] = React.useState<any>(0);
  const [allImages, setImages] = useState<any[]>([]);

  const arrayItems: string[] = [];
  
  function listFilesAndDirectories(reference: FirebaseStorageTypes.Reference): any {
    return reference.list().then((result: { items: any[]; nextPageToken: any; }) => {
      // Loop over each itemconst url = await storage().ref('images/profile-1.png').getDownloadURL();
      result.items.forEach((ref: { fullPath: any; }) => {

        console.log("mon path",ref.fullPath );
        arrayItems.push(ref.fullPath.substring(ref.fullPath.lastIndexOf('/') + 1))
      });
      console.log(arrayItems);
  
      return Promise.resolve();
    });
  }

   //1.
  
  
  const reference = storage().ref('images');
  
  listFilesAndDirectories(reference).then(() => {
    console.log('Finished listing');
  });




   const handleSubmitPicture = () => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      }).then(async image => {
        console.log(image);
        setUpload(image.path);          
        let imgName = image.path.substring(image.path.lastIndexOf('/') + 1);
        console.log(imgName);

        const reference = storage().ref("images/" + imgName);
        try {
          const task = reference.putFile(image.path);

          task.on('state_changed', taskSnapshot => {
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
            setpercentage(Math.round((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100))
          });

          task.then( () => {
            console.log('Image uploaded to the bucket!');
            const mDownloadUrl = storage()
             .ref('images')
             .getDownloadURL();
            console.log('Image Upload URL : ', mDownloadUrl);
           });
          }
         catch (error) {
          console.log(error);
        }
      });
    };  



    return (
    <View>
      <TouchableOpacity onPress={handleSubmitPicture}>
        <Text>Hello</Text>
      </TouchableOpacity>
      <Image source={{uri: upload}} style={styles.imageBackground}/>
      {percentage != 0 ?
        <Text>{percentage} % uploaded !</Text>
      : null }

  <Image source={require("../assets/charon.png")}  />
<View >
     {allImages.map((image) => {
        return (
           <View key={image} >
              <Image source={image}  />
              
           </View>
         );
        })}
</View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  containerImage:{
    width: "100%",
    height: 300,
    backgroundColor: "red",

  },
  imageBackground: {
    height: 100,
    width: 100,
  },
  listImage: {
    width: 300,
    height: 300,
  }
  });