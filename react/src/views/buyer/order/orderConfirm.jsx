import React, { useEffect, useState } from "react";
import { usePlaceOrderMutation } from "../../../api/buyer/orderApi";
import { useDispatch, useSelector } from "react-redux";
import Error from "../../../components/error/error";
import { useForm, Controller } from "react-hook-form";
import Loader from "../../../components/Loader";
import signature from "../paymnet/signature";
import { FaRegCircle } from "react-icons/fa";
import { FaRegDotCircle } from "react-icons/fa";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import {
  useViewServiceAddressQuery,
  useSaveServiceAddressMutation,
  useGetSellerLocationQuery,
} from "../../../api/buyer/orderApi";
import esewa from "../../../images/esewa.png";
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
import Select from "react-select";
const OrderConfirm = () => {
  const { serviceId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const packageName = searchParams.get("package");
  const [nofification, setNotifcation] = useState("");
  const [payment, setPayment] = useState("cash");
  const [delivery, setDelivery] = useState(false);
  const { data, isLoading: isAddress } = useViewServiceAddressQuery();
  const [city, setCity] = useState();
  console.log("address", data);
  const { data: locations=[], isLoading: isLocation } = useGetSellerLocationQuery(
    searchParams.get("seller")
  );
  console.log("locations", locations);
  const [saveAddress] = useSaveServiceAddressMutation();

  useEffect(() => {
    if (delivery) {
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    }

    return () => {
      document.body.style.position = "static";
    };
  }, [delivery]);
  useEffect(() => {
    if (data && locations) {
      setCity(  locations.find((city) => city.id === data?.location_id)?.city);
    }
  }, [data, locations]);

  const location = useLocation();
  const { data: service, isLoading } = useGetOrderConfirmQuery({
    serviceId,
    packageName: searchParams.get("package"),
  });

  const [placeOrder, { isLoading: isPlacing }] = usePlaceOrderMutation();
  const { register, handleSubmit, reset, setValue } = useForm();
  const navigate = useNavigate();
  const handleOrder = async () => {
    await placeOrder({
      serviceId: serviceId,
      addressId: data?.id,
      quantity: sessionStorage.getItem("quantity"),
      cost: sessionStorage.getItem("cost"),
      package: packageName,
    })
      .unwrap()
      .then((response) => {
        console.log("message", response);

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

  const handleAddress = async (values) => {
    console.log("data", values);

    await saveAddress(values)
      .unwrap()
      .then((response) => {
        console.log("response", response);

        if (response) {
          setDelivery(false);
        }
        reset();
      })
      .catch((error) => {
        console.log("error", error);
        toast(error);
      });
  };

  if (isLoading || isAddress || isLocation || isPlacing) {
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
      <section className=" mt-8 p-8 flex  gap-10 text-[1em]">
        <div className="text-black w-[55Vw]  ">
          <div>
            <h2 className="font-semibold text-lg px-4 bg-gray-50 p-3">
              {" "}
              Service Address Details
            </h2>

            <div className="shadow bg-white  px-4 space-y-4 py-6">
              <div className="flex  gap-4 text-gray-600 ">
                <p className="flex-1 ">
                  Your invoice will be issued accrodig to the details listed
                  here.
                </p>
                <button
                  className="border-2 border-gray-400 p-2 w-36 rounded font-semibold text-black"
                  onClick={() => {
                    setDelivery(true);
                  }}
                >
                  {data && Object.keys(data).length > 0
                    ? "Change Details"
                    : "Add Details"}
                </button>
              </div>
              <h2>
                Delivered to: <span> {data?.name}</span>
              </h2>
              <p>
                City:{" "}
                {city ? (
                  city
                ) : (
                  <span className="text-red-600">
                    Please Enter a City that matches to the seller
                    avaialability.
                  </span>
                )}
              </p>
              <div className="flex mt-3 gap-8">
                <p>{data?.phone_number}</p>
                <p>{data?.address}</p>
                <p>{data?.email}</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="font-semibold text-lg px-4 bg-gray-50 p-3">
              {" "}
              Paymnet Options
            </h2>
            <ul className="p-4 bg-white shadow space-y-10">
              <li className=" text-gray-500 font-semibold">
                <button
                  onClick={() => {
                    setPayment("cash");
                  }}
                  className="flex gap-3"
                >
                  {payment === "cash" ? (
                    <i className="text-gray-800 text-xl">
                      <FaRegDotCircle />
                    </i>
                  ) : (
                    <i className="text-gray-400 text-xl">
                      <FaRegCircle />
                    </i>
                  )}
                  Cash On Completion
                </button>
              </li>
              <li className=" text-gray-800  ">
                <button
                  onClick={() => {
                    sessionStorage.setItem("serviceId", serviceId);
                    sessionStorage.setItem("addressId", data?.id);
                    sessionStorage.setItem("package", packageName);

                    setPayment("esewa");
                  }}
                  className=" gap-3 flex place-items-center"
                >
                  {payment === "esewa" ? (
                    <i className="text-gray-800 text-xl">
                      <FaRegDotCircle />
                    </i>
                  ) : (
                    <i className="text-gray-400 text-xl">
                      <FaRegCircle />
                    </i>
                  )}

                  <img src={esewa} className="h-10 w-20 object-cover " alt="" />
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className=" w-[32Vw] bg-white border p-4 space-y-3">
          <div>
            <p className=" text-xl font-semibold text-slate-800  ">
              Order Details
            </p>
          </div>
          <div className="flex gap-4">
            <div className=" ">
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
              <span className="text-gray-600">
                {sessionStorage.getItem("quantity")}
              </span>
            </div>
            <div className="flex justify-between ">
              <h2 className="font-semibold">Total Cost</h2>
              <span className="text-gray-600">
                NPR {sessionStorage.getItem("cost")}
              </span>
            </div>

            <div>
              {payment === "esewa" ? (
                <PaymentEsewa
                  amount={parseInt(sessionStorage.getItem("cost"))}
                />
              ) : (
                <button
                  type="submit"
                  className=" bg-gray-800 text-white text-lg  rounded-md  p-2 w-full"
                  onClick={() => {
                    data?.id ? handleOrder() : setDelivery(true);
                  }}
                >
                  Confirm Order
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
      {delivery && (
        <div className="absolute top-0 w-full h-full bg-[rgba(0,0,0,0.6)]">
          <form
            className="  bg-white w-[40Vw] mx-auto translate-y-24 p-4  space-y-8  h-[85Vh] rounded shadow"
            action=""
            onSubmit={handleSubmit(handleAddress)}
          >
            <div className="   flex gap-4   text-gray-700 ">
              <p className="flex-1 text-2xl font-semibold text-slate-800   ">
                Service Address Details
              </p>
              <button
                className="text-xl  "
                onClick={() => {
                  setDelivery(false);
                }}
              >
                X
              </button>
            </div>

            <div className=" space-y-4 text-[0.95em] overflow-y-auto h-[70%] ">
              <div className="selected-field ">
                <label htmlFor="">Full Name</label>

                <input
                  type="text"
                  defaultValue={data?.name}
                  {...register("name")}
                />
              </div>
              <div className=" selected-field">
                <label htmlFor="">Availble City</label>

                <Select
                  options={locations.map((location) => ({
                    value: location.id,
                    label: location.city,
                  }))}
                  onChange={(option) => {
                    setValue("locationId", option.value);
                  }}
                />
              </div>
              <div className="selected-field ">
                <label htmlFor="">Full Address</label>

                <input
                  type="text"
                  {...register("address")}
                  defaultValue={data?.address}
                />
              </div>
              <div className="selected-field ">
                <label htmlFor="">Phone Number</label>
                <input
                  type="text"
                  {...register("phone_number")}
                  defaultValue={data?.phone_number}
                />
              </div>
              <div className="selected-field ">
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  {...register("email")}
                  defaultValue={data?.email}
                />
              </div>
              <div className="selected-field ">
                <label htmlFor="">Scheduled Date</label>
                <input type="date" {...register("scheduled_date")} />
              </div>
            </div>
            <div className="flex justify-end gap-4 font-semibold place-self-end ">
              <button
                className=" bg-gray-200 rounded w-36 p-2 "
                type="button"
                onClick={() => {
                  setDelivery(false);
                }}
              >
                Cancel
              </button>
              <input
                type="submit"
                value="Save"
                className="border bg-gray-700 rounded w-36 p-2 shadow text-white"
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default OrderConfirm;
