import React from 'react'
import { createSlice } from "@reduxjs/toolkit";

const initialState={
   
    category:{},
    subcategory:{},
    serviceId:null,
    providerId:null,
    searchProvider:null,
    service:null,
}

export const cardSlice=createSlice({
name:'cardSlice',
initialState,
reducers:{
    setCategory:((state,actions)=>{
        state.category=actions.payload
    }),
    setSubCategory:((state,actions)=>{
        state.subcategory=actions.payload
    }),
    setServiceId:((state,actions)=>{
        state.serviceId=actions.payload
    }),
    setProviderId:((state,actions)=>{
        state.providerId=actions.payload
    }),
    setSearchingProvider:((state,actions)=>{
        state.searchProvider=actions.payload
    }),
    setService:((state,actions)=>{
        state.service=actions.payload
    })
}
})
export const {setCategory,setSubCategory, setServiceId,setProviderId,setSearchingProvider,setService}=cardSlice.actions
export default cardSlice.reducer