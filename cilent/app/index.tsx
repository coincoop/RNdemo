
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
  const { getItem } = useAsyncStorage('auth');
  const dispatch = useDispatch()
  const auth = useSelector(authSelector)

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await getItem();
        if (res) {
          res && dispatch(addAuth(JSON.parse(res)))
        }
      } catch (error) {
        console.error(error);
      }
      setIsRegister(true)
      setIsLoading(false);
    };
    checkLogin()
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

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