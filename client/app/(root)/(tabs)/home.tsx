
import { Link, router } from 'expo-router'
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import { icons } from '@/constants';
import { Colors } from '@/constants/Colors';
import search from './search';
import SearchField from '@/components/SearchField';
import { FeaturedCard, Card } from '@/components/Card'
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, removeAuth } from '@/redux/reducers/authReducer';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import Category from '@/components/Category';


const Page = () => {
  const auth = useSelector(authSelector)
  const dispatch = useDispatch()

  useEffect(() => {

    //fix lỗi gì gì đó cũng  ko biết nữa
    const checkAccessToken = async () => {
      try {
        if (auth.accessToken == null) {
          console.log(auth.accessToken);
          router.push('/')
        }
      } catch (error) {
        console.error(error);
      }
      checkAccessToken()
    };
  }, [auth.accessToken]);
  console.log('Màu sắc được sử dụng:', Colors.blue);
  console.log(`text-[${Colors.blue}]`);

  return (
    <SafeAreaView style={{ backgroundColor: `${Colors.graylight}` }} className='flex h-full'>
      <ScrollView>
        {/** App bar  */}
        <View className='flex flex-row items-center justify-center h-20 px-5'>
          <TouchableOpacity className='rounded-xl flex justify-center items-center bg-white w-10 h-10' >
            <Image
              source={icons.menu}
              resizeMode='contain'
              tintColor='black'
              className='w-5 h-5' alt="" />
          </TouchableOpacity>
          <TouchableOpacity className='flex flex-1 justify-center items-center'>
            <View className='flex flex-row'>
              <Image
                source={icons.location}
                resizeMode='contain'
                tintColor={Colors.blue}
                className='w-4 h-5' />
              <Text>Location</Text>
              <Image
                source={icons.arrow_down}
                resizeMode='contain'
                tintColor={Colors.blue}
                className='w-4 h-5' />
            </View>
            <Text className='font-bold'>Tp.Hồ chí Minh</Text>
          </TouchableOpacity>
          <TouchableOpacity className='flex rounded-xl justify-center items-center bg-white h-10 w-10'>
            <View>
              <Image
                source={icons.bell}
                resizeMode='contain'
                tintColor='black'
                className='w-8 h-8' alt="" />
              <View className='bg-red-600 w-3 h-3 rounded-2xl absolute top-0 right-0'></View>
            </View>
          </TouchableOpacity>

        </View>
        {/* xóa sao này -- dùng để đăng xuất và hiển thị email  */}
        <View>
          <Text>{auth.email}</Text>
          <Link href="/(auth)/sign-in" onPress={async () => {
            await AsyncStorage.setItem("auth", JSON.stringify({ email: auth.email }));
            dispatch(removeAuth())
          }}>
            <Text>Sign out</Text>
          </Link>
        </View>
        {/* titile */}
        <View className='px-5 mt-5'>
          <Text className='font-[Poppins]'>
            Find The Best Place
          </Text>
          <Text className='text-2xl font-[Poppins-Bold]'>
            To Live <Text style={{ color: `${Colors.blue}` }} > Luxury Life</Text>
          </Text>
        </View>
        {/* search  TODO modal filter*/}
        <View className='px-5 flex-row flex items-center'>
          <SearchField
            icon={icons.search}
            placeholder="Search home..."

            onPress={() => router.push('/search')}
          />
          <View className='w-[50px] h-[50px] bg-[#5c83e4] ml-5 rounded-[15px] items-center justify-center shadow-lg shadow-blue-500/50'>
            <Image
              source={icons.filter}
              resizeMode='contain'
              tintColor='#ffffff'
              className='w-10 h-10 absolute'
            />
          </View>
        </View>
        {/* Categires */}
        <Category title='Featured Property' onPress={() => console.log('Featured Property')
        } />
        {/* featured card */}
        <View className='my-5 px-5 flex flex-row gap-5'>
          <FeaturedCard />
          <FeaturedCard />
        </View>
        {/* near you */}
        <Category title='Near You' onPress={() => console.log('hello')
        } />
        {/* card */}
        <View className='my-5 px-5 gap-5'>
          <Card />
          <Card />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
export default Page