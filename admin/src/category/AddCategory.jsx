import React, { useEffect, useState } from "react";
import {useForm} from 'react-hook-form'
import { useNavigate, useLocation } from "react-router-dom";
import { useAddCategoryMutation,useViewCategoryQuery } from "../Api/categoryApi";
import { useSelector, useDispatch } from "react-redux";
import Form from "./Form";
import { setCategoryAciton } from "../redux/categorySlice";
export const AddCategory = () => {
 
const dispatch=useDispatch()
  const navigate= useNavigate();
  const location = useLocation();

  const [addCategory,{isLoading,isError,error}]=useAddCategoryMutation();
  // const [height,setHeight]=useState(200);

 const submitForm= async(values)=>{
  console.log(values);
  const formdata = new FormData();
  formdata.append("name", values.name);
  
  formdata.append("description", values.description);
  formdata.append("keywords", values.keywords);
  formdata.append("icons", values.icons);

  console.log(values);
  await addCategory({formdata})
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
  return <div>{error.status}</div>
 }


  return (
   <Form submitForm={submitForm} name="Category" />
  );
};
