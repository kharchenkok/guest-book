import { combineReducers } from "redux";

// import formMessageSlice from "./formMessageSlice";
import messagesSlice from "./messagesSlice";
import errorSlice from "./errorSlice";
import loaderSlice from "./loaderSlice";


const rootReducer=combineReducers({
    messages:messagesSlice,
    error:errorSlice,
    loader:loaderSlice
})

export default rootReducer