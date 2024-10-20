import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    false,
    false,
    false,
    false,
    false,
    false
]

const showInputFieldSlice = createSlice({
    name: 'showInputField',
    initialState,
    reducers: {
        setInputField: (state, action) => {
            console.log('i\'m here');
            console.log('index', action.payload.inputFieldIndex);
            state[action.payload.inputFieldIndex] = !state[action.payload.inputFieldIndex]
        },

        getIndexValue: (state, action) => {
            return state[action.payload.inputFieldIndex]
        }
    }
})

export const { setInputField, getIndexValue } = showInputFieldSlice.actions
export const selectInputFieldValue = state => state.showInputField
export default showInputFieldSlice.reducer