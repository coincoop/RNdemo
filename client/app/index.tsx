
import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';
import { addAuth, authSelector } from '@/redux/reducers/authReducer';
import SplashScreen from './SplashScreen';

const index = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const dispatch = useDispatch()
  const auth = useSelector(authSelector)

  useEffect(() => {

    //dùng để clear cái email
    const resetStorage = async () => {
      await AsyncStorage.removeItem("auth");
      console.log("Đã xóa dữ liệu cũ trong AsyncStorage!");
    }
    //
    // resetStorage()
    //
    
    checkLogin()
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 1500);
    
    return () => clearTimeout(timeout);
  }, [auth.email]);
  const checkLogin = async () => {
    const  resAsync = await  AsyncStorage.getItem('auth');
    
    try {
      resAsync && dispatch(addAuth(JSON.parse(resAsync)));
    } catch (error) {
      console.error(`lỗi ở index ${error}`);
    }
    // console.log('lấy từ redux 1', auth);
    setIsRegister(!!auth.email)
    setIsLoading(false);
  };

  return (
    <>
      {isLoading || isShowSplash ? (
        <SplashScreen />
      ) : auth.accessToken ? (
        <Redirect href="/(root)/(tabs)/home" />
      ) : !isRegister ? (
        <Redirect href="/(auth)/welcome" />
      ) : (
        <Redirect href="/(auth)/sign-in" />
      )
      }
    </>
  );

}

export default index;