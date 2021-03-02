import axios from 'axios'
import { resetError, setError } from '../slice/errorSlice';
import { loaderOff, loaderOn } from '../slice/loaderSlice';

import { addMessage,setMessages} from '../slice/messagesSlice'


axios.defaults.baseURL = 'http://localhost:2000';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const getMessagesOperation=()=>async(dispatch)=>{
    try {
         dispatch(resetError())
       dispatch(loaderOn()) 
       const result=await axios.get('/messages')
       dispatch(setMessages(result.data))
   
       
    } catch (error) {
        dispatch(setError(error.message))
    }finally{
        dispatch(loaderOff())
       
    }
}

export const addMessageOperation=(messages)=>async(dispatch)=>{
    try {
        dispatch(resetError())
        dispatch(loaderOn())
         await axios.post('/messages',messages).then(data=>dispatch(addMessage(data.data)))
  
    
    } catch (error) {
        dispatch(setError(error.message))
    }finally{
        dispatch(loaderOff())
        
    }
}
