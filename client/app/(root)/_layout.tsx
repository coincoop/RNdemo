import React from 'react';
import "../../global.css";
import {Drawer} from "expo-router/drawer"


const Layout = () => {
  return (
    <Drawer screenOptions={{
      headerShown: false
    }}>
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