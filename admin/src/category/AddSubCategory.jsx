import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Form from './Form'
import {useAddSubCategoryMutation} from '../Api/subCategoryApi'
import { useDispatch, useSelector } from 'react-redux'
import { setCategoryAciton } from '../redux/categorySlice'
const AddSubCategory = () => {
const selected=useSelector((state)=>state.categorySlice.category);
  const [addSubCategory,{data,isLoading,isError,error}]=useAddSubCategoryMutation()
  const dispatch=useDispatch()
    const submitForm= async(values)=>{
      const formdata = new FormData();
      formdata.append("name", values.name);
      
      formdata.append("description", values.description);
      formdata.append("keywords", values.keywords);
      formdata.append("icons", values.icons);
      await addSubCategory({formdata,id:selected})
      .unwrap()
      .then((response)=>{
        dispatch(setCategoryAciton(""));

        
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