import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useAddTestimonialMutation } from "../../../api/buyer/feedbackApi";
const AddTestimonail = () => {
  const { register, control, handleSubmit, setValue } = useForm();

  const [addTestmonail, { isLoading, isError, error }] = useAddTestimonialMutation();

  // const [height,setHeight]=useState(200);
  const submitForm = async (values) => {
   

 
      await addTestmonail(values)
        .unwrap()
        .then((response) => {
          console.log(response);
          if (response) {
            setShow(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    
  };
  return (
    <div className=" w-[60%] mx-auto border border-yellow-600  my-4 p-4 bg-white rounded shadow-lg  ">
      <div className="flex border-b p-2">
        <h2 className="text-center text-xl text-black flex-1">
          Member Information
        </h2>
        <button
          className="text-xl"
          onClick={() => {
            setShow(false);
          }}
        >
          X
        </button>
      </div>
      <form action="" className="" onSubmit={handleSubmit(submitForm)}>
        <div className="">
          
         
          <div className="about-form">
                <label htmlFor="">Share Your Experience</label>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="4"
                  defaultValue={data?.bio}
                  
                  {...register("stories")}
                ></textarea>
              </div>
        
        

          <div className="grid content-end">
            <button
              className="bg-blue-600 text-white p-2 rounded w-full"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTestimonail;
