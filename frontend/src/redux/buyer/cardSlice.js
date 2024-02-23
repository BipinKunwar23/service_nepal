import React from 'react'
import { createSlice } from "@reduxjs/toolkit";

const initialState={
   
    category:{},
    subcategory:{},
    serviceId:null,
    providerId:null,
    searchProvider:null,
    service:null,
    filters:{
        category:null,
        subcategory:null,
        location:null,
        price:null,
        rating:null,

    }
}

export const buyerCardSlice=createSlice({
name:'buyerCardSlice',
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
    }),
    setFilterAction:((state,actions)=>{
        state.filters=actions.payload
    }),
}
})
export const {setCategory,setSubCategory, setServiceId,setProviderId,setSearchingProvider,setService,setFilterAction}=buyerCardSlice.actions
export default buyerCardSlice.reducer