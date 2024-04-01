import React from "react";
import { useAddServiceStandardsMutation } from "../../../../api/admin/standardApi";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AddForm } from "../../../../components/admin/addForm";
const AddServiceStandards = () => {
  const [addStandard, { data, isLoading, isError, error }] =
    useAddServiceStandardsMutation();
  const dispatch = useDispatch();
  const { optionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { register, control, handleSubmit, reset } = useForm();

  const submitForm = async (values) => {

    await addStandard({ values, id: optionId })
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
      <AddForm register={register} submitForm={submitForm} handleSubmit={handleSubmit} name="Standard" />
    </section>
  );
};

export default AddServiceStandards;
