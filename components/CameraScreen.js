import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CameraFront = ({navigation,route}) =>{
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestCameraPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);
    
      const takePicture = async () => {
        if (cameraRef) {
          const photo = await cameraRef.takePictureAsync();
          setCapturedImage(photo.uri);
          const {request} = route.params;
          navigation.navigate(`${request}`,{ capturedImage: photo.uri });
        }
      };
    
      if (hasPermission === null) {
        return <View />;
      }
    
      if (hasPermission === false) {
        return <Text>No access to camera</Text>;
      }
      return(
            <Camera style={{ position: 'absolute', width: windowWidth, height: windowHeight}} type={Camera.Constants.Type.front} ref={(ref) => setCameraRef(ref)}>
              <View style={{width: '100%', height: 100, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 0}}>
                <View style={{width: 70, height: 70, backgroundColor: 'white', borderRadius: '100%', alignItems: 'center', justifyContent: 'center'}}>
                  <TouchableOpacity onPress={takePicture} style={{width: 60, height: 60, backgroundColor: 'white', borderRadius: '100%', borderColor: 'black', borderWidth: 2}}></TouchableOpacity>
                </View>
              </View>
            </Camera>
      );
}

export default CameraFront