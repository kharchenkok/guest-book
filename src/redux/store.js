
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slice/rootReducer";

const store = configureStore({
  reducer: rootReducer,
});

export default store;