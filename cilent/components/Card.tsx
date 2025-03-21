import { Image, View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { images, icons } from '@/constants'
import authenticationAPI from '@/apis/authApi'

const FeaturedCard = () => {
  const testApi = async () => {
    try {
      const res = await authenticationAPI.handleAuthentitation('/hello')
      console.log(res);
      
    } catch (error) {
      console.log(error);

    }
  }


  //Todo add props
  return (
    <TouchableOpacity onPress={testApi}  className='flex flex-col items-start w-[250px] h-[360px] rounded-2xl relative bg-white'>
      <View className='flex flex-row items-center mt-3 mx-auto'>
        {/* Prop :img */}
        <Image
          source={images.house2}
          className='size-[230px] rounded-2xl'
        />
      </View>
      {/* Prop :name */}
      <Text className='mt-5 text-xl font-[Poppins-Bold] px-3'>
        Villa Cottage
      </Text>
      <View className='flex flex-row items-center justify-center '>

        <Image source={icons.location} className='h-8' resizeMode='contain' />

        {/* Prop :address */}
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          2/11 Ikbro Joer Condor lor
        </Text>
      </View>
      {/* Prop :price */}
      <View className='flex flex-row items-center justify-between w-full mt-2 mb-2 px-3'>
        <Text className='text-xl font-[Poppins-Bold] '>
          $2500
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const Card = () => {
  return (
    <TouchableOpacity className='flex flex-col w-full h-[120px] items-center justify-center rounded-2xl  bg-white'>
      <View className='flex flex-row  '>
        <View className='size-[120px] items-center justify-center'>
          <Image
            source={images.house1}
            className='w-[110px] h-[110px] rounded-2xl'
          // resizeMode='contain'
          />
        </View>


        <View className=' m-5 w-[50%]'>

          <Text className='font-[Poppins-Bold] '>
            Passions Apartment
          </Text>
          <View className='flex flex-row'>
            <Image source={icons.location} className='h-8' resizeMode='contain' />

            {/* Prop :address */}
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              2/11 Ikbro Joer Condor lor
            </Text>
          </View>
          <View className='flex flex-row items-center justify-between w-full mt-2 mb-2'>
            <Text className='text-xl font-[Poppins-Bold] '>
              $2500
            </Text>
          </View>
        </View>
        <View className='h-full  items-center'>
          <View className='mt-20'>
            <Image
              source={icons.next}
              className='w-6 h-6'
              resizeMode='contain'
            />
          </View>

        </View>
      </View>
    </TouchableOpacity>
  )
}

export { FeaturedCard, Card }


