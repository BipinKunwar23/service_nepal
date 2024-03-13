import React, { useState } from "react";
import { usePlaceOrderMutation } from "../../../api/buyer/orderApi";
import { useDispatch, useSelector } from "react-redux";
import Error from "../../../components/error/error";
import { useForm, Controller } from "react-hook-form";
import Loader from "../../../components/Loader";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { setToastMessage } from "../../../redux/sellerSlice";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useGetServicePackageQuery } from "../../../api/buyer/serviceApi";
import { useGetServiceStandardQuery } from "../../../api/seller/serviceApi";


import "react-toastify/dist/ReactToastify.css";
import { FaCheck } from 'react-icons/fa';
const OrderConfirm = () => {
  const packageName = useSelector((state) => state.sellerSlice.packageName);
  const services = useSelector((state) => state.sellerSlice.serviceDetails);
  const order = useSelector((state) => state.sellerSlice.order);
  const { serviceId,optionId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [nofification, setNotifcation] = useState("");
  const location = useLocation();
  const { data: service, isLoading } = useGetServicePackageQuery({
    serviceId,
    packageName: searchParams.get("package"),
  });
  const { data: standards, isLoading:isStandards} = useGetServiceStandardQuery(optionId);
  console.log("service", standards);

  const [placeOrder, { isLoading: isPlacing }] = usePlaceOrderMutation();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    console.log("data", values);

    await placeOrder({
      ...values,
      serviceId: searchParams.get("id"),
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

  if (isLoading || isPlacing || isStandards) {
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
      <form
        className="grid grid-cols-2 gap-20  p-4 px-16 bg-gray-100 "
        action=""
        onSubmit={handleSubmit(onSubmit)}
      >
        <section className="    w-[35Vw] h-full">
          <div className="     shadow shadow-gray-300 bg-white  text-gray-700 p-8">
            <p className=" text-xl font-semibold text-slate-800 p-4  ">
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
                <label htmlFor="">Receiving Date</label>
                <input type="date" {...register("service_date")} />
              </div>
            </div>
          </div>
        </section>
        <section className="  bg-white w-[40Vw] p-8 space-y-5">
          <div>
            <p className=" text-xl font-semibold text-slate-800  ">
              Order Details
            </p>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <img
                src={`http://localhost:8000/${service?.galleries[0]?.image}`}
                alt=""
                className="h-[80px] w-[150px] object-cover object-left-top"
              />
            </div>

            <div>
              <p className="text-[1.4em] font-semibold text-slate-600">
                {service?.title}
              </p>
            </div>
          </div>

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
                        Rs {packageData?.price}
                      </span>
                    </div>
                    <p className="text-slate-400">{packageData?.description}</p>
                    <div className="mt-3"></div>
                  </div>

                  <div>
                    <h2 className="text-gray-600  text-[1.2em] mb-2 font-semibold">
                      Package Includes
                    </h2>
                    <ol className="space-y-2 text-[1em] text-gray-500">
                      {standards?.map((standard) => {
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
                <div className="flex justify-between text-lg ">
                  <h2 className="text-black">Service Quantity</h2>
                  <span>{order?.quantity}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <h2 className="text-black">Total Cost</h2>
                  <span>${order?.cost}</span>
                </div>

                <div>
                  <button
                    type="submit"
                    className=" bg-gray-800 text-white text-xl  rounded-md mb-5 p-2 w-full"
                  >
                    Confirm Order
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      </form>
    </>
  );
};

export default OrderConfirm;
