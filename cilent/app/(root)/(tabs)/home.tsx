import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link, router } from 'expo-router'
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useAuth } from "@clerk/clerk-expo";
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from '@/components/InputField';
import React, { useState } from 'react';
import { icons } from '@/constants';
import search from './search';
import SearchField from '@/components/SearchField';
import { FeaturedCard, Card } from '@/components/Card'


const Page = () => {
  const { user } = useUser()
  const { signOut } = useAuth();

  const cardData = [
    { id: '1', type: 'featured' },
    { id: '2', type: 'featured' },
    { id: '3', type: 'card' },
    { id: '4', type: 'card' },
  ];

  return (
    <SafeAreaView className='flex bg-gray-100 h-full'>
      <ScrollView>


        {/* <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <Link href="/(auth)/sign-in" onPress={async () => {
          await signOut(); // Đăng xuất user cũ
          console.log("Signed out!")
        }}>
          <Text>Sign out</Text>
        </Link>
      </SignedIn> */}
        {/* titile */}
        <View className='px-5 mt-5'>
          <Text className='font-[Poppins]'>
            Find The Best Place
          </Text>
          <Text className='text-2xl font-[Poppins-Bold]'>
            To Live <Text className='text-[#5c83e4]'> Luxury Life</Text>
          </Text>
        </View>
        {/* search 
        TODO modal filter
      */}
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
        <View className='my-5 px-5'>
          <View className='flex flex-row items-center'>
            <Text className='font-[Poppins-Bold] text-xl'>
              Categories
            </Text>
            <TouchableOpacity className='ml-auto' >
              <Text className='font-[Poppins] text-[#5c83e4]'>
                See all
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* featured card */}


        <View className='my-5 px-5 flex flex-row gap-5'>
          <FeaturedCard />
          <FeaturedCard />
        </View>
        {/* near you */}
        <View className='my-5 px-5'>
          <View className='flex flex-row items-center'>
            <Text className='font-[Poppins-Bold] text-xl'>
              Near you
            </Text>
            <TouchableOpacity className='ml-auto' >
              <Text className='font-[Poppins] text-[#5c83e4]'>
                See all
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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