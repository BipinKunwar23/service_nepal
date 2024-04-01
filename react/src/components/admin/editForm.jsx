import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

const EditForm = ({ submitForm,register,handleSubmit,name,children ,values}) => {
  return (
    <section className="">
    <form action="" className="my-6" onSubmit={handleSubmit(submitForm)}>
      <div className="add-form ">
        <div className="flex-1 ">
          <label htmlFor=""> {`${name} Name`}</label>
          <input type="text" {...register("name")} className="w-full"
          
          />
        </div>
        {
          children
        }

        <div className="grid place-content-end">
          <button
            className="bg-blue-600 text-white p-2 px-4 rounded w-[200px]"
            type="submit"
          >{` Save ${name}`}</button>
        </div>
      </div>
    </form>
  </section>
  );
};

export default EditForm;
