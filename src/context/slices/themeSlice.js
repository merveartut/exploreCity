import { createSlice } from "@reduxjs/toolkit";

const initialStates = "light"
export const themeSlice = createSlice({
    name: "theme",
    initialState: { value: initialStates},
    reducers: {
        setTheme: (state, action) => {
            state.value = action.payload
        }
    }
})
export const {setTheme} = themeSlice.actions
export default themeSlice.reducer