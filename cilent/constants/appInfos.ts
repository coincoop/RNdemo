import { Dimensions } from "react-native";

export const appInfo ={
    size :{
        WIDTH: Dimensions.get('window').width,
        HEIGHT: Dimensions.get('window').height,
    },
    BASE_URL: 'http://192.168.1.6:3001',
}
