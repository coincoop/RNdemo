import { View, Text, TouchableOpacity, Image } from 'react-native';
import '../../global.css'
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Touchable } from 'react-native';
import { router } from 'expo-router';
import Swiper from 'react-native-swiper';
import { useRef } from 'react';
import { onboarding } from '@/constants';
import CustomButton from '@/components/CustomButton';

const Welcome = () => {
  const swiperRef = useRef<Swiper>(null)
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;


  return (
    <SafeAreaView className='flex h-full justify-between items-center bg-white'>
      <TouchableOpacity onPress={() => {
        router.replace('/(auth)/sign-up')
      }}
        className=' w-full flex justify-end items-end p-5'
      >
        <Text className='text-black text-md font-[Poppins]'>Skip</Text>
      </TouchableOpacity>
      <Swiper className=' '
        ref={swiperRef}
        loop={false}
        dot={<View className=' w-[10px] h-[10px] mx-2 bg-[#d8d8d8] rounded-full' />}
        activeDot={<View className='w-[10px] h-[10px] mx-2 bg-[#5c83e4] rounded-full' />}
        onIndexChanged={(index) => { setActiveIndex(index) }}
      >
        {onboarding.map((item) => (
          <View key={item.id} className='flex items-center  justify-center p-4'>
            <Image
              source={item.img}
              className='w-full h-5/6 '
              resizeMode='contain'
            />
            <View className='px-10' >
              <Text className='text-base text-center uppercase font-[Poppins] text-black-200 '>{item.description}</Text>
              <Text className='text-3xl text-center mt-2 font-[Poppins-Bold] text-black-400'>{item.title}</Text>
            </View>
          </View>
        ))}
      </Swiper>
      <CustomButton title={isLastSlide ? "Get Started" : "Next"}
        onPress={() =>
          isLastSlide
            ? router.replace("/(auth)/sign-up")
            : swiperRef.current?.scrollBy(1)
        } className="w-11/12 mb-10"/>
    </SafeAreaView>
  );
}

export default Welcome; 