import { createSlice } from "@reduxjs/toolkit";
const initialState={
   
   selectedOnClick:{
    parent:{
       name:'all',
       category:[],
    },
    subparent:{},
    child:{},
   },
   path:'',
   count:0,
   serviceId:''
   

}

export const catServiceSlice=createSlice({
name:"catServiceSlice",
initialState,
reducers:{
       
    setSelectedOnClick:((state,action)=>{
        state.selectedOnClick=action.payload
    }),
    setServiceId:(state,action)=>{
        state.serviceId=action.payload
    },
    

}

})
export const {setSelectedOnClick,setServiceId}=catServiceSlice.actions
export default catServiceSlice.reducer 