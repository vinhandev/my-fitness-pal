import React, { useEffect } from 'react';
import { Camera as RNCamera, CameraType } from 'expo-camera';

import { Text, View } from 'react-native';

import { styles } from './Camera.styles';
import { Colors } from '../../assets';

export default function Camera() {
  const [permission, requestPermission] = RNCamera.useCameraPermissions();

  const handleTakePicture = () => {};

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <RNCamera style={{ flex: 1 }} />
    </View>
  );
}
