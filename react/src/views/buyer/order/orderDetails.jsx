import React, { useEffect, useState } from "react";
import OrderDetails from "../../../components/orderDetail";
import { useViewOrderDetailsQuery } from "../../../api/buyer/orderApi";

import ViewPackage from "../../../components/package/package";

import { Outlet } from "react-router-dom";
import Loader from "../../../components/Loader";
import { useParams, useNavigate } from "react-router-dom";
import { Chat } from "../../../components/chat/chat";
const BuyerOrderDetail = () => {
  const { orderId } = useParams();

  const { data: order, isLoading } = useViewOrderDetailsQuery(orderId);
  console.log('order',order);

  const navigate = useNavigate();
  const [services, setServices] = useState({});
  const [packages, setPackages] = useState([]);
  const [user, setUsers] = useState({});
  const [standard, setStandards] = useState([]);
  const [description, setDescription] = useState([]);



  useEffect(() => {
    if (order) {
      setServices(order?.services);
      setPackages(order?.services?.packages);
      setUsers(order?.services?.user);
      setStandards(order?.services?.standards);
      setDescription(order?.services?.description);

    }
  }, [order]);

 


  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className=" bg-slate-50 ">
      <section className="  border text-slate-600 p-4   ">
        <div>
          <p className="space-x-3 font-semibold text-lg">
            <span>Home</span>
            <span>{">"}</span>
            <span>My Orders</span>
          </p>
        </div>
        <h2 className="text-4xl  font-semibold my-4">
          {services?.option?.name}
        </h2>
        <div className="grid grid-cols-3 gap-1 ">
          <div className="border bg-white p-4 rounded-2xl">
            <h2 className="font-semibold text-gray-600  text-2xl mb-3">
              Order Details
            </h2>
            <div>
              {
                packages && packages.length>0 &&
                <ViewPackage
                  packages={packages}
                  standards={standard}
                  cost={order?.cost}
                  quantity={order?.quantity}
                  gallery={services?.galleries}
                  title={services?.title}
                />
              }
            </div>
            <div>
              <p className="flex justify-between text-xl mt-2">
                <strong>Staus</strong>
                <span>{order?.status}</span>
              </p>
            </div>
            <div className="mt-5 flex justify-around font-semibold">
              <button
                className="bg-green-700 p-2 px-4   block rounded-full text-white"
                onClick={() => {
                  // dispatch(setStatus(order?.status));
                }}
              >
                Cancel Order
              </button>
              <button
                className="bg-slate-400 p-2 px-4  block rounded-full text-gray-800 "
                onClick={() => {
                  // dispatch(setStatus(order?.status));
                  navigate("status");
                }}
              >
                About Service
              </button>
            </div>
          </div>
          <div className="bg-white rounded-2xl border p-4">
            <h2 className="font-semibold text-gray-600  text-2xl mb-3">
              Seller Details
            </h2>

            <div>
              <div className="flex gap-4 mb-2">
                <img
                  src={`http://localhost:8000/${user?.profile?.photo}`}
                  className="w-24 h-24 rounded-full"
                  alt=""
                />
                <h2 className="text-2xl font-semibold  grid content-center">
                  {" "}
                  {user?.name}
                </h2>
              </div>
              <div>
                <p>{user?.profile?.bio}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold my-2">Contact Details</h2>
                <div className="space-y-4">
                  <p className="">
                    <strong>Email </strong>
                    <span className="block">{user?.email}</span>
                  </p>
                  <p className="">
                    <strong>Contact No </strong>
                    <span className="block">{user?.profile?.phone_number}</span>
                  </p>
                  <p className="">
                    <strong>Address </strong>
                    <span className="block">{user?.profile?.address}</span>
                  </p>
                </div>
              </div>
              <div className="flex justify-center font-semibold mt-5">
                <button
                  className="text-blue-600 underline "
                  onClick={() => {
                    // dispatch(setStatus(order?.status));
                    navigate("status");
                  }}
                >
                  View More
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border p-4">
            <h2 className="font-semibold text-gray-600  text-2xl mb-3">
              Lets Chat
            </h2>
            <div>
              <Chat receiverId={user?.id} />
            </div>
          </div>
         
        </div>
        {/* <OrderDetails order={order} /> */}
      </section>
    </section>
  );
};

export default BuyerOrderDetail;
