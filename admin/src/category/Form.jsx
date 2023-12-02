import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryAciton } from "../redux/categorySlice";

const Form = ({ name, submitForm }) => {
  const dispatch = useDispatch();
  const { register, control, handleSubmit,setValue} = useForm();
  return (
    <form
      action=""
      className={`border w-[40Vw] bg-white p-5  border-gray-300 shadow-xl shadow-gray-800 rounded-md sticky top-[14Vh] m-auto`}
      onSubmit={handleSubmit(submitForm)}
    >
      <div className="flex p-5 ">
      <h2 className=" flex-1 text-center p-2 text-2xl font-semibold">{`Add ${name} `}</h2>

        <div className="  grid place-content-center">
        <button
            className=" text-white text-2xl bg-red-600 rounded-full p-1 px-3"
            type="button"
            onClick={() => {
              dispatch(setCategoryAciton(""));
            }}
          >
            X
          </button>
        </div>
      </div>
      <div className="add-form">

      <div>
        <label htmlFor=""> {`${name} Name`}</label>
        <input type="text" {...register("name")} />
      </div>
      <div>
        <label htmlFor="">Description</label>
        <textarea {...register("description")} id="" rows={2}></textarea>
      </div>
      <div>
        <label htmlFor="">Key Words</label>
        <input type="text" {...register("keywords")} />
      </div>
      <div className="">
              <Controller
                name="icons"
                control={control}
                render={({ field }) => {
                  return (
                    <div>
                      <label htmlFor="" className="text-gray-700 font-semibold ">Add Icon/Image</label>

                      <div className="">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            setValue("icons", e.target.files[0]);
                          }}
                        />
                      </div>
                    </div>
                  );
                }}
              />
            </div>
      <div >
        <button
          className="bg-blue-600 text-white p-2 rounded-full"
          type="submit"
        >{` Save ${name}`}</button>
      </div>
      </div>

    </form>
  );
};

export default Form;
