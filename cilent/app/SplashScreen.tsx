import React from 'react';
import {ActivityIndicator, Image, ImageBackground} from 'react-native';
import {appInfo} from '../constants/appInfos';
import {images} from "@/constants/index"



const SplashScreen = () => {
  return (
  <ImageBackground
    source={images.splash}
    className='flex-1 justify-center items-center'
  >
    
  </ImageBackground>
  );
};

export default SplashScreen;