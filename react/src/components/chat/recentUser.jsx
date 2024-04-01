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
    <div className="w-full">
      <h2 className="border-b p-3 text-lg font-semibold">Recent Chats</h2>
      <div className="space-y-3   ">
        {chats?.map((chat) => (
          <div key={chat?.user_id} className="p-3 cursor-pointer border-b flex gap-3 " onClick={()=>{
            setSearchParams({receiverId:chat?.user_id})
          }}>
              <div className=" rounded-full ">
                <img
                  src={`http://localhost:8000/${chat?.user?.profile?.photo}`}
                  alt=""
                  className=" w-[50px] h-[50px] rounded-full"
                />
              </div>
              <div className="flex-1">
                <div className="mb-1">
                <p className="font-semibold ">{chat?.user?.name} <sup className="text-green-600">Online</sup></p>

                </div>
                <div className="text-gray-500">
                  <p className="line-clamp-1 text-[0.9em]">{chat?.latest_message}</p>
                </div>
              </div>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default recentUser;
