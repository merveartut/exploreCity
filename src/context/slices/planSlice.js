import { createSlice } from "@reduxjs/toolkit";

export const planSlice = createSlice({
    name: "plan",
    initialState: { plan:[], planId: ""},
    reducers: {
        setPlan: (state, action) => {
           state.plan = action.payload
        },
        setPlanId: (state, action) => {
            console.log("neymiş", action)
            console.log("önceden buymş", state.planId)
            state.planId = action.payload.toString()
        },
        clearPlan: (state) => {
            state = {
                plan: [],
                planId: ""
            };
        },
        addItem:(state, action) => {
            state.plan.push(action.payload)
        },
        deleteItem: (state, action) => {
            state.plan = state.plan.filter(item => item.id !== action.payload.id)
        }
    }
})
export const {setPlan, clearPlan, addItem, deleteItem, setPlanId} = planSlice.actions
export default planSlice.reducer