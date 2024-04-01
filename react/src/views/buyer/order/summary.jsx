import React, { useState } from "react";
import { useGetCustomerOrdersQuery } from "../../../api/buyer/orderApi";
import Loader from "../../../components/Loader";
import { NavLink, Outlet, useMatch, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setStatus } from "../../../redux/buyerSlice";
import { IoIosArrowDropup } from "react-icons/io";

const BuyerOrderList = () => {
  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useGetCustomerOrdersQuery();
  console.log("orders", orders);
  const navigate = useNavigate();
  const [orderStatus, setOrderStatus] = useState("Active");
  const [isButton, setButton] = useState(null);

  const isDetails = useMatch(
    `/user/${encodeURIComponent(localStorage.getItem("name"))}/order/:orderId`
  );

  const dispatch = useDispatch();

  if (isDetails) {
    return (
      <>
        <section>
          <Outlet />
        </section>
      </>
    );
  }

  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="bg-gray-100 p-4">
      <h2 className="text-xl text-blue-600 mb-12 mt-3 font-semibold">My Orders</h2>
      <section className="grid grid-cols-1  mx-auto gap-2 font-semibold">
        <div className="  space-x-10  text-gray-700 text-[0.9em] font-semibold mb-3">
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
              setOrderStatus("Late");
            }}
            className={` p-2 ${
              orderStatus === "Late" &&
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
        <section className="bg-white text-[0.9em]">
          <table className="w-full box-border table-auto  text-gray-700 border-collapse even:bg-gray-200">
            <thead>
              <tr className="text-left border-b ">
                <th className="py-4 px-4  border-none">Seller</th>
                <th className="py-2 px-4 border-none">Service</th>

                <th className="py-2 px-4 border-none ">Total </th>

                <th className="py-2 px-4 border-none">Date Order</th>
              </tr>
            </thead>
            <tbody className="">
              {orders
                .filter((order) => order?.status === orderStatus)
                .map((order) => {
                  return (
                    <tr key={order?.id} className="border-b">
                      <td className="p-4   max-w-md overflow-ellipsis    ">
                        <p>{order?.seller}</p>
                      </td>
                      <td className="p-4    ">
                        <div className="flex justify-between">
                          <p> {order?.service}</p>
                        </div>
                      </td>

                      <td className="p-4   max-w-md overflow-ellipsis break-words ">
                        {order?.quantity}
                      </td>

                      <td className="p-4 ">{order?.created_at}</td>

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
                                navigate(`${order.id}`);
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
        </section>
      </section>
    </section>
  );
};

export default BuyerOrderList;
