import React, { useState } from "react";
import { useGetCustomerOrdersQuery } from "../../../api/buyer/orderApi";
import Loader from "../../../components/Loader";
import { Outlet, useMatch, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setStatus } from "../../../redux/buyerSlice";
const BuyerOrderList = () => {
  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useGetCustomerOrdersQuery();
  console.log("orders", orders);
  const navigate = useNavigate();
  const isOrder = useMatch("booking/customer/order/:orderId");
  const isStatus = useMatch("booking/customer/order/:orderId/status");
  const [orderStatus,setOrderStatus]=useState("Pending")

  const dispatch = useDispatch();

  // if (isOrder || isStatus ) {
  //   return (
  //     <>
  //       <section>
  //         <Outlet />
  //       </section>
  //     </>
  //   );
  // }
  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="">
      <section className="grid grid-cols-1  mx-auto gap-2 text-lg">
      <div className="flex place-content-center p-4 gap-10">
        <button className={` p-2 ${orderStatus==="Pending" && "border-b-2  border-green-700  font-semibold"} `}
        onClick={()=>{
          setOrderStatus("Pending")
        }}
        >Pending</button>
        <button
        onClick={()=>{
          setOrderStatus("Running")
        }}
        className={` p-2 ${orderStatus==="Running" && "border-b-2  border-green-700  font-semibold"} `}
        >Running</button>
        <button
        onClick={()=>{
          setOrderStatus("Completed")
        }}
        className={` p-2 ${orderStatus==="Completed" && "border-b-2  border-green-700  font-semibold"} `}
        >Completed</button>

      </div>

        <table className="w-full box-border table-auto bg-white border  border-gray-200">
          <thead>
            <tr className="text-left bg-blue-600 text-white">
              <th className="py-4 px-4 border-b">Order Id</th>
              <th className="py-2 px-4 border-b">Service</th>
              <th className="py-2 px-4 border-b">Seller Name</th>
              <th className="py-2 px-4 border-b"> Quantity</th>
              <th className="py-2 px-4 border-b">Total Cost</th>

              <th className="py-2 px-4 border-b">Ordered At</th>

              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody className="">
            {orders.filter((order=>order?.status===orderStatus)).map((order) => {
              return (
                <tr key={order?.id}>
                  <td className="py-4 px-4 border">{order?.id}</td>

                  <td className="py-2 px-4 border max-w-xs overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {order?.service}
                  </td>
                  <td className="py-2 px-4 border">{order?.seller}</td>
                  <td className="py-2 px-4 border  max-w-md overflow-ellipsis break-words ">
                    {order?.quantity}
                  </td>

                  <td className="py-2 px-4 border">{order?.cost}</td>

                  <td className="py-2 px-4 border">{order?.created_at}</td>

                  <td className="py-2 px-4 border">
                    <button
                      className=" text-indigo-600"
                      onClick={() => {
                        dispatch(setStatus(order?.status));
                        navigate(`order/${order.id}`);
                      }}
                    >
                      View More
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </section>
  );
};

export default BuyerOrderList;
