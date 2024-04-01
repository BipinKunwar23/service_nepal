import React, { useEffect } from "react";
import ViewNotification from "./viewNotification";
import NotificationType from "./notificationType";
import { setCounts } from "../../redux/sellerSlice";
import { useDispatch, useSelector } from "react-redux";

const Notification = () => {
  const dispatch=useDispatch()
  // const count=useSelector((state)=>state.sellerSlice.count);
  // useEffect(()=>{
  //   dispatch(setCounts({...count,notification:0}))
  //     },[])
  const notifications = useSelector((state) => state.sellerSlice.notifications);

  return (
    <section className="">
      <h2 className=" text-blue-400 font-semibold text-2xl p-4 px-8 border-b border-orange-500">Notifications</h2>
      <section className="flex gap-3">
        {/* <div className="w-[20Vw] min-h-[70Vh]"> 
        <NotificationType />

        </div> */}
        <div className="w-[70Vw] shadow h-screen mx-auto m-5">
        <ViewNotification/>

        </div>
      </section>
     
    </section>
  );
};

export default Notification;
