import React, { useEffect } from "react";
import RecentUser from "./recentUser";
import { Outlet, useMatch, useSearchParams } from "react-router-dom";
import { Chat } from "./chat";
import { useDispatch, useSelector } from "react-redux";
import { setCounts } from "../../redux/sellerSlice";

const viewChat = () => {
  const [searchParms, setSearchParams] = useSearchParams();
  const receiverId = searchParms.get("receiverId");
  const count = useSelector((state) => state.sellerSlice.count);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCounts({ ...count, message: 0 }));
  }, []);
  return (
    <section className="flex p-4   ">
      <div className="w-[30Vw]  h-full overflow-y-auto border ">
        <RecentUser />
      </div>
      <div className=" border p-2 w-[60Vw] ">
        {receiverId ? (
          <Chat receiverId={receiverId} />
        ) : (
          <div className="grid place-content-center h-full">
            <p className="text-4xl text-gray-600">Start Conversation</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default viewChat;
