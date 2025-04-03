import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { DrawerProps } from '@/types/type'
import { icons } from '@/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector, removeAuth } from '@/redux/reducers/authReducer'
import { router } from 'expo-router'
import ProfileComponent from './ProfileComponent'
import { FlatList } from 'react-native-gesture-handler'

const DrawerCustom = ({ img_avatar, name }: DrawerProps) => {
    const auth = useSelector(authSelector)
    const dispatch = useDispatch()

    const drawerMenu = [
        {
            key: 'Setting',
            title: 'Setting',
            icon: icons.setting
        },
        {
            key: 'Activities',
            title: 'Activities',
            icon: icons.activities
        },
        {
            key: 'Saved Property',
            title: 'Saved Property',
            icon: icons.heart
        },
        {
            key: 'Location',
            title: 'Location',
            icon: icons.location
        },
        {
            key: 'Terms',
            title: 'Terms & Conditions',
            icon: icons.terms
        },
        {
            key: 'Helps',
            title: 'Helps Line',
            icon: icons.customer
        },
    ]

    const handleLogout = async () => {
        await AsyncStorage.setItem("auth", JSON.stringify({ email: auth.email }));
        dispatch(removeAuth())
        router.push('/')
    }
    return (
        <View style={{ backgroundColor: Colors.blue }} className='flex-1 p-10'>
            {/* avatar + name */}
            <ProfileComponent img_avatar={img_avatar} name={name} />

            <View className='h-10' />
            <FlatList
                data={drawerMenu}
                className='flex-1'
                renderItem={({ item }) => (
                    <View>

                        <TouchableOpacity key={item.key} className='flex flex-row items-center gap-5 p-2'>
                            <Image
                                className='h-5 w-5'
                                source={item.icon}
                                tintColor={'white'}
                                resizeMode='contain'
                            />
                            <Text className='text-white font-[Poppins-Bold]'>
                                {item.title}
                            </Text>

                        </TouchableOpacity>
                        <View className='h-3' />
                        <View style={{height: 0.5, backgroundColor: 'white', width: 200} }/>
                        <View className='h-3' />
                    </View>

                )}
                keyExtractor={(item) => item.key}

            />

            <View className='flex-start'>
                <TouchableOpacity onPress={handleLogout}>
                    <View className='flex flex-row items-center gap-5'>
                        <Image
                            className='h-5 w-5'
                            source={icons.logout}
                            tintColor={'white'}
                            resizeMode='contain'
                        />
                        <Text className='text-white font-[Poppins-Bold]'>
                            Logout
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DrawerCustom