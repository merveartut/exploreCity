import { createSlice } from "@reduxjs/toolkit";

export const citySlice = createSlice({
    name: "city",
    initialState: {
        value: {
            label: "",
            value: "",
            coord:""
        },
    },
    reducers: {
        setCity: (state, action) => {
            console.log("aaaaaa", action.payload)
           state.value = action.payload
        },
    }
})
export const {setCity} = citySlice.actions
export default citySlice.reducer