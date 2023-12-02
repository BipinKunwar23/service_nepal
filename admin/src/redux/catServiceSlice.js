import { createSlice } from "@reduxjs/toolkit";
const initialState={
 
   serviceId:null
   

}

export const catServiceSlice=createSlice({
name:"catServiceSlice",
initialState,
reducers:{
       
  
    setServiceId:(state,action)=>{
        state.serviceId=action.payload
    },
    

}

})
export const {setServiceId}=catServiceSlice.actions
export default catServiceSlice.reducer 