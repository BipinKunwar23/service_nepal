import React from "react";
import { useForm } from "react-hook-form";
import { useAddSecurityInfoMutation } from "../../../../Api/ProfileApi";
import Loader from "../../../../components/Loader";
import { useNavigate } from 'react-router-dom';
const SecurityInfo = () => {
  const form = useForm();
  const { register, handleSubmit, control, setValue } = form;
  const navigate=useNavigate();

  const [addSecurity, { isLoading }] = useAddSecurityInfoMutation();
  const onSubmit = async (values) => {
    console.log(values);
    await addSecurity(values)
      .unwrap()
      .then((response) => {
        console.log(response);
        localStorage.setItem('role',response?.role)

        navigate("/seller/create/job", { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="p-5 h-screen bg-white ">
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid-cols-4  grid mb-20">
          <label htmlFor="phone_number"> Email </label>
          <input
            type="text"
            className="p-2 w-full col-span-2 border border-slate-400"
            readOnly
          />
          <button>Verified</button>
        </div>
        <div className="grid-cols-4 grid">
          <label htmlFor="phone_number"> Phone Number</label>
          <input
            type="text"
            {...register("phone_number")}
            className="p-2 w-full col-span-2 border border-slate-400"
          />
          <button>Verify</button>
        </div>
        <div className=" grid place-content-center">
          <button
            className="bg-blue-600 p-2 rounded-md text-white text-[1.2em] w-[300px]"
            type="submit"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default SecurityInfo;
