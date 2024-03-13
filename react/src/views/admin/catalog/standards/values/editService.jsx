import React from "react";
import EditForm from "../../../components/editForm";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import {
  useViewServiceByIdQuery,
  useEditServiceMutation,
} from "../../../../../api/admin/catServiceApi";
const EditService = () => {
  const serviceId = useSelector((state) => state.catServiceSlice.serviceId);
  console.log('serviceID',serviceId);
  const dispatch=useDispatch()
  const subcategoryId = useSelector((state) => state.categorySlice.subcategory);

  const { data: subcategory, isLoading } = useViewServiceByIdQuery(serviceId);
  const [editCategory, { isLoading: isupdating, isError, error }] =
    useEditServiceMutation();

  const submitForm = async (values) => {
    const formdata = new FormData();
    formdata.append("name", values.name);
    formdata.append('subcategory_id',subcategoryId)
    formdata.append("description", values.description);
    formdata.append("keywords", values.keywords);
    formdata.append("icons", values.icons);

    await editCategory({
     formdata,
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
