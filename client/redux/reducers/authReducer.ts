import { createSlice } from "@reduxjs/toolkit";

interface AuthState{
    id: String,
    email:String,
    accessToken: String,
    name: String
}

const initialState:AuthState = {
    id: '',
    email: '',
    accessToken: '',
    name: ''
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
            state.authData.name = action.payload.name
        },
        removeAuth:(state)=>{
            // state.authData = initialState
            state.authData.id = ''
            state.authData.email =''
            state.authData.accessToken= ''
            state.authData.name=''
        },
    },
})

export const authReducer = authSlice.reducer
export const {addAuth, removeAuth} = authSlice.actions

export const authSelector = (state: any ) => state.authReducer.authData