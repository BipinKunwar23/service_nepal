import React, { useEffect, useState } from "react";
import { useShowNotificaitonsQuery } from "../../api/notificationApi";
import Loader from "../Loader";
import { useDispatch, useSelector } from "react-redux";
import { setNotifications } from "../../redux/sellerSlice";
const viewNotification = () => {
  const {data,isLoading}=useShowNotificaitonsQuery()
  const receiverId=parseInt(localStorage.getItem('userId'))
  console.log('id',typeof(receiverId));


  const dispatch=useDispatch();
  const notifications=useSelector((state)=>state.sellerSlice.notifications);

  
  
  console.log("data", data);
  useEffect(() => {
    if (data) {
      dispatch(
      setNotifications(data)

      )
    }
  }, [data]);




 
  if(isLoading){
    return <Loader/>
  }
  return (
    <div className="divide-y-2 bg-white  ">
      {notifications.map((notification) => {
        const date=new Date(notification?.created_at)
        const day = date.toLocaleDateString(undefined, {
          weekday: 'long'
        });
    
        const time = date.toLocaleTimeString(undefined, {
          hour: '2-digit',
          minute: '2-digit'
        });
        return (
          <div key={notification?.id} className="bg-white p-4">
            <div className="flex gap-5 w-[80%] ">
              <img
                src={`http://localhost:8000/${notification?.sender?.profile?.photo}`}
                alt=""
                className="w-[50px] h-[50px] rounded-full "
              />
              <div className=" w-full space-y-1  ">
                <h2 className="text-lg font-semibold ">
                  {notification?.sender?.name}
                </h2>
                <div className=" mb-2 w-full ">
                  <p className="text-gray-700 text-[1.1em] w-full ">
                    {notification?.body}
                  </p>
                </div>
                <p className="text-blue-600 inline-block ">
                  <span className="mr-2">{day}</span>  <span> {time}</span>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default viewNotification;
