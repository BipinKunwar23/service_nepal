import React from "react";
import { useViewAllOrdersQuery } from "../../../api/admin/userApi";
import Loader from "./../../../components/Loader";
const UserOrders = () => {
  const { data, isLoading } = useViewAllOrdersQuery();
  console.log("users", data);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="p-4 mt-6">
      <div>
        <h2 className="text-4xl text-blue-400">Orders</h2>
      </div>
      <div className="my-4">
        <ul className="flex gap-14 text-gray-400 ">
          <li>
            <button>ACTIVE</button>
          </li>
          <li>
            <button>PENDING ORDERS</button>
          </li>
          <li>
            <button>CANCELLED</button>
          </li>
          <li>
            <button>DELAYED</button>
          </li>
          <li>
            <button>COMPLETED</button>
          </li>
          <li>
            <button>DUE ON</button>
          </li>
        </ul>
      </div>
      <table className="w-full box-border table-auto  bg-white text-gray-500 text-[1em] ">
        <thead>
        <tr className="border-b "
               onClick={()=>{
                setButton(false)
              }}
              >
                <th className="border-none text-lgntext-left" colSpan={5}>
                  ACTIVE ORDERS
                </th>
              </tr>
          <tr className="text-left font-semibold  border-b text-gray-700 ">
            <td className="p-2">
              <input type="checkbox" />
            </td>
            <td className="p-2">ORDER ID</td>
            <td className="p-2">SERVICE</td>

            <td className="p-2">BUYER</td>
            <td className="p-2">SELLER</td>
            <td className="p-2">QUANTITY</td>
            <td className="p-2">TOTAL</td>



          </tr>
        </thead>
        <tbody className="">
          {data?.map((order) => {
            return (
              <tr key={order?.id} className="text-left border-b text-gray-500">
                <td className="py-3 px-2">
                  <input type="checkbox" />
                </td>
                <td className=" w-[300px]  p-2">{order?.id}</td>
                <td className=" w-[300px]  p-2">{order?.service?.name}</td>


                <td className=" w-[300px]  p-2">{order?.buyer?.name}</td>
                
                <td className="   w-[400px] overflow-ellipsis p-2 ">
                  {order?.title}
                </td>
                <td className=" w-30 p-2  ">{order?.seller?.name}</td>
                <td className=" w-30 p-2  ">{order?.quantity}</td>
                <td className=" w-30 p-2  ">{order?.total}</td>



                <td className="text-center p-2  w-[100px] relative text-red-600 underline ">
                  Remove
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserOrders;
