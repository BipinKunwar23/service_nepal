import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import SearchBar from "../../../components/search/searchBar";
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
    <div className="  flex  gap-5 py-6  text-slate-500 p-4">
      <div className=" text-gray-700 grid justify-end flex-1">
        <ul className=" flex-1 flex gap-10   place-content-center ">
          {/* 
          <li className="p-1 text-[1.4em] text-slate-500 ">
            <NavLink to="/user" className="w-full">
              {" "}
              Switch to Buying
            </NavLink>
          </li> */}
          <li className="p-2">
            <NavLink to={`/user/${name}/notifications`} className="w-full flex">
              {" "}
              <IoNotificationsOutline className="text-[1.7em]" />
              <sup
                className={` text-[1.1em] ${
                  count.notification > 0 && "bg-red-600"
                }  rounded-full w-5 h-5 grid place-content-center p-2 text-white`}
              >
                {count.notification > 0 && count.notification}
              </sup>
            </NavLink>
          </li>
          <li className="p-2">
            <NavLink to={`/user/${name}/chat/receiver`} className="w-full flex">
              {" "}
              <AiOutlineMessage className="text-[1.7em]" />
              <sup
                className={` text-[1.1em] ${
                  count.message > 0 && "bg-red-600"
                }  rounded-full w-5 h-5 grid place-content-center p-2 text-white`}
              >
                {count.message > 0 && count.message}
              </sup>
            </NavLink>
          </li>
          <li className="p-2">
            <NavLink to={`/${name}/notifications`} className="w-full">
              {" "}
              <MdFavoriteBorder className="text-[1.7em]" />
            </NavLink>
          </li>

          <li className="relative">
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
              <ul className="flex flex-col text-[1.2em] w-[300px] absolute top-12 right-0 gap-4 py-5 border boder-gray-300 p-2 rounded-md bg-white">
                <li className="text-gray-600 flex gap-3">
                  <img
                    src={localStorage.getItem("photo")}
                    alt=""
                    className="rounded-full border h-[35px] w-[35px] "
                  />
                  <h2 className="text-lg">{localStorage.getItem("name")}</h2>
                </li>
                <li className="border border-gray-300 rounded-lg p-3">
                  <NavLink
                    to={`/user/${localStorage.getItem("name")}`}
                    onClick={() => {
                      setdropdown(!dropdown);
                    }}
                  >
                    Switch to Buying
                  </NavLink>
                </li>
                <li className="text-gray-600 p-3 hover:bg-gray-300 ">
                  <NavLink
                    to={`/user/${localStorage.getItem("name")}/profile`}
                    onClick={() => {
                      setdropdown(!dropdown);
                    }}
                  >
                    Profile
                  </NavLink>
                </li>
                <li className="text-gray-600 p-3 hover:bg-gray-300 ">
                  <NavLink
                    to="/seller/create/job"
                    onClick={() => {
                      setdropdown(!dropdown);
                    }}
                  >
                    My Jobs
                  </NavLink>
                </li>

                <li className="text-gray-600  p-3 hover:bg-gray-300 ">
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
        </ul>
      </div>
    </div>
  );
};

export default SellerNavbar;
