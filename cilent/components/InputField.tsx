import { KeyboardAvoidingView, View, Text, Image, TextInput, Keyboard } from "react-native"
import { TouchableWithoutFeedback } from "react-native"
import { InputFieldProps } from "@/types/type";


const InputField = ({ labelStyle, icon, secureTextEntry = false,
  containerStyle, inputStyle, iconStyle, className, ...props
}: InputFieldProps) => (
  <KeyboardAvoidingView>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className='my-5 w-full '>
        <View className={`flex flex-row items-center relative bg-neutral-100 justify-start rounded-full border border-neutral-100 focus:border-primary-500 ${containerStyle}`}>
          {icon && <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />}
          <TextInput
            className={`rounded-full p-4 text-[15px] flex-1 ${inputStyle} text-left`}
            secureTextEntry={secureTextEntry}
            {...props}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
)

export default InputField