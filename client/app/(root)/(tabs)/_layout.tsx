import { Image, View, Text, ImageSourcePropType } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { icons } from '@/constants'

const TabIcon = ({ source, focused }: { source: ImageSourcePropType, focused: boolean }) => {
    return (

        <View className={`flex flex-row justify-center items-center `} >
            <View className={` w-12 h-12 items-center justify-center relative`} >
                <Image
                    source={source}
                    tintColor={`${focused ? '#ffffff' : '#c3c3c3'}`}
                    resizeMode='contain'
                    className='w-7 h-7 absolute' 
                />
            </View>
        </View>
    );
}

const Layout = () =>
    <Tabs initialRouteName='home'
        screenOptions={{
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'white',
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: '#5c83e4',
                borderRadius: 20,
                paddingBottom: 25,
                overflow: 'hidden',
                marginHorizontal: 20,
                marginBottom: 20,
                height: 78,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                position: 'absolute',

            }
        }}>
        <Tabs.Screen
            name='home'
            options={{
                title: 'Home',
                headerShown: false,
                tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.home} />
            }}
        />
        <Tabs.Screen
            name='search'
            options={{
                title: 'Search',
                headerShown: false,
                tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.search} />
            }}
        />
        <Tabs.Screen
            name='chat'
            options={{
                title: 'Chat',
                headerShown: false,
                tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.chat} />
            }}
        />
        <Tabs.Screen
            name='list'
            options={{
                title: 'List',
                headerShown: false,
                tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.list} />
            }}
        />
        <Tabs.Screen
            name='profile'
            options={{
                title: 'Profile',
                headerShown: false,
                tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.profile} />
            }}
        />
    </Tabs >;



export default Layout