import React, { useState } from "react";
import { usePlaceOrderMutation } from "../../../api/buyer/orderApi";
import { useDispatch, useSelector } from "react-redux";
import Error from "../../../components/error/error";
import { useForm, Controller } from "react-hook-form";
import Loader from "../../../components/Loader";
const OrderConfirm = () => {
  const packageName = useSelector((state) => state.sellerSlice.packageName);
  const services = useSelector((state) => state.sellerSlice.serviceDetails);
  const totalCost = useSelector((state) => state.sellerSlice.totalCost);


  const {
    register,
    control,
    setValue,
    handleSubmit,
    watch,
    formState,
    getValues,
  } = useForm({
    defaultValues: {
      emergency: false,
      delay: null,
      scopes: [],
      originalValues: [],
    },
  });

  const onSubmit = async (values) => {
    console.log("data", values);

    await placeOrder(values)
      .unwrap()
      .then((response) => {
        console.log("response", response);
        reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="flex gap-20  p-4 px-16 bg-gray-100 ">
      <section className="    w-[35Vw] ">
        <form
          action=""
          className="     shadow shadow-gray-300 bg-white  text-gray-700 p-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className=" text-xl font-semibold text-slate-800 p-4  ">
            Contact Information
          </p>
          <div className="  flex flex-col gap-3">
            <div className="selected-field ">
            <label htmlFor="">Your City</label>

              <input type="text" {...register("delivery_location")}  placeholder="Select Your City" />
            </div>
            <div className="selected-field ">
              <label htmlFor="">Phone Number</label>
              <input type="text" {...register("delivery_location")} placeholder="Contact Number" />
            </div>
            <div className="selected-field ">
              <label htmlFor="">Receiving Date</label>
              <input type="date" {...register("delivery_location")}  />
            </div>
          </div>
        </form>
      </section>
      <section className="  bg-white w-[35Vw] p-5">
        <div className="flex gap-4">
        <div className="mb-3">
          {services?.galleries?.map((gallery) => {
            return (
              <div key={gallery?.id} className="flex-1">
                <img
                  src={`http://localhost:8000/${gallery?.image}`}
                  alt=""
                  className="h-[80px] w-[150px] object-cover object-left-top"
                />
              </div>
            );
          })}
        </div>
        <div>
          <p className="text-[1.4em] font-semibold text-slate-600">
            {services?.title}
          </p>
        </div>

        </div>
       
    
        {services?.prices?.packages
          ?.filter((data) => data?.package === packageName)
          .map((packageData) => {
            return (
              <div className=" flex flex-col gap-5 text-gray-500">
                <div className="">
                  <div className="">
                    <div className="flex justify-between text-lg">
                      <p className=" font-semibold mb-3">
                        {packageData?.name?.toUpperCase()}
                      </p>
                      <p className="text-gray-500 text-xl">
                        Rs {packageData?.price}
                      </p>
                    </div>
                    <p className="text-slate-400">{packageData?.description}</p>
                    <div className="mt-3"></div>
                  </div>

                  <div>
                    <h2>Fearutes</h2>
                    <ol>
                      <li>Feature1</li>
                      <li>Feature1</li>
                      <li>Feature1</li>
                      <li>Feature1</li>
                      <li>Feature1</li>
                    </ol>
                  </div>
                </div>
                <div className="flex justify-between text-xl"> 
                  <strong>Total</strong>
                  <span>${totalCost}</span>
                </div>

                <div>
                  <button
                    className=" bg-gray-800 text-white text-xl  rounded-md mb-5 p-2 w-full"
                    onClick={() => {
                      setContinue(!continues);
                    }}
                  >
                    Confirm
                  </button>
                 
                </div>
              </div>
            );
          })}
      </section>
    </section>
  );
};

export default OrderConfirm;
