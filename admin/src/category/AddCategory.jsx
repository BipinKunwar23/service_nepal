import React, { useEffect, useState } from "react";
import {useForm} from 'react-hook-form'
import { useNavigate, useLocation } from "react-router-dom";
import { useAddCategoryMutation,useViewCategoryQuery } from "../Api/categoryApi";
import { useSelector, useDispatch } from "react-redux";
import Form from "./Form";
export const AddCategory = () => {
 
const dispatch=useDispatch()
  const navigate= useNavigate();
  const location = useLocation();

  const [addCategory,{isLoading,isError,error}]=useAddCategoryMutation();

  // const [height,setHeight]=useState(200);

 const submitForm= async(values)=>{
  console.log(values);
  await addCategory(values)
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
  return <div>{error.status}</div>
 }
// const handleScroll=()=>{
// setHeight(height+2)
// }
//  useEffect(()=>{
//   window.addEventListener('scroll',handleScroll)
//   return () => {
//     window.removeEventListener('scroll', handleScroll);
//   };
//  },[])

  return (
   <Form submitForm={submitForm} name="Category" />
  );
};
