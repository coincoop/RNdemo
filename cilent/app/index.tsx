import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from '../redux/store'; // Adjust the path to your store file
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import { addAuth, authSelector } from '@/redux/reducers/authReducer';

const index = () => {
  const [accessToken, setAccessToken] = useState('');
  const { getItem } = useAsyncStorage('auth');
  const dispatch = useDispatch()
  const auth = useSelector(authSelector)

  console.log(auth);
  

  useEffect(() => {
    const checkLogin = async () => {
      const res = await getItem();
      res && dispatch(addAuth(JSON.parse(res)))

    };
    checkLogin()
  },[]);

 

  console.log(auth.accessToken);
  

  if(auth.accessToken) return <Redirect href="/(root)/(tabs)/home" />;
  return <Redirect href="/(auth)/welcome" />

}

export default index;