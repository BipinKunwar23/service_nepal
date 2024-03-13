import React, { useState } from "react";
import { useGetCustomerOrdersQuery } from "../../../api/buyer/orderApi";
import Loader from "../../../components/Loader";
import { NavLink, Outlet, useMatch, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
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
  const [orderStatus, setOrderStatus] = useState("Pending");

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
    <section className="">
      <section className="grid grid-cols-1  mx-auto gap-2 text-lg">
        <div className="flex place-content-center p-4 gap-10">
          <button
            className={` p-2 ${
              orderStatus === "Pending" &&
              "border-b-2  border-green-700  font-semibold"
            } `}
            onClick={() => {
              setOrderStatus("Pending");
            }}
          >
            Pending
          </button>
          <button
            onClick={() => {
              setOrderStatus("Running");
            }}
            className={` p-2 ${
              orderStatus === "Running" &&
              "border-b-2  border-green-700  font-semibold"
            } `}
          >
            Running
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
            Completed
          </button>
        </div>

        <table className="w-full box-border table-auto bg-white border  border-gray-200">
          <thead>
            <tr className="text-left bg-blue-600 text-white">
              <th className="py-4 px-4 border-b">Order Id</th>
              <th className="py-2 px-4 border-b">Service</th>
              <th className="py-2 px-4 border-b">Seller Name</th>
              <th className="py-2 px-4 border-b"> Package</th>

              <th className="py-2 px-4 border-b"> Quantity</th>
              <th className="py-2 px-4 border-b">Total Cost</th>

              <th className="py-2 px-4 border-b">Created At</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody className="">
            {orders
              .filter((order) => order?.status === orderStatus)
              .map((order) => {
                return (
                  <tr key={order?.id}>
                    <td className="p-4 border">{order?.id}</td>

                    <td className="p-4 border   ">
                      <div className="flex justify-between">
                        <p> {order?.service}</p>
                        <button>
                          <Link
                            to={`/user/service/${order?.service_id}`}
                            className=" text-xs   bg-slate-800 text-white text-center p-1 px-2 rounded bottom-full  mb-2"
                          >
                            view
                          </Link>
                        </button>
                      </div>
                    </td>

                    <td className="p-4 border  max-w-md overflow-ellipsis    ">
                      <div className="flex justify-between">
                        <p>{order?.seller}</p>
                        <NavLink
                          to={`/user/service/${order?.service_id}#seller`}
                          className=" text-xs   bg-slate-800 text-white text-center p-1 px-2 rounded bottom-full  mb-2"
                        >
                          view
                        </NavLink>
                      </div>
                    </td>
                    <td className="p-4 border cursor-pointer max-w-md overflow-ellipsis    ">
                      <div className="flex justify-between">
                        <p>{order?.package}</p>
                        <NavLink
                          to={`/user/service/${order?.service_id}`}
                          className=" text-xs   bg-slate-800 text-white text-center p-1 px-2 rounded bottom-full  mb-2"
                        >
                          view
                        </NavLink>
                      </div>
                    </td>
                    <td className="p-4 border  max-w-md overflow-ellipsis break-words ">
                      {order?.quantity}
                    </td>

                    <td className="p-4 border">{order?.cost}</td>

                    <td className="p-4 border">{order?.created_at}</td>

                    <td className="p-4 border">
                      <button
                        className=" text-indigo-600"
                        onClick={() => {
                          dispatch(setStatus(order?.status));
                          navigate(`${order.id}`);
                        }}
                      >
                        Cancel
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
