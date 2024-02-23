import React, { useEffect } from "react";
import { useGetProviderReceivedOrderDetailQuery } from "../../../Api/orderApi";
import { useNavigate, useParams, Outlet, NavLink, useLocation } from "react-router-dom";
import Loader from "../../../components/Loader";
import { setStatus } from "../../../redux/orderSlice";
import {
  useAcceptOrderMutation,
  useCancelOrderMutation,
} from "../../../Api/orderApi";
import { useDispatch } from "react-redux";
import OrderDetails from "../../../components/orderDetail";
const OrderDetail = () => {
  const { orderId } = useParams();
  const { data:order, isLoading } = useGetProviderReceivedOrderDetailQuery(orderId);

  const navigate = useNavigate();
  const [acceptOrder, { isLoading: isAccept }] = useAcceptOrderMutation();
  const [cancelOrder, { isLoading: isCancel }] = useCancelOrderMutation();
  const dispatch = useDispatch();

  const handleCancelOrder = async () => {
    await cancelOrder(orderId)
      .unwrap()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleAcceptOrder = async () => {
    await acceptOrder(orderId)
      .unwrap()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };


const location=useLocation();
  
  if (isLoading || isAccept || isCancel) {
    return <Loader />;
  }
  return (
    <section className=" bg-slate-600">
    <section className="w-[80Vw]  shadow bg-white text-slate-600 shadow-gray-700 p-10 mx-auto ">
      
      <OrderDetails order={order}/>

      <div className="flex justify-around p-3 mb-5">
        <p>
          <strong>Customer Name:</strong>{" "}
          <span className="ml-2">{order.name}</span>
        </p>
        <p>
          <strong>Email :</strong>{" "}
          <span className="ml-2">{order.email}</span>
        </p>
        <p>
          <strong>Contact No :</strong>{" "}
          <span className="ml-2">{order.number}</span>
        </p>
      </div>
     
      <div className="mb-5">
        <p className="text-center">
          Your Response Time: <strong> {order.response_time}</strong>
        </p>
      </div>

      
      <div className="mt-5 grid grid-cols-2">
      
        <button
          className="bg-green-700 p-2 px-4 mx-auto  block rounded-full text-white"
          onClick={handleAcceptOrder}
        >
          Cancel Order
        </button>
     {
      order?.status==="Accepted" ?    <button
      className="bg-green-700 p-2 px-4 mx-auto  block rounded-full text-white"
      onClick={()=>{
        navigate('progress',{state:{
          path:location.pathname
        }})
      }}
    >
    Add Progress
    </button>:
       <button
       className="bg-green-700 p-2 px-4 mx-auto  block rounded-full text-white"
       onClick={handleAcceptOrder}
     >
       Accept Order
     </button>
     }
      </div>
    </section>
      <section className="">
        <Outlet />
      </section>
  </section>
  );
};

export default OrderDetail;
