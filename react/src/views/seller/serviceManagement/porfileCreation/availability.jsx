import React from "react";
import Time from "./time";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useAddAvailabilityMutation, useUpdateAvailabilityMutation } from "../../../../api/seller/profileApi";
import Loader from "../../../../components/Loader";
import { useDispatch } from "react-redux";
import { setProfileStep } from "../../../../redux/sellerSlice";

const Availability = ({ availability, cities }) => {
  console.log("cities", cities);
  console.log("availabiltu", availability);
  const { register, control, setValue, handleSubmit } = useForm({
    defaultValues: {
      cities: cities?.length!=0 ?cities: [{ city: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "cities",
  });
  const [addAvailability, { isLoading: isAdding }] =
    useAddAvailabilityMutation();
    const [updateAvailability, { isLoading: isUpdating }] =
    useUpdateAvailabilityMutation();
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    console.log("data", values);
    if(!availability){
      await addAvailability(values)
        .unwrap()
        .then((response) => {
          console.log("avaialbility", response);
          dispatch(setProfileStep(4));
          // navigate(`${location?.state?.path} `, { replace: true });
        })
        .catch((error) => {
          console.log(error);
        });

    }
    else {
      await updateAvailability(values)
      .unwrap()
      .then((response) => {
        console.log("avaialbility", response);
        dispatch(setProfileStep(4));
        // navigate(`${location?.state?.path} `, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };
  if (isAdding) {
    return <Loader />;
  }
  return (
    <form action="" onSubmit={handleSubmit(onSubmit)} className="p-5  bg-white">
      <div className=" mb-5   ">
        <div className="mb-20">
          <Time
            register={register}
            Controller={Controller}
            control={control}
            setValue={setValue}
            days={availability?.days}
            time={availability?.time}
          />
        </div>

        <div className="grid grid-cols-3 gap-8 ">
          <label>Available Cities </label>
          <div className="col-span-2 ">
            {fields.map((field, index) => {
              return (
                <div key={field.id} className="mb-5">
                  <div className="flex  gap-3">
                    <input
                      type="text"
                      {...register(`cities.${index}.city`)}
                      className="w-[80%] p-2 border border-slate-400"
                    />

                    <div className="flex gap-3">
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="shadow shadow-gray-500 text-xl p-1 px-4 rounded-md"
                        >
                          -
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => append({ city: "" })}
                        className="shadow shadow-gray-500 text-xl px-3 p-1 rounded-md"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-3  ">
        <button
          type="submit"
          className="bg-blue-600 p-2 px-4 rounded-lg text-white col-start-2 mt-5"
        >
          Save and Continue
        </button>
      </div>
    </form>
  );
};

export default Availability;
