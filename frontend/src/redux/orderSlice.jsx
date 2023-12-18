import React from 'react'
import { createSlice } from "@reduxjs/toolkit";

const initialState={
   
    imagePreviews:[],
    step:{
        initial: true,
        final: false,
      },
      status:{}
}

export const orderSlice=createSlice({
name:'orderSlice',
initialState,
reducers:{
    setImagePreviews:((state,actions)=>{
        state.imagePreviews=actions.payload
    }),
    setSteps:((state,actions)=>{
        state.step=actions.payload
    }),
    setStatus:((state,actions)=>{
        state.status=actions.payload
    }),
   
   
  
}
})
export const {setImagePreviews, setSteps, setStatus}=orderSlice.actions
export default orderSlice.reducer