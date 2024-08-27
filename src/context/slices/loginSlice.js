import { createSlice } from "@reduxjs/toolkit";

const initialStates = {value: false}
export const loginSlice = createSlice({
    name: "loggedIn",
    initialState: {
        value: initialStates,
    },
    reducers: {
        setLoggedIn: (state) => {
            if (typeof state !== 'object' || !state.hasOwnProperty('value')) {
                state = { value: false }; // Reset the state to its correct structure
            }
            state.value = true;
        },
        setLoggedOut: (state) => {
            state.value = false
        }
    }
})
export const {setLoggedIn, setLoggedOut} = loginSlice.actions
export default loginSlice.reducer