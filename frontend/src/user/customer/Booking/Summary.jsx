import React from "react";
import { useGetCustomerOrdersQuery } from "../../../Api/orderApi";
import Error from "../../../ErrorHandling/error";
import Loader from "../../../components/Loader";
import { Outlet, useMatch, useNavigate } from "react-router-dom";
import BookingNavbar from "./Navbar";
import { useDispatch } from "react-redux";
import { setStatus } from "../../../redux/orderSlice";
const BookingSummary = () => {
  const id = localStorage.getItem("userId");
  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useGetCustomerOrdersQuery(id);
  console.log("orders", orders);
  const navigate = useNavigate();
  const isOrder = useMatch("booking/customer/order/:orderId");
  const isStatus = useMatch("booking/customer/order/:orderId/status");

  

  const dispatch = useDispatch();

  if (isOrder || isStatus ) {
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
    <section className="p-10 ">
      <section className="grid grid-cols-1  mx-auto gap-2">
        <p className="text-center text-xl font-semibold p-2">Order History</p>

        <table className="w-full box-bordr table-fixed bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Id</th>
              <th className="py-2 px-4 border-b">Service</th>
              <th className="py-2 px-4 border-b">Provider Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Contact No</th>
              <th className="py-2 px-4 border-b">Address</th>

              <th className="py-2 px-4 border-b">Created At</th>
              <th className="py-2 px-4 border-b">Status</th>

              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr key={order?.id}>
                  <td className="py-2 px-4 border-b">{order?.id}</td>

                  <td className="py-2 px-4 border-b max-w-xs overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {order?.service}
                  </td>
                  <td className="py-2 px-4 border-b">{order.provider?.name}</td>
                  <td className="py-2 px-4 border-b  max-w-md overflow-ellipsis break-words ">
                    {order.provider?.email}
                  </td>

                  <td className="py-2 px-4 border-b">
                    {order.provider?.phone}
                  </td>
                  <td className="py-2 px-4 border-b">{`${order.provider?.address?.muncipility}-${order.provider?.address?.ward}, ${order.provider?.address?.district}`}</td>

                  <td className="py-2 px-4 border-b">{order?.created}</td>
                  <td className="py-2 px-4 border-b">
                    {order.status?.isOrder ? "Accepted" : "Pending"}
                  </td>

                  <td className="py-2 px-4 border-b">
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

export default BookingSummary;
