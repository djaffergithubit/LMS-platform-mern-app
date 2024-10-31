import { createSlice } from '@reduxjs/toolkit'

const initialState = JSON.parse(localStorage.getItem('authToken')) || ''

const tokenSlice = createSlice({
    name: 'authToken',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state = action.payload
            localStorage.setItem('authToken', JSON.stringify(state))
            return state
        },
        removeToken: (state, action) => {
            localStorage.removeItem('authToken')
            return ''
        }
    }
})

export const selectToken = state => state.authToken
export const { setToken, removeToken } = tokenSlice.actions
export default tokenSlice.reducer