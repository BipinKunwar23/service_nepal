import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAddSubCategoryMutation } from "../../../../api/admin/subCategoryApi";
import { useDispatch, useSelector } from "react-redux";

import { useForm, Controller } from "react-hook-form";
import { useViewCategoryQuery } from "../../../../api/admin/categoryApi";
import Select from "react-select";
const AddSubCategory = ({setAddItem}) => {
  const {
    data: categories,
    isError: categoryIsError,
    isLoading,
    error: cataegoryError,
  } = useViewCategoryQuery();

  const navigate = useNavigate();
  const {categoryId}=useParams()
  const { register, control, handleSubmit, setValue } = useForm();


  const location=useLocation()
  const [addSubCategory, { data, isLoadingLisUpdating, isError, error }] =
    useAddSubCategoryMutation();
  const submitForm = async (values) => {
    console.log("values", values);
    const formdata = new FormData();
    formdata.append("name", values.name);

    formdata.append("description", values.description);
    formdata.append("keywords", values.keywords);
    formdata.append("icons", values.icons);
    await addSubCategory({ formdata, id: categoryId })
      .unwrap()
      .then((response) => {
        if (response) {
         setAddItem(false)
        }

        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (isLoading) {
    return;
  }

  return (
    <div>
      <form
        action=""
        className="my-4"
        onSubmit={handleSubmit(submitForm)}
      >
       
        <div className="add-form">
          <div>
            <label htmlFor=""> {`Sub Category Name`}</label>
            <input type="text" {...register("name")} />
          </div>

          <div className="">
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
                    <label
                      htmlFor=""
                      className="text-gray-700 font-semibold  "
                    >
                      Add Icon/Image
                    </label>

                    <div className=" mt-5 border p-1.5">
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
              >Save Item</button>
            </div>
          </div>
      </form>
    </div>
  );
};

export default AddSubCategory;
