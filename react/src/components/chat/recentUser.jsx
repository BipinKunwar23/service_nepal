import React from "react";
import { useRecentUsersQuery } from "../../api/chatApi";
import Loader from "../Loader";
import { useSearchParams } from "react-router-dom";
import not_found from "../../images/not_found.jpg"
import { useDispatch, useSelector } from 'react-redux';
import { setSenderMessage } from "../../redux/sellerSlice";
const recentUser = () => {
  const { data: chats=[], isLoading } = useRecentUsersQuery();
  console.log("chats", chats);
  const [searchParms,setSearchParams]=useSearchParams()
  const users = useSelector((state) => state.buyerSlice.users);
  console.log('senderw',users);
  const dispatch=useDispatch();
  const receivedId=searchParms.get('receiverId');
  console.log('receivedId',receivedId);


  if (isLoading) {
    return <Loader />;
  }
  
  return (
    <div className="w-full">
      <h2 className="border-b p-3 text-lg font-semibold">Recent Chats</h2>
      <div className="space-y-3   ">
        {chats.length>0 ? chats.map((chat) => (
          <div key={chat?.user_id} className={`p-3 cursor-pointer  flex gap-3 ${parseInt(receivedId)===chat?.user_id && "bg-[#FA8030]"}  `}  onClick={()=>{
            parseInt(receivedId)!==chat?.user_id &&(
              setSearchParams({receiverId:chat?.user_id}),
              dispatch(setSenderMessage([]))

            )
          }}>
              <div className=" rounded-full relative ">
                <img
                  src={`http://localhost:8000/${chat?.user?.profile?.photo}`}
                  alt=""
                  className=" w-[50px] h-[50px] rounded-full"
                />
                {
                  users.some((user)=>user.id===chat?.user_id) ?
                  <div className=" w-3 h-3  absolute  bottom-0 right-0  bg-green-600 rounded-full " ></div>
                  :
                  <div className=" w-3 h-3  absolute  bottom-0 right-0  bg-gray-600 rounded-full">
                   
                  </div>

                }
              </div>
              <div className="flex-1">
                <div className="mb-1">
                  
                <p className="font-semibold flex">{chat?.user?.name} 
                  
                  </p>
                  
                
                  

                </div>
                <div className="text-gray-500">
                  <p className="line-clamp-1 text-[0.9em]">{chat?.latest_message}</p>
                </div>
              </div>
           
          </div>
        ))
      : <div className="h-full place-content-center grid">
        <img src={not_found} alt="" />
      </div>
      }
      </div>
    </div>
  );
};

export default recentUser;
