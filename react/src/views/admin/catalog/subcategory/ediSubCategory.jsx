import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useEditSubCategoryMutation,
  useViewSubCategoryByIdQuery,
} from "../../../../api/admin/subCategoryApi";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";

const EditSubCategory = ({ setEdit, value }) => {
  // const subcategoryId = useSelector((state) => state.buyerSlice.subcategory);
  const { subcategoryId } = useParams();


  const [editCategory, { isLoading: isupdating, isError, error }] =
    useEditSubCategoryMutation();
  const { register, control, handleSubmit, setValue, reset } = useForm();
  const { categoryId } = useParams();
   
  const submitForm = async (values) => {
    console.log('data',values);
    const formdata = new FormData();
    formdata.append("name", values.name);
    formdata.append("category_id",categoryId)

    formdata.append("keywords", values.keywords);
    formdata.append("icons", values.icons);
    await editCategory({
      id: value?.id,
      formdata
    })
      .unwrap()
      .then((response) => {
        console.log('response',response);
        if (response) {
          setEdit(false);
        }

        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // if (isLoading) {
  //   return <div>Loading</div>;
  // }
  if (isupdating) {
    return <div>Saving</div>;
  }
  if (isError) {
    return <div>{error.status}</div>;
  }

  return (
    <div>
      <form action="" className="my-4" onSubmit={handleSubmit(submitForm)}>
        <div className="add-form grid grid-cols-4">
          <div>
            <label htmlFor=""> {`Sub Category Name`}</label>
            <input
              type="text"
              defaultValue={value?.name}
              {...register("name")}
            />
          </div>

          <div className="">
            <label htmlFor="">Key Words</label>
            <input
              type="text"
              defaultValue={value?.keywords}
              {...register("keywords")}
            />
          </div>
          <div className="">
            <Controller
              name="icons"
              control={control}
              render={({ field }) => {
                return (
                  <div className="space-y-5">
                    <label htmlFor="" className="text-gray-700 font-semibold  ">
                      Add Icon/Image
                    </label>

                    <div className="  border-2 border-blue-200 rounded p-1.5">
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

          <div className="grid place-content-end">
            <button
              className="bg-blue-600 text-white p-2 rounded w-[200px]"
              type="submit"
            >
              Save Item
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditSubCategory;
