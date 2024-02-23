import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
const SellerNavbar = ({ profile }) => {
  const logged = localStorage.getItem("logged");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [dropdown, setdropdown] = useState("");
  return (
    <div className="  flex  gap-5 p-6  bg-white text-slate-500">
      <p
        className="text-[2em]  font-semibold text-pink-600 cursor-pointer "
        onClick={() => {
          navigate("/", { replace: true });
        }}
      >
        Technician
      </p>
      <div className="flex-1 grid content-center ">
        <ul className=" flex gap-10 w-[80%]  text-[1.2em]   mx-auto  ">
          <li className=" p-2">
            <NavLink to="/" className="w-full">
              {" "}
              Dashboard
            </NavLink>
          </li>
          <li className="p-2">
            <NavLink to="/" className="w-full">
              {" "}
              My services
            </NavLink>
          </li>
          <li className=" p-2">
            <NavLink to="/" className="w-full">
              {" "}
              Earnings
            </NavLink>
          </li>
          <li className="p-2">
            <NavLink to="/" className="w-full">
              {" "}
              Overview
            </NavLink>
          </li>
        </ul>
      </div>
      <div className=" text-gray-700 ">
        <ul className=" flex-1 flex gap-10   ">
          <li className="p-2">
            <NavLink to="/" className="w-full">
              {" "}
              <IoNotificationsOutline className="text-[1.5em]" />
            </NavLink>
          </li>
          <li className="p-2">
            <NavLink to="/" className="w-full">
              {" "}
              < AiOutlineMessage className="text-[1.5em]"/>
            </NavLink>
          </li>
          <li className="p-2">
            <NavLink to="/" className="w-full">
              {" "}
              <MdFavoriteBorder className="text-[1.5em]" />
            </NavLink>
          </li>
         

          <li className="p-1 text-[1.2em] text-slate-500 ">
            <NavLink to="/seller/jh" className="w-full">
              {" "}
              Order
            </NavLink>
          </li>
          <li className="relative">
            <div>
              <img
                 src={localStorage.getItem('photo')}

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
                    src={localStorage.getItem('photo')}
                    alt=""
                    className="rounded-full border h-[35px] w-[35px] "
                  />
                  <h2 className="text-lg">{localStorage.getItem('name')}</h2>
                </li>
                <li className="border border-gray-300 rounded-lg p-3">
                  <NavLink to={`/user`}
                  onClick={()=>{
                    setdropdown(!dropdown)
                  }}
                  >Switch to Buying</NavLink>
                </li>
                <li className="text-gray-600 p-3 hover:bg-gray-300 ">
                  <NavLink  to={`/user/${localStorage.getItem('name')}/profile`}
                   onClick={()=>{
                    setdropdown(!dropdown)
                  }}
                  >Profile</NavLink>
                </li>
                <li className="text-gray-600 p-3 hover:bg-gray-300 ">
                  <NavLink to="/seller/create/job" onClick={()=>{
                    setdropdown(!dropdown)
                  }}>My Jobs</NavLink>
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
