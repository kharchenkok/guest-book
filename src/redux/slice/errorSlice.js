import { createSlice } from "@reduxjs/toolkit";
const initialState=''

 const errorSlice=createSlice({
    name:'error',
    initialState,
    reducers:{
        setError(state,{payload}){
            return payload
        },
        resetError(state,{payload}){
            return initialState
        }
    }
})

const {actions,reducer} = errorSlice
export const{setError,resetError}=actions

export default reducer