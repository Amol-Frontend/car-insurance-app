import { configureStore } from '@reduxjs/toolkit'
import carInsuranceReducer from '../features/insurance/carInsuranceSlice'

export const store = configureStore({
  reducer: {
    carInsurance : carInsuranceReducer
  },
})