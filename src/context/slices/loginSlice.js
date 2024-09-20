import { createSlice } from "@reduxjs/toolkit";

const initialState = {loggedIn: false, user: null}
export const loginSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoggedIn: (state, action) => {
            if (typeof state !== 'object') {
                state = { loggedIn: false, user: null }; // Reset the state to its correct structure
            }
            state.loggedIn = true
            state.user = action.payload
        },
        setLoggedOut: (state) => {
            state.loggedIn = false
            state.user = null
        }
    }
})
export const {setLoggedIn, setLoggedOut} = loginSlice.actions
export default loginSlice.reducer



