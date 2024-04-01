import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import {
  useEditCategoryMutation,
  useGetCategoryByIdQuery,
} from "../../../../api/admin/categoryApi";
import EditForm from "../../../../components/admin/editForm";
import { useForm } from "react-hook-form";

const EditCategory = ({ categoryId , setEdit}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: category, isLoading } = useGetCategoryByIdQuery(categoryId);
  console.log('category',category);
  const [editCategory, { isLoading: isupdating, isError, error }] =
    useEditCategoryMutation();
  const { register, control, handleSubmit, setValue, reset } = useForm({
    defaultValues:{
      name: category?.name,
      keywords: category?.keywords,

    }
  });

  const submitForm = async (values) => {
   

    await editCategory({ values, id: categoryId })
      .unwrap()
      .then((response) => {
        if(response){
          setEdit(false)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isupdating) {
    return <div>Saving</div>;
  }
  if (isError) {
    return <div>{error.status}</div>;
  }

  return (
    <div className="  my-4 ">
      <form action="" className="" onSubmit={handleSubmit(submitForm)}>
     
        <div className="add-form">
          <div>
            <label htmlFor=""> Category Name</label>
            <input type="text" {...register("name")}
            defaultValue={category?.name}
            />
          </div>

          <div>
            <label htmlFor="">Key Words</label>
            <input type="text" {...register("keywords")}
            defaultValue={category?.keywords}
            />
          </div>

          <div className="grid content-end">
            <button
              className="bg-blue-600 text-white p-2 w-[150px] rounded "
              type="submit"
            >
              Update Category
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
