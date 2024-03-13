import React, { useEffect } from "react";
import ViewNotification from "./viewNotification";
import NotificationType from "./notificationType";
import { setCounts } from "../../redux/sellerSlice";
import { useDispatch, useSelector } from "react-redux";

const Notification = () => {
  const dispatch=useDispatch()
  const count=useSelector((state)=>state.sellerSlice.count);
  useEffect(()=>{
    dispatch(setCounts({...count,notification:0}))
      },[])
  return (
    <section className="flex ">
      <section className="w-[20Vw] min-h-[70Vh]">
        <NotificationType />
      </section>
      <section className="flex-1 border ">
        <ViewNotification/>
      </section>
    </section>
  );
};

export default Notification;
