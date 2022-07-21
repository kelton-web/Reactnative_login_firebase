import React, { useEffect, useState } from 'react';
import { View, Button, TouchableOpacity, Text } from 'react-native';

import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';


export const Galeries = () => {
  //const [upload, setUpload] = React.useState<any>('');

   const handleSubmitPicture = () => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      }).then(image => {
        console.log(image);
      });
    
    };  

   
  return (
    <View>
      <TouchableOpacity onPress={handleSubmitPicture}>
        <Text>Hello</Text>
      </TouchableOpacity>
    </View>
  );
}