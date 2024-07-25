import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./slices/users/authSlice"
export const  store = configureStore({
      reducer: {
        users:authSlice,
    },
  })