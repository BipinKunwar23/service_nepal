import React, { useState } from "react";
import { useGetReceivedOrdersQuery } from "../../../api/seller/orderApi";
import Loader from "../../../components/Loader";
import { NavLink, Outlet, useLocation, useMatch, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { IoIosArrowDropup } from "react-icons/io";

const SellerOrderOverview = () => {
  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useGetReceivedOrdersQuery();
  console.log("orders", orders);
  const navigate = useNavigate();
  const [orderStatus, setOrderStatus] = useState("Pending");
  const [isButton, setButton] = useState(null);
  const location=useLocation()

  const isDetails = useMatch(
    `/${encodeURIComponent(localStorage.getItem("name"))}/orders/:orderId`
  );

  const dispatch = useDispatch();

  if (isLoading) {
    return <Loader />;
  }
  if (isDetails) {
    return (
      <>
        <section>
          <Outlet />
        </section>
      </>
    );
  }
  return (
    <section className="w-full  ">
      <h2 className="text-xl text-blue-600 mb-4 font-semibold ">Manage Orders</h2>
      <section className=" text-[0.9em]">
        <div className="space-x-10 text-gray-800 mb-4 font-semibold">
          <button
            className={` p-2 ${
              orderStatus === "Pending" &&
              "border-b-2  border-green-700  font-semibold"
            } `}
            onClick={() => {
              setOrderStatus("Pending");
            }}
          >
            PENDING
          </button>
          <button
            onClick={() => {
              setOrderStatus("Active");
            }}
            className={` p-2 ${
              orderStatus === "Active" &&
              "border-b-2  border-green-700  font-semibold"
            } `}
          >
            ACTIVE
          </button>
          <button
            onClick={() => {
              setOrderStatus("Completed");
            }}
            className={` p-2 ${
              orderStatus === "Completed" &&
              "border-b-2  border-green-700  font-semibold"
            } `}
          >
            COMPLETED
          </button>
          <button
            onClick={() => {
              setOrderStatus("Delayed");
            }}
            className={` p-2 ${
              orderStatus === "Delayed" &&
              "border-b-2  border-green-700  font-semibold"
            } `}
          >
            LATE
          </button>
          <button
            onClick={() => {
              setOrderStatus("Cancelled");
            }}
            className={` p-2 ${
              orderStatus === "Cancelled" &&
              "border-b-2  border-green-700  font-semibold"
            } `}
          >
            CANCELLED
          </button>
        </div>
        <div>
          <table className="  table-auto w-full bg-white text-gray-800  ">
          <thead>
              <tr className="text-left border-y ">
                <th className="p-3 border-none">
                  <input type="checkbox" />
                </th>
                <th className=" p-3 border-none">BUYER</th>
                <th className="p-3 border-none">SERVICE</th>
              
                <th className="p-3  border-none ">TOTAL </th>

                <th className="p-3  border-none">DUE ON</th>
                <th className="border-none p-3"></th>
              </tr>
            </thead>
            <tbody className="text-[1.1em]">
              {orders
                .filter((order) => order?.status === orderStatus)
                .map((order) => {
                  return (
                    <tr key={order?.id} className="border-b ">
                      <td className="p-3">
                        <input type="checkbox" />
                      </td>
                      <td className="p-3   max-w-md overflow-ellipsis    ">
                        {order?.buyer}
                      </td>
                      <td className="p-3    ">{order?.service}</td>

                      <td className="p-3   max-w-md overflow-ellipsis break-words ">
                        {order?.quantity}
                      </td>

                      <td className="p-3 ">{order?.service_date}</td>

                      <td className="text-center  w-40 relative ">
                        <button
                          className=" text-2xl"
                          onClick={() => {
                            isButton === order.id
                              ? setButton(null)
                              : setButton(order.id);
                          }}
                        >
                          <i>
                            <IoIosArrowDropup />
                          </i>
                        </button>
                        {isButton === order?.id && (
                          <ul className="text-left bg-white border rounded p-3 space-y-2 absolute top-12 left-7 z-10">
                            <li
                              onClick={() => {
                                navigate(`${order.id}`, {state:{
                                  path:location?.pathname
                                }});
                              }}
                              className="cursor-pointer"
                            >
                              VIEW
                            </li>
                            <li
                              className="cursor-pointer"
                              onClick={() => {
                                DeletingService(service?.id);
                              }}
                            >
                              CANCEL
                            </li>
                          </ul>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
};

export default SellerOrderOverview;
