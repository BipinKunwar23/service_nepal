import React from 'react'
import { useLocation } from 'react-router-dom'
import Form from './Form'
import {useAddSubCategoryMutation} from '../Api/subCategoryApi'
import { useSelector } from 'react-redux'
const AddSubCategory = () => {
const selected=useSelector((state)=>state.categorySlice.category);
  const [addSubCategory,{data,isLoading,isError,error}]=useAddSubCategoryMutation()
    const submitForm= async(values)=>{
      await addSubCategory({...values,id:selected})
      .unwrap()
      .then((response)=>{
        reset()
        console.log(response);
      })
      .catch((error)=>{
        console.log(error);
      })
     }
     if(isLoading){
      return <div>Saving</div>
     }
     if(isError){
      return <div>{error}</div>
     }
  
    
  return (
   <Form submitForm={submitForm} name="SubCategory" />
   
  )
}

export default AddSubCategory