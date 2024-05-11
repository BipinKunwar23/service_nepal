import React, { useEffect } from "react";
import RecentUser from "./recentUser";
import { Outlet, useMatch, useSearchParams, useNavigate } from "react-router-dom";
import { Chat } from "./chat";
import { useDispatch, useSelector } from "react-redux";
import { setCounts } from "../../redux/sellerSlice";
import BuyerNavbar from "../../views/buyer/home/buyer-navbar";
import SellerNavbar from "../../views/seller/home/seller-navbar";

const viewChat = () => {
  const [searchParms, setSearchParams] = useSearchParams();
  const receiverId = searchParms.get("receiverId");
  const count = useSelector((state) => state.sellerSlice.count);
  const role=localStorage.getItem('role')
  const navigate=useNavigate()
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCounts({ ...count, message: 0 }));
  }, []);
  return (
    <>
    {
      role==="buyer" ? <BuyerNavbar/> : <div className="flex justify-between p-2 border-b ">
        <div className="grid place-content-center">
          <button className="text-orange-600 text-2xl font-semibold"
          onClick={()=>{
            navigate(`/user/${localStorage.getItem('name')}/seller/dashboard`, {replace:true})
          }}
          >ProHome Nepal</button>
        </div>
        <SellerNavbar/>
      </div>
    }
    <section className="flex p  min-h-screen ">
      <div className="w-[30Vw]   overflow-y-auto border-r  ">
        <RecentUser />
      </div>
      <div className="  p-2 w-[60Vw] border-r  ">
        {receiverId ? (
          <Chat receiverId={parseInt(receiverId)} />
        ) : (
          <div className="grid place-content-center h-full bg-blue-50">
            <p className="text-4xl text-gray-400 font-semibold font-mono ">Start Conversation</p>
          </div>
        )}
      </div>
    </section>
    </>

  );
};

export default viewChat;
