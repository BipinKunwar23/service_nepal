import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useAddRequirementsMutation } from "../../../../Api/serviceApi";
import Loader from "../../../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
const Requirements = () => {
  const { register, control, setValue, handleSubmit } = useForm({
    defaultValues: {
      buyer: [{ requirement: "" }],
      materials: [{ material: "" , quantity:""}],

    },
  });
const [addRequirements, {isLoading}]=useAddRequirementsMutation()
const serviceId = useSelector((state) => state.serviceSlice.serviceId);


  const { fields, append, remove } = useFieldArray({
    control,
    name: "buyer",
  });
  const { fields:material_fields, append:material_append, remove:material_remove } = useFieldArray({
    control,
    name: "materials",
  });

 
  const submitForm = async(values) => {
    console.log(values);
    await addRequirements({ serviceId, ...values})
    .unwrap()
    .then((response) => {
      console.log('response',response);

      // navigate(`${location?.state?.path} `, { replace: true });
    })
    .catch((error) => {
      console.log(error);
    });
  };
  if(isLoading){
    return <Loader/>
  }
  return (
    <div className="bg-white p-4 min-h-screen">
      <form
        action=""
        className={`grid  gap-20 `}
        onSubmit={handleSubmit(submitForm)}
      >
       
        <div className="create-service">
          <h2>Buyer Requirements</h2>
          <div className="">
            {fields.map((field, index) => {
              return (
                <div key={field.id} className="mb-8 ">
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      {...register(`buyer.${index}.requirement`)}
                      className="w-full"
                      placeholder="What the customer required to do ?"
                    />
                  
                  </div>
                  <div className="flex gap-3">
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-600 font-bold text-[1.1em]"
                      >
                        Remove -
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
            <div>
              <button
                type="button"
                onClick={() => append({ requirement: "" })}
                className="text-green-600 font-bold mt-2 text-[1.1em]"
              >
                Add more +
              </button>
            </div>
          </div>
        </div>
        
       
        <div className="create-service">
          <h2>Materials Requirements</h2>
          <div className="">
            {material_fields.map((field, index) => {
              return (
                <div key={field.id} className="mb-8 ">
                  <div className="flex gap-5">
                    <input
                      type="text"
                      {...register(`materials.${index}.material`)}
                      className="w-full"
                      placeholder="Materials Used"
                    />
                         <input
                      type="text"
                      {...register(`materials.${index}.quantity`)}
                      className="w-full"
                      placeholder="Quantity"
                    />
                  
                  </div>
                  <div className="flex gap-3">
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => material_remove(index)}
                        className="text-red-600 font-bold text-[1.1em]"
                      >
                        Remove -
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
            <div>
              <button
                type="button"
                onClick={() => material_append({ requirement: "" })}
                className="text-green-600 font-bold mt-2 text-[1.1em]"
              >
                Add more +
              </button>
            </div>
          </div>
        </div>
        <div className="create-service">
          <h2 htmlFor="">Special Notes</h2>
         <input type="text" {...register('note')} />
        </div>
        <div className="create-service">
          <h2 htmlFor="">Payment Terms</h2>
         <textarea name="" id="" cols="30" rows="2" {...register('payment_term')}></textarea>
        </div>
        <div className="create-service">
          <h2 htmlFor="">Service Terms</h2>
         <textarea name="" id="" cols="30" rows="2" {...register('service_term')}></textarea>
        </div>
        <div className=" create-service  ">
          <div></div>
          <button type="submit" className="bg-blue-600 p-2 px-4 rounded-lg text-white ">
           Save and  Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default Requirements;
