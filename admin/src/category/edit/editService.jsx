import React from "react";
import EditForm from "./editForm";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { setCategory, setEditAction } from "../../redux/categorySlice";
import {
  useViewServiceByIdQuery,
  useEditServiceMutation,
} from "../../Api/catServiceApi";
const EditService = () => {
  const serviceId = useSelector((state) => state.catServiceSlice.serviceId);
  console.log('serviceID',serviceId);
  const dispatch=useDispatch()
  const subcategoryId = useSelector((state) => state.categorySlice.subcategory);

  const { data: subcategory, isLoading } = useViewServiceByIdQuery(serviceId);
  const [editCategory, { isLoading: isupdating, isError, error }] =
    useEditServiceMutation();

  const submitForm = async (values) => {
    console.log(values);
    await editCategory({
      ...values,
      subcategory_id: subcategoryId,
      id: serviceId,
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
    <EditForm submitForm={submitForm} name="Service" values={subcategory} />
  );
};

export default EditService;
