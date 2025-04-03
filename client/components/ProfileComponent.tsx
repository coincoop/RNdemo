import { View, Text, Image } from 'react-native'
import React from 'react'
import { ProfileProps } from '@/types/type'

const ProfileComponent = ({ img_avatar, name }:ProfileProps) => {
    return (
        <View className='flex px-5 justify-center items-center'>
            <Image
                source={typeof img_avatar === 'string' ? { uri: img_avatar } : img_avatar}
                className='border-white border-2 rounded-full'
            />
            <View className='h-3'></View>
            <Text className='color-white text-2xl' >{name}</Text>
        </View>
    )
}

export default ProfileComponent