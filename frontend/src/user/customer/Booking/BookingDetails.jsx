import React from "react";
import { useViewCustomerOrderDetailQuery } from "../../../Api/orderApi";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import Loader from "../../../components/Loader";
import { setStatus } from "../../../redux/orderSlice";
import { useDispatch } from "react-redux";
const BookingDetails = () => {
  const { orderId } = useParams();
  const { data, isLoading } = useViewCustomerOrderDetailQuery(orderId);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className=" bg-slate-600">
      <section className="w-[80Vw]  shadow bg-white text-slate-600 shadow-gray-700 p-10 mx-auto rounded-md ">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <p>
              <strong>{data?.order.id}</strong>
            </p>

            <p>
              <strong>Date: {data?.order.created}</strong>
            </p>
          </div>
          <div>
            <p className="text-center  text-lg">
              <strong className="  ">{data?.order?.service_name}</strong>
            </p>
          </div>
          <div className=" flex place-content-center gap-10">
            <p className="text-center mb-2">
              <strong>On : {data?.order.date}</strong>{" "}
              <span className="ml-3 text-orange-600">
                {data?.order.emergency ? "Emergency" : data?.order.delay}
              </span>
            </p>
            <p className="text-center mb-5">
              <strong>Status:</strong>
              <span className="ml-3 text-green-700 font-semibold">
                {data?.order?.status?.isOCancel
                  ? "Cancelled"
                  : data?.order?.status?.isOrder
                  ? "Accepted"
                  : "Pending"}
              </span>
            </p>
          </div>
        </div>
        <section className="w-[80%] mx-auto ">
          <div className="flex flex-col gap-4 mb-5 ">
            <p className="flex flex-col">
              <strong> Descripton</strong> {data?.order.service}
            </p>
            <p className="flex flex-col">
              <strong> Work Load</strong> {data?.order.size}
            </p>
          </div>
          <div className="mb-4">
            <p className="mb-3 font-bold">Ordered Services</p>
            <table cellPadding={4} className=" w-full border-2 border-gray-400">
              <thead>
                <tr className="border border-gray-500">
                  <th className="border border-gray-400">S.N</th>
                  <th className="border border-gray-400">Service</th>
                  <th className="border border-gray-400">Price</th>
                  <th className="border border-gray-400">Unit</th>
                </tr>
              </thead>
              <tbody>
                {data?.scopes.map((scope, index) => {
                  return (
                    <tr
                      className="text-center border border-gray-400"
                      key={scope.id}
                    >
                      <td className="border border-gray-400">{index + 1}</td>
                      <td className="border border-gray-400">{scope?.name}</td>
                      <td className="border border-gray-400">
                        {" "}
                        {scope?.price}
                      </td>
                      <td className="border border-gray-400">{scope?.unit}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="font-bold mb-1">Files or Images</p>
          <div className="grid grid-cols-2 gap-5 mb-5 ">
            {data?.order?.images.map((image) => {
              return (
                <img
                  src={image.url}
                  alt=""
                  key={image.id}
                  className="w-full h-[200px] object-cover my-2  box-border"
                />
              );
            })}
          </div>
        </section>

        <div className="flex justify-around p-3 mb-5">
          <p>
            <strong>Order To :</strong>{" "}
            <span className="ml-2">{data?.order.provider?.name}</span>
          </p>
          <p>
            <strong>Email :</strong>{" "}
            <span className="ml-2">{data?.order.provider?.email}</span>
          </p>
          <p>
            <strong>Contact No :</strong>{" "}
            <span className="ml-2">{data?.order.provider?.phone}</span>
          </p>
        </div>
        <div>
          <p className="text-center mb-5">
            <strong>Address :</strong>{" "}
            <span className="ml-3">{`${data?.order.provider.address?.chowk},  ${data?.order.provider.address?.muncipility} - ${data?.order.provider.address?.ward},  ${data?.order.provider.address?.district}`}</span>
          </p>
        </div>
        <div className="mb-5">
          <p className="text-center">
            Your Response Limit: <strong> {data?.order.response}</strong>
          </p>
        </div>
        <div className="">
            {
             ! data?.order?.status?.cancel?(
             ! data?.order?.status?.isOrder ?(
                <button
                className="bg-green-700 p-2 px-4 mx-auto  block rounded-full text-white"
                onClick={() => {
                  navigate("agreement");
                }}
              >
                Cancel Order
              </button>
              ):(
                !data?.order?.status?.isAgreement ?(
                  <button
                  className="bg-green-700 p-2 px-4 mx-auto  block rounded-full text-white"
                  onClick={() => {
                    navigate("agreement");
                  }}
                >
                  Ask For Agreement
                </button>
                ):(
                  <button
                  className="bg-green-700 p-2 px-4 mx-auto  block rounded-full text-white"
                  onClick={() => {
                    dispatch(setStatus(data?.order?.status))
                    navigate("agreement");

                  }}
                >
                  Check Agreement
                </button>
                )
              )

             ):null
            }

       
        </div>
        <section className="">
          <Outlet />
        </section>
      </section>
    </section>
  );
};

export default BookingDetails;
