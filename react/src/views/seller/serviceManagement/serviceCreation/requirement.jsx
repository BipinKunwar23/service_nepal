import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  useAddRequirementsMutation,
  useUpdateRequirementsMutation,
} from "../../../../api/seller/serviceApi";
import Loader from "../../../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setStepCount } from "../../../../redux/sellerSlice";
const Requirements = ({data}) => {
  const { register, control, setValue, handleSubmit } = useForm({
    defaultValues: {
      terms: data?.term || [{ requirement: "" }],
      note:data?.note
    },
  });
  const [addRequirements, { isLoading }] = useAddRequirementsMutation();
  const [updateRequirements, { isLoading: isUpdating }] =
    useUpdateRequirementsMutation();

  const serviceId = useSelector((state) => state.sellerSlice.serviceId);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "terms",
  });
  const dispatch = useDispatch();

  const submitForm = async (values) => {
    console.log(values);
    if(data){

      await updateRequirements({ serviceId, values })
        .unwrap()
        .then((response) => {
          console.log("response", response);
          dispatch(setStepCount(6));
  
          // navigate(`${location?.state?.path} `, { replace: true });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else {
      await addRequirements({ serviceId, values })
      .unwrap()
      .then((response) => {
        console.log("response", response);
        dispatch(setStepCount(6));

        // navigate(`${location?.state?.path} `, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };
  if (isLoading || isUpdating) {
    return <Loader />;
  }
  return (
    <div className="bg-white p-4 min-h-screen">
      <form
        action=""
        className={`grid  gap-20 `}
        onSubmit={handleSubmit(submitForm)}
      >
        <div className="create-service">
          <h2> Terms and Requirements </h2>
          <div className="">
            {fields.map((field, index) => {
              return (
                <div key={field.id} className="mb-8 ">
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      {...register(`terms.${index}.requirement`)}
                      className="w-full"
                      placeholder="Write terms and requirements ?"
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
          <h2 htmlFor="">Special Notes</h2>
          <input type="text" 
          placeholder="Special information"
          {...register("note")} />
        </div>

        <div className=" create-service  ">
          <div></div>
          <button
            type="submit"
            className="bg-blue-600 p-2 px-4 rounded-lg text-white "
          >
            Save and Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default Requirements;
