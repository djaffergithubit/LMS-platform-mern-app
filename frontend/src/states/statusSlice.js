import { createSlice } from "@reduxjs/toolkit"

const initialState = JSON.parse(localStorage.getItem('status')) || false

const statusSlice = createSlice({
    initialState,
    name: 'status',
    reducers: {
        setStatus: (state, action) => {
            const { newStatusValue } = action.payload
            state = newStatusValue
            localStorage.setItem('status', JSON.stringify(state))
            return state
        }
    }
})

export const status = state => state.status
export const { setStatus } = statusSlice.actions
export default statusSlice.reducer