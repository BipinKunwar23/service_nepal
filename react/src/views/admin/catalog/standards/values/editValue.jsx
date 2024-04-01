import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useUpdateStandardValueMutation } from "../../../../../api/admin/standardApi";
import EditForm from "../../../../../components/admin/editForm";
import { useForm } from "react-hook-form";
const EditValue = ({svalue,setEdit}) => {
  const [updateValue]=useUpdateStandardValueMutation()
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues:{
      name: svalue?.name,

    }
  });

  const submitForm = async (values) => {
    console.log('values',values);

    await updateValue({ values, id: svalue?.id })
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
  <EditForm register={register} submitForm={submitForm} handleSubmit={handleSubmit} name={"Value"} />
);
};

export default EditValue;
