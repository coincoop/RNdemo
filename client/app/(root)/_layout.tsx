import React from 'react';
import "../../global.css";
import {Drawer} from "expo-router/drawer"
import DrawerCustom from '@/components/DrawerCustom';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './(tabs)/home';
import { images } from '@/constants';
import { useSelector } from 'react-redux';
import { authSelector } from '@/redux/reducers/authReducer';

const Layout = () => {
  const auth = useSelector(authSelector)
  console.log(auth);
  
  return (
    <Drawer screenOptions={{
      headerShown: false
    }}
      drawerContent={() => <DrawerCustom img_avatar={images.avatar} name={auth.name} />}
    >
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: "Home",
            title: "Home"
          }}
       
        />
    </Drawer>
  );
};

export default Layout;