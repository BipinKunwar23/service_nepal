import React, { useEffect, useState } from "react";
import { useGetOrderDetailQuery } from "../../../api/seller/orderApi";
import {
  useNavigate,
  useParams,
  Outlet,
  NavLink,
  useLocation,
} from "react-router-dom";
import Loader from "../../../components/Loader";

import {
  useAcceptOrderMutation,
  useCancelOrderMutation,
  useCompleteOrderMutation,
  useDeleteOrderMutation
} from "../../../api/seller/orderApi";
import { useDispatch } from "react-redux";
import ViewPackage from "../../../components/package/package";
import { Chat } from "../../../components/chat/chat";
import { useForm } from "react-hook-form";

const OrderDetail = () => {
  const { orderId } = useParams();
  console.log("orderId", orderId);
  const { data: order, isLoading } = useGetOrderDetailQuery(orderId);
  console.log("orderDetail", order);

  const { register, handleSubmit, reset } = useForm();

  const navigate = useNavigate();
  const [acceptOrder] = useAcceptOrderMutation();
  const [cancelOrder] = useCancelOrderMutation();
  const [completeOrder] = useCompleteOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();


  const [services, setServices] = useState({});
  const [packages, setPackages] = useState([]);
  const [user, setUsers] = useState({});
  const [standard, setStandards] = useState([]);
  const [chat, setChat] = useState(false);

  useEffect(() => {
    if (order) {
      setServices(order?.services);
      setPackages(order?.services?.packages);
      setUsers(order?.customers);
      setStandards(order?.services?.standards);
    }
  }, [order]);
  // const onSubmit = async (values) => {
  //   console.log("data", values);

  //   await placeOrder({
  //     ...values,
  //     // serviceId: serviceId,
  //     quantity: order.quantity,
  //     cost: order.cost,
  //     package: packageName,
  //   })
  //     .unwrap()
  //     .then((response) => {
  //       console.log("response", response);

  //       if (response) {
  //         navigate(`${location?.state?.path}`, { replace: true });
  //       }
  //       reset();
  //     })
  //     .catch((error) => {
  //       console.log("error", error);
  //     });
  // };

  const handleCancelOrder = async () => {
    await cancelOrder(orderId)
      .unwrap()
      .then((response) => {
        console.log(response);
        navigate(`${location?.state?.path}`, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleAcceptOrder = async () => {
    await acceptOrder(orderId)
      .unwrap()
      .then((response) => {
        console.log("response", response);
        navigate(`${location?.state?.path}`, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleCompleteOrder = async () => {
    await completeOrder(orderId)
      .unwrap()
      .then((response) => {
        console.log("response", response);
        navigate(`${location?.state?.path}`, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDeleteOrder = async () => {
    await deleteOrder(orderId)
      .unwrap()
      .then((response) => {
        console.log("response", response);
        navigate(`${location?.state?.path}`, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const location = useLocation();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="  w-full relative bg-white rounded-xl">
      <section className="  border   p-4  ">
        <div>
          <p className="space-x-3 font-semibold ">
            <span>My Orders</span>
            <span>{">"}</span>
            <span>{services?.option?.name}</span>
          </p>
        </div>

        <div className="grid grid-cols-2  gap-5 ">
          {/* {
            order?.status==='Pending' ?
          <div className="bg-white text-gray-600 rounded-2xl border p-4">
            <h2 className="font-semibold text-gray-600  text-2xl mb-3">
              Accept Order
            </h2>
            <form action="" onSubmit={handleSubmit(handleAcceptOrder)}>
              <div className="  flex flex-col ">
                <div className="selected-field ">
                  <label htmlFor=""> Start Date</label>
                  <input type="date" {...register("expected_completion")} />
                </div>
                <div className="selected-field ">
                  <label htmlFor="">Expcted Duration</label>

                  <input
                    type="text"
                    {...register("duration")}
                    placeholder="Duration to complete to task"
                  />
                </div>
                <div className="selected-field ">
                  <label htmlFor="">Rquirements From Sellers</label>

                  <input
                    type="text"
                    {...register("requirements")}
                    placeholder="What buyer need to do?"
                  />
                </div>

                <div className="selected-field ">
                  <label htmlFor="">Discount Percantage</label>

                  <input
                    type="text"
                    {...register("discount")}
                    placeholder="Discount percentage"
                  />
                </div>
   
                <div className="selected-field ">
                  <label htmlFor="">Paymnet Schedule</label>

                  <input
                    type="text"
                    {...register("payment_schedule")}
                    placeholder="When buyer need to do payment"
                  />
                </div>
                <div className="selected-field ">
                  <label htmlFor="">Advance Payment</label>

                  <input
                    type="text"
                    {...register("advance_payment")}
                    placeholder="Paymnet require to pay in advance"
                  />
                </div>
                <div className="selected-field ">
                  <label htmlFor="">Special Notes</label>

                  <input
                    type="text"
                    {...register("note")}
                    placeholder="Write notes"
                  />
                </div>
              </div>
              <div>
                <input type="submit" value="Accept Order" className="bg-gray-800 text-white text-center w-full p-2 rounded-md"/>
              </div>
            </form>
          </div>:
          null
          } */}

          <div className=" bg-white p-4 rounded-2xl">
            <h2 className="font-semibold  text-lg mb-3">Order Details</h2>

            <div>
              <ViewPackage
                packages={packages}
                standards={standard}
                cost={order?.cost}
                quantity={order?.quantity}
                gallery={services?.galleries}
                title={services?.title}
                description={services?.description}
              />
            </div>
            <div>
              <p className="flex justify-between mt-2">
                <span>Staus</span>
                <span>{order?.status}</span>
              </p>
            </div>

            <div className="mt-5 flex justify-around font-semibold">
              {order?.status === "Cancelled" ? (
                <button
                  className="p-2 text-blue-600 underline   block rounded-full "
                  onClick={handleDeleteOrder}
                >
                  Delete Order
                </button>
              ) : (
                <>
                <button
                  className="p-2 text-blue-600 underline   block rounded-full "
                  onClick={handleCancelOrder}
                >
                  Cancel Order
                </button>
                {order?.status === "Active" ? (
                  <button
                    className=" p-2  block rounded-full text-blue-600 underline "
                    onClick={handleCompleteOrder}
                  >
                    Complete Order
                  </button>
                ) : (
                  <button
                    className=" p-2  block rounded-full text-blue-600 underline "
                    onClick={handleAcceptOrder}
                  >
                    Accept Order
                  </button>
                )}
                
                </>
              )}
            </div>
          </div>
          {/* <div className="bg-white rounded-2xl border p-4">
            <h2 className="font-semibold text-gray-600  text-lg mb-3">
              Lets Chat
            </h2>
            <div>
              <Chat receiverId={user?.id} />
            </div>
          </div>
        */}

          <div className=" border p-4">
            <div>
              <h2 className="text-lg font-semibold mb-3">Buyer Details</h2>
            </div>
            <div className="flex gap-4 mb-2">
              <img
                src={`http://localhost:8000/${user?.profile?.photo}`}
                className="w-16 h-16 rounded-full"
                alt=""
              />
              <h2 className="text-lg font-semibold  grid content-center">
                {" "}
                {user?.name}
              </h2>
            </div>

            <div>
              <div className=" mt-3 space-y-4">
                <p className="">
                  <span className="font-semibold">Email </span>
                  <p className="border-2 rounded-lg mt-2 p-2">{user?.email}</p>
                </p>
                <p className="">
                  <span className="font-semibold">Contact No </span>
                  <p className="border-2 rounded-lg mt-2 p-2">
                    {order?.contact_number}
                  </p>
                </p>
                <p className="">
                  <span className="font-semibold">Address </span>
                  <p className="border-2 rounded-lg mt-2 p-2">
                    {order?.delivery_city}
                  </p>
                </p>
              </div>
            </div>
            <div className="mt-8">
              <button
                className="border bg-gray-800 text-white rounded-md  p-2 w-full"
                onClick={() => {
                  setChat(true);
                }}
              >
                Start Chat
              </button>
            </div>
          </div>
        </div>
        {/* <OrderDetails order={order} /> */}
      </section>
      <div
        className={` top-[8Vh]   right-10  justify-items-end  fixed z-10   ${
          chat ? "grid" : "hidden"
        }`}
      >
        <div className="w-[35Vw] mx-auto  bg-white border border-gray-300 shadow my-4 grid  rounded-lg">
          <Chat setChat={setChat} receiverId={user?.id}>
            <div className="">
              <button
                className="text-xl text-gray-400 "
                onClick={() => {
                  setChat(false);
                }}
              >
                {" "}
                X
              </button>
            </div>
          </Chat>
        </div>
      </div>
    </section>
  );
};

export default OrderDetail;
