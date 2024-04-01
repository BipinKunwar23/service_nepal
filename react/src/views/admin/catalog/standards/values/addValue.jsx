import React from "react";
import { useAddStandardValueMutation } from "../../../../../api/admin/standardApi";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AddForm } from "../../../../../components/admin/addForm";
const AddValue = () => {
  const [addValue, { data, isLoading, isError, error }] =
  useAddStandardValueMutation();
  const dispatch = useDispatch();
  const { standardId } = useParams();
  const navigate = useNavigate();
  const { register, control, handleSubmit,reset } = useForm();

  const location = useLocation();
  const submitForm = async (values) => {

    await addValue({ values, id: standardId })
      .unwrap()
      .then((response) => {
        console.log("response", response);
        if (response) {
        reset()
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
 
 
  return (
    <section className="">
      <AddForm register={register} submitForm={submitForm} handleSubmit={handleSubmit} name="Value" />
    </section>
  );
};

export default AddValue;
