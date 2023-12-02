import React from "react";
import EditForm from "./editForm";
import { useDispatch, useSelector } from "react-redux";
import {
  useEditSubCategoryMutation,
  useViewSubCategoryByIdQuery,
} from "../../Api/subCategoryApi";
import { setEditAction } from "../../redux/categorySlice";

const EditSubCategory = () => {
  const categoryId = useSelector((state) => state.categorySlice.category);
const dispatch= useDispatch()
  const subcategoryId = useSelector((state) => state.categorySlice.subcategory);

  const { data: subcategory, isLoading } =
    useViewSubCategoryByIdQuery(subcategoryId);
  const [editCategory, { isLoading: isupdating, isError, error }] =
    useEditSubCategoryMutation();

  const submitForm = async (values) => {
    console.log(values);
    await editCategory({
      ...values,
      category_id: categoryId,
      id: subcategoryId,
    })
      .unwrap()
      .then((response) => {
        dispatch(setEditAction(""));


        console.log(response);
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
    <EditForm submitForm={submitForm} name="Sub Category" values={subcategory} />
  );
};

export default EditSubCategory;
