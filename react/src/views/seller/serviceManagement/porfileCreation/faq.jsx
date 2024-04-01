import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Loader from '../../../../components/Loader';
import { useAddFaqMutation,useUpdateFaqMutation } from "../../../../api/seller/profileApi";
import { useDispatch, useSelector } from "react-redux";
import { setProfileStep } from "../../../../redux/sellerSlice";
const Faq = ({faqs=[]}) => {
  const serviceId = useSelector((state) => state.sellerSlice.serviceId);
  const dispatch = useDispatch();
  const steps = useSelector((state) => state.sellerSlice.steps);
  const { register, control, setValue, handleSubmit } = useForm({
    defaultValues: {
      faqs: faqs.length>0 ? faqs : [{ question: "",answer:"" }],
    },
  });
const [addFaq, {isLoading}]=useAddFaqMutation()
const [updateFaq, {isLoading:isUpdating}]=useUpdateFaqMutation()

  const { fields, append, remove } = useFieldArray({
    control,
    name: "faqs",
  });
  const submitForm = async(values) => {
    console.log(values);
    if(faqs && faqs.length>0){
      await updateFaq({serviceId,values})
      .unwrap()
      .then((response) => {
        console.log('response',response);
        dispatch(setProfileStep(5));
       
  
        // navigate(`${location?.state?.path} `, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
    }
    else {
      await addFaq({serviceId,values})
      .unwrap()
      .then((response) => {
        console.log('response',response);
        dispatch(setProfileStep(5));
      
        
  
        // navigate(`${location?.state?.path} `, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });

    }
  };
  if(isLoading || isUpdating){
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
          <h2>Frquently Asked Questions</h2>
          <div className="">
            {fields.map((field, index) => {
              return (
                <div key={field.id} className="mb-8 ">
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      {...register(`faqs.${index}.question`)}
                      className="w-full"
                      placeholder="Add Questions"
                      
                    />
                    <textarea
                    
                      id=""
                      cols="30"
                      rows="10"
                      className="w-full"
                      placeholder="Answers "
                      
                      {...register(`faqs.${index}.answer`)}
                      

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
                onClick={() => append({ faq: "" })}
                className="text-green-600 font-bold mt-2 text-[1.1em]"
              >
                Add more +
              </button>
            </div>
          </div>
        </div>
        <div className=" create-service  ">
          <div ></div>
          <button type="submit" className="bg-blue-600 p-2 px-4 rounded-lg text-white ">
           Save and  Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default Faq;
