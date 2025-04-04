import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { CategoryProps } from '@/types/type'

const Category = ({title, onPress}:CategoryProps) => {
    return (
        <View className='px-5'>
            <View className='flex flex-row items-center'>
                <Text className='font-[Poppins-Bold] text-xl'>
                    {title}
                </Text>
                <TouchableOpacity className='ml-auto' onPress={onPress}>
                    <Text style={{ color: Colors.blue }} className={`font-[Poppins]`}>
                        See all
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Category