import React from 'react'
import {useForm} from 'react-hook-form'
import { useState,useEffect } from 'react';
import { useUpdateCategoryMutation,useViewCategoryQuery } from '../../../../api/admin/categoryApi';
export const UpdateCategory = ({selectedCatg}) => {
  const [updateCategory,{data,isLoading,isError,error}]=useUpdateCategoryMutation()
  const {refetch}=useViewCategoryQuery()
    const [selected,setSelected]=useState({});
    useEffect(()=>{
      setSelected(selectedCatg)
    },[selectedCatg])
    const {register,control,handleSubmit}=useForm();
   const submitForm= async(values)=>{
    await updateCategory({...values,id:selectedCatg.id})
    .unwrap()
    .then((response)=>{
      console.log(response);
refetch()

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
    <div className="form">
    <form action="" onSubmit={handleSubmit(submitForm)}>
      <div>
        <label htmlFor="">Category Name</label>
        <input type="text" {...register("name")} 
        defaultValue={selected?.name}
        />
      </div>
      <div>
        <label htmlFor="">Description</label>
        <textarea {...register("description")} id="" rows={5}></textarea>
      </div>
      <div>
        <label htmlFor="">Key Words</label>
       <input type="text" {...register('keywords')}/>
      </div>
      <div>
        <button className="bg-blue-600 text-white p-2" type="submit">Update Category</button>
      </div>
    
  
    </form>
  </div>
  )
}
