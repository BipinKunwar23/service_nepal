import React from "react";
import { useAddCatServicesMutation } from "../../../../api/admin/catServiceApi";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AddForm } from "../../../../components/admin/addForm";
const AddService = () => {
  const [addService, { data, isLoading, isError, error }] =
    useAddCatServicesMutation();
  const dispatch = useDispatch();
  const { subcategoryId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { register, control, handleSubmit, reset } = useForm();

  const submitForm = async (values) => {
    console.log('values',values);

    await addService({ values, id: subcategoryId })
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
      <AddForm register={register} submitForm={submitForm} handleSubmit={handleSubmit} name={"Service"} >
        <>
        
      <div className="flex-1 ">
            <label htmlFor=""> Keywords</label>
            <input type="text" {...register("keywords")} className="w-full" />
          </div>
          <div className="flex-1 flex flex-col ">
            <label htmlFor=""> Type</label>
           <select name="" id="" placeholder="Select Type"  {...register('type')} className="p-2 border-blue-300 border-2 focus:border-2 selection:p-2 focus:border-blue-300 rounded space-y-4">
              <option value="general" className="p-2">General Service</option>
              <option value="specific" className=" p-2">Specific Service</option>
 
            </select>
            {/* <input type="text" {...register("keywords")} className="w-full" /> */}
          </div>
        </>
        </AddForm>
        
    </section>
  );
};

export default AddService;
