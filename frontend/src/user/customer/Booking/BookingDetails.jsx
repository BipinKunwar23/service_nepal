import React from "react";
import OrderDetails from "../../../components/orderDetail";
import { useViewCustomerOrderDetailQuery } from "../../../Api/orderApi";

import { Outlet } from "react-router-dom";
import Loader from "../../../components/Loader";
import { useParams,useNavigate } from "react-router-dom";
const BookingDetails = () => {
  const { orderId } = useParams();

  const { data: order, isLoading } = useViewCustomerOrderDetailQuery(orderId);
  const navigate=useNavigate()

  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className=" bg-slate-600">
      <section  className="w-[80Vw]  shadow bg-white text-slate-600 shadow-gray-700 p-10 mx-auto  ">

   
        <OrderDetails order={order} />
        <div className="flex justify-around p-3 mb-5">
          <p>
            <strong>Service Provider:</strong>{" "}
            <span className="ml-2">{order.provider?.name}</span>
          </p>
          <p>
            <strong>Email :</strong>{" "}
            <span className="ml-2">{order.provider?.email}</span>
          </p>
          <p>
            <strong>Contact No :</strong>{" "}
            <span className="ml-2">{order.provider?.phone}</span>
          </p>
        </div>
        <div>
          <p className="text-center mb-5">
            <strong>Address :</strong>{" "}
            <span className="ml-3">{`${order.provider.address?.chowk},  ${order.provider.address?.muncipility} - ${order.provider.address?.ward},  ${order.provider.address?.district}`}</span>
          </p>
        </div>
        <div className="mb-5">
          <p className="text-center">
             Response Time: <strong> {order.response_time}</strong>
          </p>
        </div>
        <div className="mt-5 flex justify-evenly">
        
          <button
            className="bg-green-700 p-2 px-4 mx-auto  block rounded-full text-white"
            onClick={() => {
              // dispatch(setStatus(order?.status));
            }}
          >
            Cancel Order
          </button>
          {
            order?.status==="Accepted" && 
            <button
            className="bg-green-700 p-2 px-4 mx-auto  block rounded-full text-white"
            onClick={() => {
              // dispatch(setStatus(order?.status));
              navigate("status");
            }}
          >
            Check Progress
          </button>
          }
        </div>
      </section>
        <section className="">
          <Outlet />
        </section>

     
    </section>
  );
};

export default BookingDetails;
