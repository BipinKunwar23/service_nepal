import { createSlice } from "@reduxjs/toolkit";
const initialState={
    service:null,
    scopes:[],
}

export const serviceSlice=createSlice({
    name:"serviceSlice",
    initialState,
    available_date:new Date(),
    reducers:{
       
        setProviderService:((state,actions)=>{
            state.service=actions.payload
        }),
        setAvailableDate:((state,actions)=>{
            state.available_date=actions.payload
        }),
        setSelectedScope:((state,actions)=>{
            state.scopes=actions.payload
        })
    }
})
export const {setProviderService, setAvailableDate, setSelectedScope}=serviceSlice.actions;
export default serviceSlice.reducer;