import React from "react";
import { useGetProviderReceivedOrdersQuery } from "../../../Api/orderApi";
import Loader from "../../../components/Loader";
import { useNavigate } from "react-router-dom";
const customerOrder = () => {
  const id = localStorage.getItem("userId");
  const { data: orders, isLoading } = useGetProviderReceivedOrdersQuery(id);
  const navigate=useNavigate();
  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="p-10 ">
      <section className="grid grid-cols-1  mx-auto gap-2">
      <p className="text-center text-xl font-semibold p-2">Order History</p>
        <table className="" cellPadding={8}>
          <thead>
            <tr className="text-left bg-blue-500 text-white p-4 mb-4 " >
              <th>Id</th>
              <th>Service</th>
              <th>Customer Name</th>
              <th>Contact No</th>
              <th>Email</th>
              <th>Ordered At</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

            <tbody>
              {orders.map((order) => {
              return  <tr key={order.id} className="mb-2 even:bg-slate-400 odd:bg-gray-600 text-white ">
                  <td>{order.id}</td>
                  <td>{order.service}</td>
                  <td>{order.name}</td>
                  <td>{order.contact}</td>
                  <td>{order.email}</td>
                  <td>{order.created}</td>
                  <td>{order.status}</td>
                  <td>
                    <button className=" text-orange-400 text-lg underline" 
                    onClick={()=>{
                        navigate(`/received/orders/${order.id}`)
                    }}
                    >
                      View
                    </button>
                  </td>
                </tr>;
              })}
            </tbody>
        </table>
      </section>
    </section>
  );
};

export default customerOrder;
