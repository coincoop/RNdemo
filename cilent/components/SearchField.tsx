import { KeyboardAvoidingView, View, Text, Image, TextInput, Keyboard } from "react-native"
import { TouchableWithoutFeedback } from "react-native"
import { InputFieldProps } from "@/types/type";


const SearchField = ({ labelStyle, icon, secureTextEntry = false,
  containerStyle, inputStyle, iconStyle, className, ...props
}: InputFieldProps) => (
  <KeyboardAvoidingView className="w-[80%]">
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className='my-5 w-full'>
        <View className={`flex flex-row items-center relative bg-white justify-start rounded-[15px] border border-neutral-100 focus:border-primary-500 ${containerStyle}`}>
          {icon && <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />}
          <TextInput
            className={`rounded-full p-4 font-Poppins-Bold text-[15px] flex-1 ${inputStyle} text-left`}
            secureTextEntry={secureTextEntry}
            {...props}
          />
        </View>
      </View>

    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
)

export default SearchField