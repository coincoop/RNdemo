import { Image, View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { images, icons } from '@/constants'
import authenticationAPI from '@/apis/authApi'
import { CardProps } from '@/types/type'

const FeaturedCard = ({ data, name, address, bed, bath, area, price, img, onPress }: CardProps) => {
  const testApi = async () => {
    try {

      console.log('res');

    } catch (error) {
      console.log(error);

    }
  }
  //Todo add props
  return (
    <FlatList
      className='flex flex-row'
      data={data}
      numColumns={data.length}
      columnWrapperClassName='gap-5'
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (

        <TouchableOpacity onPress={onPress} className='flex flex-col items-start w-[250px] h-[360px] rounded-2xl relative bg-white'>
          <View className='flex flex-row items-center mt-3 mx-auto'>
            {/* Prop :img */}
            <Image
              source={item.img}
              className='size-[230px] rounded-2xl'
            />
          </View>
          {/* Prop :name */}
          <Text className='mt-5 text-xl font-[Poppins-Bold] px-3'>
            {name}
          </Text>
          <View className='flex flex-row items-center justify-center '>

            <Image source={icons.location} className='h-8' resizeMode='contain' />

            {/* Prop :address */}
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.address}
            </Text>
          </View>
          {/* Prop :price */}
          <View className='flex flex-row items-center justify-between w-full mt-2 mb-2 px-3'>
            <Text className='text-xl font-[Poppins-Bold] '>
              {item.price}
            </Text>
          </View>
        </TouchableOpacity>

      )}

    />
    // <TouchableOpacity onPress={onPress} className='flex flex-col items-start w-[250px] h-[360px] rounded-2xl relative bg-white'>
    //   <View className='flex flex-row items-center mt-3 mx-auto'>
    //     {/* Prop :img */}
    //     <Image
    //       source={img}
    //       className='size-[230px] rounded-2xl'
    //     />
    //   </View>
    //   {/* Prop :name */}
    //   <Text className='mt-5 text-xl font-[Poppins-Bold] px-3'>
    //     {name}
    //   </Text>
    //   <View className='flex flex-row items-center justify-center '>

    //     <Image source={icons.location} className='h-8' resizeMode='contain' />

    //     {/* Prop :address */}
    //     <Text
    //       numberOfLines={1}
    //       ellipsizeMode="tail"
    //     >
    //       2/11 Ikbro Joer Condor lor
    //     </Text>
    //   </View>
    //   {/* Prop :price */}
    //   <View className='flex flex-row items-center justify-between w-full mt-2 mb-2 px-3'>
    //     <Text className='text-xl font-[Poppins-Bold] '>
    //       $2500
    //     </Text>
    //   </View>
    // </TouchableOpacity>
  )
}

const Card = () => {
  return (
    <TouchableOpacity className='flex w-full h-[130px] items-center justify-center rounded-3xl  bg-white'>
      <View className='flex flex-row '>
        {/* img */}
        <View className='flex items-center justify-center'>
          <Image
            source={images.house1}
            className='w-[110px] h-[110px] rounded-3xl'
            resizeMode='cover'
          />
        </View>

        {/* mô tả */}
        <View className=' m-5 w-[50%]'>

          <Text className='font-[Poppins-Bold] '>
            Passions Apartment
          </Text>
          <View className='flex flex-row'>
            <Image source={icons.location} className='h-6 w-6' resizeMode='contain' />

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
        {/* nút right arrow */}
        <View className='flex flex-col  h-full items-center'>
          <View className='flex-1' />
          <View className='pb-5'>
            <Image
              source={icons.next}
              className='w-6 h-6 bottom-0 right-0'
              resizeMode='contain'
            />
          </View>

        </View>
      </View>
    </TouchableOpacity>
  )
}

export { FeaturedCard, Card }


