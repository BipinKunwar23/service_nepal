import React, { useState } from "react";
import { usePlaceOrderMutation } from "../../../api/buyer/orderApi";
import { useDispatch, useSelector } from "react-redux";
import Error from "../../../components/error/error";
import { useForm, Controller } from "react-hook-form";
import Loader from "../../../components/Loader";
import signature from "../paymnet/signature";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { setToastMessage } from "../../../redux/sellerSlice";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useGetOrderConfirmQuery } from "../../../api/buyer/serviceApi";

import "react-toastify/dist/ReactToastify.css";
import { FaCheck } from "react-icons/fa";
import { PaymentEsewa } from "../paymnet/payment";
const OrderConfirm = () => {
  const order = useSelector((state) => state.sellerSlice.order);
  const { serviceId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const packageName = searchParams.get("package");
  const [nofification, setNotifcation] = useState("");
  const location = useLocation();
  const { data: service, isLoading } = useGetOrderConfirmQuery({
    serviceId,
    packageName: searchParams.get("package"),
  });

  const [placeOrder, { isLoading: isPlacing }] = usePlaceOrderMutation();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    console.log("data", values);

    await placeOrder({
      ...values,
      serviceId: serviceId,
      quantity: order.quantity,
      cost: order.cost,
      package: packageName,
    })
      .unwrap()
      .then((response) => {
        console.log("response", response);

        if (response) {
          toast(response?.message);
          setTimeout(() => {
            navigate(`${location?.state?.path}`, { replace: true });
          }, [1000]);
        }
        reset();
      })
      .catch((error) => {
        console.log("error", error);
        toast(error);
      });
  };

  if (isLoading || isPlacing) {
    return <Loader />;
  }
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <section className="grid grid-cols-2  p-4 px-16 gap-20">
        <div>
          <form
            className="  bg-white "
            action=""
            onSubmit={handleSubmit(onSubmit)}
          >
            <section className="    w-[40Vw] h-full">
              <div className="      text-gray-700 ">
                <p className=" text-xl font-semibold text-slate-800 p-2  ">
                  Contact Information
                </p>
                <div className="  flex flex-col gap-3">
                  <div className="selected-field ">
                    <label htmlFor="">Your City</label>

                    <input
                      type="text"
                      {...register("delivery_city")}
                      placeholder="Select Your City"
                    />
                  </div>
                  <div className="selected-field ">
                    <label htmlFor="">Phone Number</label>
                    <input
                      type="text"
                      {...register("contact_number")}
                      placeholder="Contact Number"
                    />
                  </div>
                  <div className="selected-field ">
                    <label htmlFor="">Calling Date</label>
                    <input type="date" {...register("service_date")} />
                  </div>
                </div>
              </div>
            </section>
          </form>
          <div className="mt-4 space-y-4">
            <h2 className="text-lg font-semibold">Payment</h2>

            <div className="flex justify-end">
              <button className="bg-green-600 text-white rounded p-2 w-44">
                Cash On Completion
              </button>
            </div>
            <div className=" flex justify-end">
             <PaymentEsewa amount={order?.cost}/>
            </div>
          </div>
        </div>

        <div className="  bg-white border w-[35Vw] p-4 space-y-3">
          <div>
            <p className=" text-xl font-semibold text-slate-800  ">
              Order Details
            </p>
          </div>
          <div className="flex gap-4">
            <div className=" bg-red-500">
              <img
                src={`http://localhost:8000/${service?.description?.image}`}
                alt=""
                className="h-[80px] w-[150px] object-cover object-left-top"
              />
            </div>

            <div>
              <p className="text-[1.2em] font-semibold text-slate-600">
                {service?.title}
              </p>
            </div>
          </div>
          {packageName ? (
            <div>
              {service?.packages?.map((packageData) => {
                return (
                  <div
                    className=" flex flex-col gap-5 text-gray-700 "
                    key={packageData?.id}
                  >
                    <div className="">
                      <div className="">
                        <div className="flex justify-between text-lg">
                          <p className=" font-semibold mb-3">
                            {packageData?.name?.toUpperCase()}
                          </p>
                          <span className="text-gray-500 text-xl">
                            NPR {packageData?.price}
                          </span>
                        </div>
                        <p className="text-slate-400">
                          {packageData?.description}
                        </p>
                        <div className="mt-3"></div>
                      </div>

                      <div>
                        <h2 className="text-gray-600  text-[1.2em] mb-2 font-semibold">
                          Package Includes
                        </h2>
                        <ol className="space-y-2 text-[1em] text-gray-500">
                          {service?.standards?.map((standard) => {
                            const value_id = packageData?.standards.find(
                              (item) => item?.id === standard?.id
                            )?.pivot?.value_id;
                            if (value_id) {
                              const value = standard?.values.find(
                                (item) => item?.id === value_id
                              );
                              return (
                                <li key={standard?.id} className="flex gap-3 ">
                                  <i className="text-[0.8em] grid content-center">
                                    <FaCheck />
                                  </i>{" "}
                                  <span>{standard?.name}</span>{" "}
                                  <span>{value?.name}</span>
                                </li>
                              );
                            }
                            return (
                              <li key={standard?.id} className="flex gap-3">
                                {" "}
                                <i className="text-[0.8em] grid content-center">
                                  <FaCheck />
                                </i>{" "}
                                <span>{standard?.name}</span>
                              </li>
                            );
                          })}
                        </ol>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="my-4 space-y-3">
              <div className=" ">
                <p className="text-gray-600">
                  {service?.description?.description}
                </p>
              </div>
              <div className="flex justify-between ">
                <h2 className="font-semibold">Service Fee</h2>
                <span className="text-gray-600">
                  NPR {service?.description?.price}
                </span>
              </div>
            </div>
          )}

          <div className="space-y-4 ">
            <div className="flex justify-between  ">
              <h2 className="font-semibold">Service Quantity</h2>
              <span className="text-gray-600">{order?.quantity}</span>
            </div>
            <div className="flex justify-between ">
              <h2 className="font-semibold">Total Cost</h2>
              <span className="text-gray-600">NPR {order?.cost}</span>
            </div>

            <div>
              <button
                type="submit"
                className=" bg-gray-800 text-white text-lg  rounded-md  p-2 w-full"
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderConfirm;
