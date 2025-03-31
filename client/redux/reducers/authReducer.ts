import { createSlice } from "@reduxjs/toolkit";

interface AuthState{
    id: String,
    email:String,
    accessToken: String,
}

const initialState:AuthState = {
    id: '',
    email: '',
    accessToken: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState:{
        authData: initialState
    },
    reducers:{
        addAuth: (state, action)=>{
            state.authData.id = action.payload.id,
            state.authData.email = action.payload.email,
            state.authData.accessToken = action.payload.accessToken
        },
        removeAuth:(state)=>{
            // state.authData = initialState
            state.authData.id = ''
            state.authData.email =''
            state.authData.accessToken= ''
        },
    },
})

export const authReducer = authSlice.reducer
export const {addAuth, removeAuth} = authSlice.actions

export const authSelector = (state: any ) => state.authReducer.authData