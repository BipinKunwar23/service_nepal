import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import logo from "../../../images/logo.png"

import { useDispatch, useSelector } from "react-redux";
const AdminNavbar = () => {
  const [dropdown, setdropdown] = useState(null);
  const name = localStorage.getItem("name");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const count = useSelector((state) => state.sellerSlice.count);
  console.log('count',count);

  return (
    <div className="  flex gap-4   p-2 text-gray-700  border-b ">
     

      <div className="flex-1  grid content-center justify-end ">
        <ul className="  flex gap-2 px-3  place-items-center ">
          <li className=" flex ">
            <NavLink
              to={`/admin/notification`}
              className="w-full text-[1.5em]  "
            >
              <IoNotificationsOutline />

            </NavLink>
              {
                count.notification>0 &&
              <sup className={` text-[1.1em] bg-red-600  rounded-full w-5 h-5 grid place-content-center p-2 text-white`}>{count.notification>0 && count.notification}</sup>
              }
          </li>

          <li className="relative"></li>
          <li className="relative">
            <img
              src={logo}
              alt=""
              className="rounded-full border h-[30px] w-[30px] cursor-pointer"
              onClick={() => {
                setdropdown(!dropdown);
              }}
            />
            {dropdown && (
              <ul className="flex flex-col text-[1.05em] w-[300px] font-semibold  bg-white shadow absolute top-12 right-0 gap-3 py-3 border boder-gray-300 p-2 rounded-md ">
                <li className="border-2 border-gray-300 rounded-lg p-3 bg-white flex gap-2">
                  <img
                    src={logo}
                    alt=""
                    className="rounded-full border h-[30px] w-[30px] "
                  />
                </li>
               
                

                <li className="text-gray-600  p-2 hover:bg-gray-300 ">
                  <button
                    onClick={() => {
                      localStorage.removeItem("logged");
                      localStorage.removeItem("userId");
                      localStorage.removeItem("token");

                      window.location.href = "/";
                      navigate("/", { replace: true });
                    }}
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            )}
          </li>
          <li >
            {localStorage.getItem('name')}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminNavbar;
