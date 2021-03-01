import { createSlice } from "@reduxjs/toolkit";
const initialState = []

const messagesSlice=createSlice({
    name:"messages",
    initialState,
    reducers:{
        addMessage(state, action) {
           return action.payload
          
        },
        setMessages(state,action){
            return action.payload
        },
    
    }
})

const {actions,reducer} = messagesSlice
export const{addMessage,setMessages}=actions

export default reducer