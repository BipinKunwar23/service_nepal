import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useEditServiceStandardMutation } from "../../../../api/admin/standardApi";
import EditForm from "../../../../components/admin/editForm";
import { useForm } from "react-hook-form";
const EditStandard = ({standard, setEdit}) => {
  const [editStandard, { isLoading: isupdating, isError, error }] =
  useEditServiceStandardMutation();
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues:{
      name: standard?.name,

    }
  });

  const submitForm = async (values) => {
    console.log('values',values);

    await editStandard({ values, id: standard?.id })
      .unwrap()
      .then((response) => {
        console.log("response", response);
        if (response) {
          setEdit(false)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

return (
  <EditForm register={register} submitForm={submitForm} handleSubmit={handleSubmit} name={"Standard"} />
);
};

export default EditStandard;
