import { View, Text, Image, Alert } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import InputField from '@/components/InputField'
import { icons } from '@/constants'
import CustomButton from '@/components/CustomButton';
import { Link, router, useRouter } from 'expo-router'
import authenticationAPI from '@/apis/authApi'
import { Validate } from '@/utils/validate'
import { useDispatch } from 'react-redux'
import { addAuth } from '@/redux/reducers/authReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'



const SignIn = () => {
  const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState('')
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  // const onSignInPress = useCallback(async () => {
  //   if (!isLoaded) return

  //   // Start the sign-in process using the email and password provided
  //   try {
  //     const signInAttempt = await signIn.create({
  //       identifier: form.email,
  //       password: form.password,
  //     })

  //     // If sign-in process is complete, set the created session as active
  //     // and redirect the user
  //     if (signInAttempt.status === 'complete') {
  //       await setActive({ session: signInAttempt.createdSessionId })
  //       router.replace("/(root)/(tabs)/home");
  //     } else {
  //       // If the status isn't complete, check why. User might need to
  //       // complete further steps.
  //       console.error(JSON.stringify(signInAttempt, null, 2))
  //       Alert.alert("Error", "Log in failed. Please try again.");
  //     }
  //   } catch (err: any) {
  //     // See https://clerk.com/docs/custom-flows/error-handling
  //     // for more info on error handling
  //     console.error(JSON.stringify(err, null, 2))
  //     Alert.alert("Error", err.errors[0].longMessage);
  //   }
  // }, [ isLoaded,form.password, form.email])

  useEffect(() => {
    if (form.email || form.password) {
      setErrorMessage('')
    }
  }, [form.email, form.password])

  const handleLogin = async () => {

    const emailValidation = Validate.email(form.email)
    if (emailValidation) {
      try {
        const res = await authenticationAPI.handleAuthentitation('/login', {
          email: form.email,
          password: form.password
        },
          'post',
        )
        dispatch(addAuth(res.data))
        await AsyncStorage.setItem('auth',JSON.stringify(res.data))
        router.push('/');
      } catch (error) {
        console.log(error);

      }
    } else {
      setErrorMessage('Sai định dạng email')
    }

  }

  return (
    <SafeAreaView className=' bg-gray-100 h-full flex justify-between items-center'>

      <ScrollView showsVerticalScrollIndicator={false} className='my-[200px] rounded-[40px] flex-1 bg-white w-[90%] '>
        <View className='mt-20 flex-1 bg-white h-[80%]'>
          <View className=' justify-between items-center text-2xl text-black font-[Poppins-Bold]  mb-8'>
            <Text className='text-2xl text-[#5c83e4] font-bold'>Create Your Accout </Text>
            <Text className="text-base text-gray-600">Sign up to create a new accout</Text>
          </View>
          <View className='p-5'>
            <InputField
              labelStyle={undefined}
              placeholder="Email"
              icon={icons.email}
              value={form.email}
              onChangeText={(value) => setForm({ ...form, email: value })} />
            <InputField
              labelStyle={undefined}
              placeholder="Password"
              secureTextEntry={true}
              icon={icons.lock}
              value={form.password}
              onChangeText={(value) => setForm({ ...form, password: value })} />
            {errorMessage && (
              <View>
                <Text className='text-red-700 px-5'>{errorMessage}</Text>
              </View>
            )}

            <CustomButton title={'Log In'} className='mt-5' onPress={handleLogin} />
          </View>
          <Link href="/(auth)/sign-up" className='text-lg mt-10 text-center '>
            Don't have an account?
            <Text className='text-[#5c83e4]'> Sign up</Text>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>

  )
}

export default SignIn;
