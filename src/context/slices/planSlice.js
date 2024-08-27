import { createSlice } from "@reduxjs/toolkit";

export const planSlice = createSlice({
    name: "plan",
    initialState: {
        value: [],
    },
    reducers: {
        setPlan: (state, action) => {
           state.value = action.payload
        },
        clearPlan: (state) => {
            state.value = []
        },
        addItem:(state, action) => {
            state.value.push(action.payload)
        },
        deleteItem: (state, action) => {
            state.value = state.value.filter(item => item.id !== action.payload.id)
        }
    }
})
export const {setPlan, clearPlan, addItem, deleteItem} = planSlice.actions
export default planSlice.reducer