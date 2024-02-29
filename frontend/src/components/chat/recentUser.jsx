import React from "react";
import { useRecentUsersQuery } from "../../api/chatApi";
import Loader from "../Loader";
import { useSearchParams } from "react-router-dom";
const recentUser = () => {
  const { data: chats, isLoading } = useRecentUsersQuery();
  console.log("chats", chats);
  const [searchParms,setSearchParams]=useSearchParams()

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="">
      <h2 className="border-b p-5 text-xl">Recent Chats</h2>
      <div className="space-y-3 py-5  ">
        {chats?.map((chat) => (
          <div key={chat?.user_id} className="p-3 cursor-pointer" onClick={()=>{
            setSearchParams({receiverId:chat?.user_id})
          }}>
            <div className="flex gap-4">
              <div className="w-[55px] h-[55px] rounded-full">
                <img
                  src={`http://localhost:8000/${chat?.user?.profile?.photo}`}
                  alt=""
                  className="w-full h-full rounded-full"
                />
              </div>
              <div>
                <div className="mb-1">
                <p className="text-lg ">{chat?.user?.name} <sup className="text-green-600">Online</sup></p>

                </div>
                <div className="text-gray-600">
                  <p className="line-clamp-1">{chat?.latest_message}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default recentUser;
