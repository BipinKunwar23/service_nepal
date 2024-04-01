import React, { useEffect, useState } from "react";
import { useShowNotificaitonsQuery } from "../../api/notificationApi";
import Loader from "../Loader";
import { useDispatch, useSelector } from "react-redux";
import { setNotifications } from "../../redux/sellerSlice";
const viewNotification = () => {
  const { data, isLoading } = useShowNotificaitonsQuery();
  const receiverId = parseInt(localStorage.getItem("userId"));
  console.log("id", typeof receiverId);

  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.sellerSlice.notifications);

  console.log("savednotification", notifications);

  console.log("data", data);
  useEffect(() => {
    if (notifications  && data && (notifications?.length>=data?.length)) {
      dispatch(setNotifications(notifications));
    } else {
      dispatch(setNotifications(data || []));
    }
  
  }, [data]);



  const NotificationMessage = ({ notification, day, time }) => {
    switch (notification?.type) {
      case "App\\Notifications\\Order":
        return (
          <div className="flex gap-3 p-3 ">
            <img
              src={`http://localhost:8000/${notification?.data?.photo}`}
              alt=""
              className="w-[40px] h-[40px] object-cover rounded-full "
            />
            <div className=" w-full space-y-1  ">
              <div className="  w-full flex gap-2 ">
                <p className="text-gray-700 text-[1em] w-full ">
                  <span className=" font-semibold mr-3 text-gray-900 ">
                    {notification?.data?.user}
                  </span>
                  <span>{notification?.data?.subject}</span>
                  <span className="font-semibold text-slate-900 ml-3">
                    {notification?.data?.service}
                  </span>
                </p>
              </div>
              <p className="text-blue-600 inline-block font-semibold">
                <span className="mr-2">{day}</span> <span> {time}</span>
              </p>
            </div>
          </div>
        );
        break;
        case "App\\Notifications\\Service":
          return (
            <div className="flex gap-3 p-3 ">
              <img
                src={`http://localhost:8000/${notification?.data?.photo}`}
                alt=""
                className="w-[40px] h-[40px] object-cover rounded-full "
              />
              <div className=" w-full space-y-1  ">
                <div className="  w-full flex gap-2 ">
                  <p className="text-gray-700 text-[1em] w-full ">
                    <span className=" font-semibold mr-3 text-gray-900 ">
                      {notification?.data?.user}
                    </span>
                    <span>{notification?.data?.subject}</span>
                    <span className="font-semibold text-slate-900 ml-3">
                      {notification?.data?.service}
                    </span>
                  </p>
                </div>
                <p className="text-blue-600 inline-block font-semibold">
                  <span className="mr-2">{day}</span> <span> {time}</span>
                </p>
              </div>
            </div>
          );
          break;

      default:
        break;
    }

    if (isLoading) {
      return <Loader />;
    }

  };
  if(!notifications.length>0){
    return <div className="grid place-content-center h-full">
      <h2>
        No notificaiton founds
      </h2>
    </div>
  }
  return (
    <div className="  ">
      {notifications.map((notification) => {
        const date = new Date(notification?.created_at);
        const day = date.toLocaleDateString(undefined, {
          weekday: "long",
        });

        const time = date.toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <div key={notification?.id} className="bg-white p-4 border-b ">
            <NotificationMessage
              notification={notification}
              day={day}
              time={time}
            />
          </div>
        );
      })}
    </div>
  );
};

export default viewNotification;
