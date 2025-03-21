import { View, Text, Modal, ActivityIndicator } from 'react-native'
import React from 'react'
import { LoadingModalProps } from '@/types/type'
import { Colors } from '@/constants/Colors'

const LoadingModal = ({ visible, mess,}: LoadingModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
    >
      <View className='bg-[rgba(0,0,0,0.3)] flex-1 justify-center items-center'>
        <ActivityIndicator color={Colors.blue} size={'large'}/>
        <Text className={`items-center justify-center text-[#D8D8D8] text-xl`}>
          Loading
        </Text>
      </View>
    </Modal>
  )
}

export default LoadingModal