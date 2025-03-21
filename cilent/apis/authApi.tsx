import { appInfo } from "@/constants/appInfos"
import axiosCilent from "./axiosCilent"

class AuthAPI {
    handleAuthentitation = async (
        url: string,
        data?: any,
        method?: 'get' | 'post' | 'put' | 'delete'
    )=>{
         return await axiosCilent(`${appInfo.BASE_URL}/auth${url}`,
            {
                method : method ?? 'get',
                data,
            }
         )
    }
    
}

const authenticationAPI = new AuthAPI()

export default authenticationAPI