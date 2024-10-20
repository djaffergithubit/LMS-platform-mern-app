import { configureStore } from '@reduxjs/toolkit'
import showInputFieldReducer from "../states/showInputFieldSlice"
import tokenReducer from "../states/authTokenSlice"
import statusReducer from "../states/statusSlice"

export const Store = configureStore({
    reducer:{
        showInputField: showInputFieldReducer,
        authToken: tokenReducer,
        status: statusReducer
    }
})