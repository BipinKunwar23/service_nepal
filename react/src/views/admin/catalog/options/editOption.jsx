import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import EditForm from './../../../../components/admin/editForm';
import { useEditOptionMutation } from "../../../../api/admin/optionApi";
import { useForm } from "react-hook-form";
const EditOption = ({option,setEdit}) => {

  const dispatch=useDispatch()

  const [editOption, { isLoading: isupdating, isError, error }] =
    useEditOptionMutation();
    const { register, control, handleSubmit, reset } = useForm({
      defaultValues:{
        name: option?.name,
  
      }
    });

    const submitForm = async (values) => {
      console.log('values',values);
  
      await editOption({ values, id: option?.id })
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
    <EditForm register={register} submitForm={submitForm} handleSubmit={handleSubmit} name={"Option"} />
  );
};

export default EditOption;
