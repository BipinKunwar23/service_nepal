import React from "react";
import EditForm from "./editForm";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { setEditAction } from "../../redux/categorySlice";
import {
  useEditCategoryMutation,
  useGetCategoryByIdQuery,
} from "../../Api/categoryApi";
const EditCategory = () => {
  const selected = useSelector((state) => state.categorySlice.category);
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const { data: category, isLoading } = useGetCategoryByIdQuery(selected);
  const [editCategory, { isLoading: isupdating, isError, error }] =
    useEditCategoryMutation();

  const submitForm = async (values) => {
    console.log(values);
    await editCategory({ ...values, id: selected })
      .unwrap()
      .then((response) => {
        reset();
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

  return <EditForm submitForm={submitForm} name="Category" values={category} />;
};

export default EditCategory;
