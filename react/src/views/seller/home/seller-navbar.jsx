import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import SearchBar from "../../../components/search/searchBar";
import { setCounts } from "../../../redux/sellerSlice";
import { useDispatch, useSelector } from "react-redux";
const SellerNavbar = ({ profile }) => {
  const logged = localStorage.getItem("logged");
  const name = localStorage.getItem("name");
  const count = useSelector((state) => state.sellerSlice.count);
  console.log("count", count);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [dropdown, setdropdown] = useState("");
  return (
    <div className="  flex bg-white  gap-5    p-2.5">
      <div className=" grid justify-end flex-1">
        <ul className=" flex-1 flex   place-items-center gap-1 ">
          {/* 
          <li className="p-1 text-[1.4em] text-slate-500 ">
            <NavLink to="/user" className="w-full">
              {" "}
              Switch to Buying
            </NavLink>
          </li> */}
          <li className="">
            <NavLink
              to={`/user/${name}/seller/notification`}
              className=" flex"
              onClick={() => {
                dispatch(setCounts({ ...count, notification: 0 }));
              }}
            >
              {" "}
              <IoNotificationsOutline className="text-[1.4em] font-bold text-gray-700" />
              <sup
                className={` text-[1.em] ${
                  count.notification > 0 && "bg-red-600 border shadow"
                }  rounded-full w-6 h-6 grid place-content-center font-semibold  text-white`}
              >
                {count.notification > 0 && count.notification}
              </sup>
            </NavLink>
          </li>
          <li className="">
            <NavLink to={`/user/${name}/chat/receiver`} className="w-full flex">
              {" "}
              <AiOutlineMessage className="text-[1.4em] text-gray-700" />
              <sup
                className={` text-[1em] ${
                  count.message > 0 && "bg-red-600"
                }  rounded-full w-5 h-5 grid place-content-center  text-white`}
              >
                {count.message > 0 && count.message}
              </sup>
            </NavLink>
          </li>
         
          <li className="relative ml-2">
            <div>
              <img
                src={localStorage.getItem("photo")}
                alt=""
                className="rounded-full border h-[35px] w-[35px] cursor-pointer"
                onClick={() => {
                  setdropdown(!dropdown);
                }}
              />
            </div>
            {dropdown && (
              <ul className="flex flex-col w-[250px] text-[1em] text-black shadow bg-gray-50  absolute top-12 right-0 gap-2  p-4 z-10">
                <li className=" flex gap-3">
                  <img
                    src={localStorage.getItem("photo")}
                    alt=""
                    className="rounded-full border h-[30px] w-[30px] "
                  />
                  <h2 className="text-lg">{localStorage.getItem("name")}</h2>
                </li>
                <li className="border-2 border-gray-300 rounded-lg p-2">
                  <NavLink
                    to={`/user/${localStorage.getItem("name")}`}
                    onClick={() => {
                      setdropdown(!dropdown);
                    }}
                  >
                    Switch to Buying
                  </NavLink>
                </li>
                <li className="p-2">
                  <NavLink
                    to={`/user/${localStorage.getItem("name")}/profile`}
                    onClick={() => {
                      setdropdown(!dropdown);
                    }}
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li className=" p-2 ">
                  <NavLink
                    to="/seller/create/job"
                    onClick={() => {
                      setdropdown(!dropdown);
                    }}
                  >
                    My Services
                  </NavLink>
                </li>
                <li className=" p-2 ">
                  <NavLink
                    to="/seller/create/job"
                    onClick={() => {
                      setdropdown(!dropdown);
                    }}
                  >
                    My Orders
                  </NavLink>
                </li>
                <li className=" p-2 border-t-2  ">
                  <NavLink
                    to={`/user/${localStorage.getItem("name")}/profile`}
                    onClick={() => {
                      setdropdown(!dropdown);
                    }}
                  >
                    My Profile
                  </NavLink>
                </li>{" "}
                <li className=" p-2 ">
                  <NavLink
                    to="/seller/create/job"
                    onClick={() => {
                      setdropdown(!dropdown);
                    }}
                  >
                    Account
                  </NavLink>
                </li>
                <li className=" p-2 ">
                  <NavLink
                    to="/seller/create/job"
                    onClick={() => {
                      setdropdown(!dropdown);
                    }}
                  >
                    Setting
                  </NavLink>
                </li>
                <li className=" p-2 ">
                  <button
                    onClick={() => {
                      localStorage.removeItem("logged");
                      localStorage.removeItem("userId");
                      localStorage.removeItem("token");

                      window.location.href = "/";
                      navigate("/", { replace: true });
                    }}
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SellerNavbar;
