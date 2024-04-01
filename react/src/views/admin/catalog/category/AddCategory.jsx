import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";


import { useAddCategoryMutation } from "../../../../api/admin/categoryApi";
import { useSelector, useDispatch } from "react-redux";
export const AddCategory = () => {
  const { register, control, handleSubmit, setValue,reset } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [addCategory, { isLoading, isError, error }] = useAddCategoryMutation();
  // const [height,setHeight]=useState(200);

  const submitForm = async (values) => {
    console.log(values);
    const formdata = new FormData();
    formdata.append("name", values.name);

    formdata.append("description", values.description);
    formdata.append("keywords", values.keywords);
    formdata.append("icons", values.icons);

    console.log(values);
    await addCategory({ formdata })
      .unwrap()
      .then((response) => {
       reset()
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="  my-4 ">
      <form action="" className="" onSubmit={handleSubmit(submitForm)}>
     
        <div className="add-form">
          <div>
            <label htmlFor=""> Category Name</label>
            <input type="text" {...register("name")} />
          </div>

          <div>
            <label htmlFor="">Key Words</label>
            <input type="text" {...register("keywords")} />
          </div>

          <div className="grid content-end">
            <button
              className="bg-blue-600 text-white p-2 w-[150px] rounded "
              type="submit"
            >
              Save Category
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
