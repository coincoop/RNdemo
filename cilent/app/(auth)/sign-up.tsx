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

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState('')
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

  useEffect(() => {
    if (form.name || form.email || form.password) {
      setErrorMessage('')
    }
  }, [form.name, form.email, form.password])

  // clerk  // Handle submission of sign-up form
  // const onSignUpPress = async () => {
  //   if (!isLoaded) return
  //   if (form.password !== form.confirmPassword) {
  //     Alert.alert('Error', 'Passwords do not match');
  //     return;
  //   }

  //   // Start sign-up process using email and password provided
  //   try {
  //     await signUp.create({
  //       emailAddress: form.email,
  //       password: form.password,
  //     })

  //     // Send user an email with verification code
  //     await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

  //     // and capture OTP code
  //     setVerification({
  //       ...verification,
  //       state: 'pending',
  //     })
  //   } catch (err: any) {
  //     // See https://clerk.com/docs/custom-flows/error-handling
  //     // for more info on error handling
  //     console.log(JSON.stringify(err, null, 2));
  //     Alert.alert("Error", err.errors[0].longMessage);

  //   }
  // }

  // // Handle submission of verification form
  // const onVerifyPress = async () => {
  //   if (!isLoaded) return

  //   try {
  //     // Use the code the user provided to attempt verification
  //     const signUpAttempt = await signUp.attemptEmailAddressVerification({
  //       code: verification.code,
  //     })

  //     // If verification was completed, set the session to active
  //     if (signUpAttempt.status === 'complete') {
  //       //TODO create a db user
  //       await fetchAPI("/(api)/user",{
  //         method: "POST",
  //         body: JSON.stringify({
  //           name: form.name,
  //           email: form.email,
  //           clerkId: signUpAttempt.createdUserId
  //         })
  //       })

  //       // await setActive({ session: signUpAttempt.createdSessionId })

  //       setVerification({ ...verification, state: "success" })
  //       setShowSuccessModal(true);
  //     } else {
  //       // If the status is not complete, check why. User may need to
  //       // complete further steps.
  //       setVerification({ ...verification, error: "Verification Failed", state: "failed" })
  //     }
  //   } catch (err: any) {
  //     setVerification({ ...verification, error: err.message, state: "failed" })
  //   }
  // }
  const handleRegister = async () => {
    const { email, name, password, confirmPassword } = form

    const emailValidation = Validate.email(email)
    const passValidation = Validate.Password(password)

    if (name && email && password && confirmPassword) {
      if (emailValidation && passValidation) {
        setErrorMessage('')
        setIsLoading(true)
        try {
          const res = await authenticationAPI.handleAuthentitation(
            '/register',
            {
              name: form.name,
              email: form.email,
              password: form.password
            },
            'post'
          )
          dispatch(addAuth(res.data))
          await AsyncStorage.setItem('auth', JSON.stringify(res.data))
          setIsLoading(false)
          router.push('/');
        } catch (error) {
          console.log(error);
          setIsLoading(false)
        }
      } else {
        setErrorMessage('Email không đúng!')
      }
    } else {
      setErrorMessage('Vui lòng nhập đầy đủ thông tin')
    }
  }



  return (
    <SafeAreaView className=' bg-gray-100 h-full flex justify-between items-center'>

      <ScrollView className='my-40 rounded-[40px] flex-1 bg-white w-[90%] '>
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
              onChangeText={(value) => setForm({ ...form, name: value })} />

            {/* Input email */}
            <InputField
              labelStyle={undefined}
              placeholder="Email"
              icon={icons.email}
              value={form.email}
              onChangeText={(value) => setForm({ ...form, email: value })} />

            {/* Input password */}
            <InputField
              labelStyle={undefined}
              placeholder="Password"
              secureTextEntry={true}
              icon={icons.lock}
              value={form.password}
              onChangeText={(value) => setForm({ ...form, password: value })} />

            {/* Input confirm password */}
            <InputField
              labelStyle={undefined}
              placeholder="Confirm Password"
              secureTextEntry={true}
              icon={icons.lock}
              value={form.confirmPassword}
              onChangeText={(value) => setForm({ ...form, confirmPassword: value })} />
            {errorMessage && (
              <View>
                <Text className='text-red-700 px-5'>{errorMessage}</Text>
              </View>
            )}
            <CustomButton title={'Sign Up'} onPress={handleRegister}
              className='mt-6'></CustomButton>

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
                console.log('test');
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
                Your account has been created successfully. Please sign in now
              </Text>

              {/* Browse to sign in */}
              <CustomButton
                title={'Browse Sign In'}
                onPress={async () => {
                  setShowSuccessModal(false);
                  router.push('/(auth)/sign-in')
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