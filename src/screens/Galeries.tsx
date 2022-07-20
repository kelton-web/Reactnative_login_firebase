import React, { useEffect } from 'react';
import { View, Button, TouchableOpacity, Text } from 'react-native';

import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import { PermissionsAndroid, Platform } from "react-native";
import CameraRoll from "@react-native-community/cameraroll";
import useState from 'react';


export const Galeries = () => {
  //const [upload, setUpload] = React.useState<any>('');

   const handleSubmitPicture = () => {
    console.log("hello");
    
   /*  CameraRoll.getPhotos({
        first: 20,
        assetType: 'Photos',
      })
      .then(r => {
        setUpload(r);
      })
      .catch((err) => {
         //Error Loading Images
      }); */
    };  

   
  return (
    <View>
      <TouchableOpacity onPress={handleSubmitPicture}>
        <Text>Hello</Text>
      </TouchableOpacity>
    </View>
  );
}