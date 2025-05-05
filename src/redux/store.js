import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import authReducer from './authSlice'
import taskReducer from './taskSlice'

const store = configureStore({
    reducer: {
        users: userReducer,
        auth: authReducer,
        tasks: taskReducer
    }
})

export default store;
