import React from "react";
import {useAddCatServicesMutation} from '../Api/catServiceApi'
import Form from "./Form";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryAciton } from "../redux/categorySlice";
const AddService = () => {
  const [addService, { data, isLoading, isError,error }] =
    useAddCatServicesMutation();
const selected=useSelector((state)=>state.categorySlice.subcategory);
const dispatch= useDispatch()
  const submitForm = async (values) => {
    console.log(values);
    const formdata = new FormData();
    formdata.append("name", values.name);
    
    formdata.append("description", values.description);
    formdata.append("keywords", values.keywords);
    formdata.append("icons", values.icons);
    await addService({formdata,id:selected})
      .unwrap()
      .then((response) => {
        dispatch(setCategoryAciton(""));

        
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (isLoading) {
    return <div>Saving</div>;
  }
  if (isError) {
    return <div>{error}</div>;
  }
  return (
    <Form submitForm={submitForm} name="Service" />

  );
};

export default AddService;
