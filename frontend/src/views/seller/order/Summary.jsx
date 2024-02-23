import React from "react";
import { useGetProviderReceivedOrdersQuery } from "../../../Api/orderApi";
import Loader from "../../../components/Loader";
import { Outlet, useMatch, useNavigate } from "react-router-dom";
import OrderNavbar from "./Navbar";
const OrderSummary = () => {
  const id = localStorage.getItem("userId");
  const { data: orders, isLoading } = useGetProviderReceivedOrdersQuery(id);

  const navigate = useNavigate();
  const isOrder = useMatch("received/orders/:orderId");
  const isAgreement = useMatch("received/orders/agreement/:orderId");
  const isStatus = useMatch("received/orders/:orderId/progress");
  const isUpdate = useMatch("received/orders/:orderId/progress/update");
  const isStatusDetail=useMatch("received/orders/:orderId/:progressId/more");

  if (isOrder || isAgreement || isStatus || isUpdate || isStatusDetail) {
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
    <section className="min-h-screen ">
      <section className="grid grid-cols-1  mx-auto gap-2">
        <p className="text-center text-xl font-semibold p-2 border-b-2 border-slate-500">Order Summary</p>

        <table className="w-full box-bordr table-fixed bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Id</th>
              <th className="py-2 px-4 border-b">Service</th>
              <th className="py-2 px-4 border-b">Customer Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Ordered Date</th>
              <th className="py-2 px-4 border-b">Status</th>

              <th className="py-2 px-4 border-b">Action</th>

            </tr>
          </thead>
          <tbody>
       

            {orders.map((order) => {
              return (
                <tr key={order?.id}>
                  <td className="py-2 px-4 border-b">{order?.id}</td>

                  <td
                    className="py-2 px-4 border-b max-w-xs overflow-hidden whitespace-nowrap overflow-ellipsis"
                  >
                    {order?.service}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {order?.name}
                  </td>
                  <td className="py-2 px-4 border-b overflow-ellipsis break-words max-w-sm">{order?.email}</td>

                  <td className="py-2 px-4 border-b  ">{order?.contact}</td>
                  <td className="py-2 px-4 border-b">{order?.created}</td>
                  <td className="py-2 px-4 border-b">{order?.status}</td>


                  <td className="py-2 px-4 border-b">
                  <button
                      className=" text-indigo-600"
                      onClick={() => {
                        navigate(`/received/orders/${order.id}`);
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

export default OrderSummary;
