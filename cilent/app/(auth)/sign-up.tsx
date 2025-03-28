import { View, Text, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import InputField from '@/components/InputField'
import { icons } from '@/constants'
import CustomButton from '@/components/CustomButton';
import { Link, useRouter } from 'expo-router'
import { useAuth, useSignUp } from '@clerk/clerk-expo'
import { ReactNativeModal } from 'react-native-modal'
import { images } from '@/constants'
import { fetchAPI } from '@/lib/fetch'
import LoadingModal from '@/components/LoadingModal'
import authenticationAPI from '@/apis/authApi'
import { Validate } from '@/utils/validate'
import { useDispatch, useSelector } from 'react-redux'
import { addAuth, authReducer, authSelector } from '@/redux/reducers/authReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ErrorMessages } from "@/types/type";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [codeVerification, setCodeVerification] = useState('')
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [isDisable, setIsDisable] = useState(true)
  const router = useRouter()
  const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState<any>()
  const [verification, setVerification] = React.useState({
    state: "default",
    error: "",
    code: "",

  })

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  useEffect(()=>{
    if(!errorMessage || errorMessage && (errorMessage.email || errorMessage.name || errorMessage.password || errorMessage.confirmPassword || !form.name || !form.email || !form.password || !form.confirmPassword)){
      setIsDisable(true)
    }else{
      setIsDisable(false)
    }


  },[errorMessage])

  //đăng kí
  const handleRegister = async () => {
    setIsLoading(true)
    const api = '/verification'
    try {
      const res = await authenticationAPI.handleAuthentitation(api, {email: form.email}, 'post')
      setVerification({
        ...verification,
        state: "pending",
      });
      setCodeVerification(res.data.code)
      console.log(res);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      
    }
  }

  //xác nhận mã 
  const handleVerification = async()=>{
    setIsLoading(true)
    if(verification.code == codeVerification){
      try {
        const res = await authenticationAPI.handleAuthentitation('/register',{name : form.name, email: form.email, password: form.password}, 'post')
        dispatch(addAuth(res.data))
        await AsyncStorage.setItem('auth', JSON.stringify(res.data))
        console.log(res);
      } catch (error) {
        console.log(error);
        
      }
      setVerification({
        ...verification,
        state: "success",
      });
      setIsLoading(false)
    }else{
      setVerification({
        ...verification,
        error: "Nhập sai mã xác nhận",
      });
      setIsLoading(false)
    }
  }

  //validation form
  const formValidation = (key: string) => {
    const data = { ...errorMessage }
    let message = ``

    switch (key) {
      case 'email':
        if (!form.email) {
          message = `Yêu cầu nhập email`
        } else if (!Validate.email(form.email)) {
          message = `Email không hợp lệ`
        } else {
          message = ``
        }
        break
      case 'password':
        if (!form.password) {
          message = `Yêu cầu nhập mật khẩu`
        }
        else {
          message = ``
        }
        break
      case 'name':
        if (!form.name) {
          message = `Yêu cầu nhập tên người dùng`
        }
        else {
          message = ``
        }
        break
      case 'confirmPassword':
        if (!form.confirmPassword) {
          message = `Yêu cầu nhập lại mật khẩu`
        } else if (form.password !== form.confirmPassword) {
          message = `Mật khẩu không giống nhau`
        }
        else {
          message = ``
        }
        break
    }
    data[`${key}`] = message
    setErrorMessage(data)
  }


  return (
    <SafeAreaView className=' bg-gray-100 h-full flex justify-between items-center'>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className='my-40 rounded-[40px] flex-1 bg-white w-[90%] '
      >
        <View className='mt-10 flex-1 bg-white h-[80%]'>
          <View className=' justify-between items-center text-2xl text-black font-[Poppins-Bold]  mb-8'>
            <Text className='text-2xl text-[#5c83e4] font-bold'>Create Your Accout </Text>
            <Text className="text-base text-gray-600">Sign up to create a new accout</Text>
          </View>
          <View className='p-5 '>

            {/* Input name */}
            <InputField
              labelStyle={undefined}
              placeholder="Name"
              icon={icons.person}
              value={form.name}
              onChangeText={(value) => setForm({ ...form, name: value })}
              onEnd={() => formValidation('name')}
            />
            {/* Input email */}
            <InputField
              labelStyle={undefined}
              placeholder="Email"
              icon={icons.email}
              value={form.email}
              onChangeText={(value) => setForm({ ...form, email: value })}
              onEnd={() => formValidation('email')}
            />

            {/* Input password */}
            <InputField
              labelStyle={undefined}
              placeholder="Password"
              secureTextEntry={true}
              icon={icons.lock}
              value={form.password}
              onChangeText={(value) => setForm({ ...form, password: value })}
              onEnd={() => formValidation('password')}
            />

            {/* Input confirm password */}
            <InputField
              labelStyle={undefined}
              placeholder="Confirm Password"
              secureTextEntry={true}
              icon={icons.lock}
              value={form.confirmPassword}
              onChangeText={(value) => setForm({ ...form, confirmPassword: value })}
              onEnd={() => formValidation('confirmPassword')}
            />
            {errorMessage && (
              <View>
                {Object.keys(errorMessage).map((error, index) => (
                  errorMessage[`${error}`] && (
                    <Text
                      key={`error${index}`}
                      className='text-red-700 px-5'
                    >
                      {errorMessage[`${error}`]}
                    </Text>
                  )
                ))}
              </View>
            )}
            <CustomButton
              title={'Sign Up'}
              onPress={handleRegister}
              className='mt-6'
              disable={isDisable}
            />

            <Link href="/(auth)/sign-in" className='text-lg mt-10 text-center '>
              Already have an account?
              <Text className='text-[#5c83e4]'> Log In</Text>
            </Link>
          </View>

          {/* Modal when verification is pending */}
          <ReactNativeModal isVisible={verification.state === 'pending'}
            onModalHide={() => {
              if (verification.state === 'success') setShowSuccessModal(true)
            }}>
            <View className='bg-white px-7 py-9 rounded-2xl min-h-[300px]'>
              <Text className='text-3xl text-center font-[Poppins-Bold] mb-2 text-[#5c83e4]'>Verification</Text>
              <Text className='[font-Poppins] mb-5 px-5 text-center'>
                We have sent a verification code to {form.email}. Please enter the code below
              </Text>
              <InputField
                labelStyle={undefined}
                placeholder="Verification Code"
                icon={icons.lock}
                value={verification.code}
                keyboardType='numeric'
                onChangeText={(value) => setVerification({ ...verification, code: value })} />

              {/* /**Error message */}
              {verification.error && <Text className='text-red-500'>{verification.error}</Text>}

              <CustomButton title={'Verify Email'} onPress={() => {
                handleVerification();
              }} className='mt-5 bg-[#5c83e4]' />
            </View>

          </ReactNativeModal>

          {/* Modal when verification is successful */}
          <ReactNativeModal isVisible={showSuccessModal} >
            <View className='bg-white px-7 py-9 rounded-2xl min-h-[300px]'>
              <Image source={images.check} className='w-[110px] h-[110px] mx-auto my-5' />
              <Text className='text-3xl text-[#5c83e4] font-[Poppins-Bold] text-center'>
                Congratulations!
              </Text>
              <Text className='text-base px-5 text-center text-gray-400 font-[Poppins] mt-2'>
                Your account has been created successfully.
              </Text>

              {/* Browse to sign in */}
              <CustomButton
                title={'Browse to Main'}
                onPress={async () => {
                  setShowSuccessModal(false);
                  router.push('/')
                }}
                className='mt-5 bg-[#5c83e4]'
              />


            </View>
          </ReactNativeModal>

        </View>
      </ScrollView>
      <LoadingModal visible={isLoading} />
    </SafeAreaView>

  )
}

export default SignUp