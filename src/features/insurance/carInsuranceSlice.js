import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    brand: "",
    model: "",
    variant: "",
    planDetails: {},
    personalData: {}
}

export const carInsuranceSlice = createSlice({
    name:"carInsurance",
    initialState,
    reducers : {
        setBrand : (state,action)=> {
            state.brand = action.payload;
        },

        setModel : (state,action)=> {
            state.model = action.payload;
        },

        setVariant : (state,action) => {
            state.variant = action.payload;
        },
        setPlanDetails : (state,action)=> {
            state.planDetails = action.payload;
        }
    }
});

export const { setBrand , setModel, setVariant , setPlanDetails } = carInsuranceSlice.actions;
export default carInsuranceSlice.reducer;
