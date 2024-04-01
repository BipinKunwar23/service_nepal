import React from "react";
import { useSelector,useDispatch } from "react-redux";
import EditForm from "../../../../components/admin/editForm";

import {
  useViewServiceByIdQuery,
  useEditServiceMutation,
} from "../../../../api/admin/catServiceApi";
import { useForm } from "react-hook-form";
const EditService = ({service,setEdit}) => {

  const dispatch=useDispatch()

  // const { data: subcategory, isLoading } = useViewServiceByIdQuery(serviceId);
  const [editService, { isLoading: isupdating, isError, error }] =
    useEditServiceMutation();

    const { register, control, handleSubmit, reset } = useForm({
      defaultValues:{
        name: service?.name,
        keywords: service?.keywords,
  
      }
    });

    const submitForm = async (values) => {
      console.log('values',values);
  
      await editService({ values, id: service?.id })
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
    <EditForm register={register} submitForm={submitForm} handleSubmit={handleSubmit} name={"Service"}  >
       <>
        
        <div className="flex-1 ">
              <label htmlFor=""> Keywords</label>
              <input type="text" {...register("keywords")} className="w-full" />
            </div>
            <div className="flex-1 flex flex-col ">
              <label htmlFor=""> Type</label>
             <select name="" id="" placeholder="Select Type" defaultValue={service.type}  {...register('type')} className="p-2 border-blue-300 border-2 focus:border-2 selection:p-2 focus:border-blue-300 rounded space-y-4">

                <option value="general" className="p-2">General Service</option>
                <option value="specific" className=" p-2">Specific Service</option>
   
              </select>
              {/* <input type="text" {...register("keywords")} className="w-full" /> */}
            </div>
          </>
    </EditForm>
  );
};

export default EditService;
