import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: "loggedIn",
    initialState: {
        value: false,
    },
    reducers: {
        setLoggedIn: (state) => {
            state.value = true
        },
        setLoggedOut: (state) => {
            state.value = false
        }
    }
})
export const {setLoggedIn, setLoggedOut} = loginSlice.actions
export default loginSlice.reducer