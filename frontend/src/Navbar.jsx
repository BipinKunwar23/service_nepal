import React, { useEffect, useState } from "react";
import img2 from "./images/Technician.png";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { FaSearch } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";

export default function Naavbar() {
  const logged = localStorage.getItem("logged");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [dropdown, setdropdown] = useState("");

  const RenderNavbar=({navbars})=>{
    return (
      <ul className=" flex-1 flex justify-evenly ml-5  mr-[14Vw] font-semibold">
                  {navbars.map((navbar) => (
                    <li
                      key={navbar?.id}
                      className="text-gray-300"
                    >
                      <NavLink to={navbar.to} className="w-full">
                        {" "}
                        {navbar.link}
                      </NavLink>
                    </li>
                  ))}
                </ul>
    )
  }

  const customers = [
    {
      id: 1,
      link: "Home",
      to: "/",
    },
    {
      id: 2,
      link: "Dashbaord",
      to: "/dashboard/customer",
    },
    {
      id: 3,
      link: "FInd Providers",
      to: "/customer",
    },
    {
      id: 4,
      link: "Find Services",
      to: "/provider/search",
    },
    {
      id: 5,
      link: "My Booking",
      to: "/booking/customer",
    },
    {
      id: 5,
      link: "My Profiles",
      to: "/user/profile",
    },
  
 
   
  ];

 

  const providers = [
    {
      id: 1,
      link: "Home",
      to: "/",
    },
    {
      id: 2,
      link: "Manage Services",
      to: "provider",
    },
    {
      id: 3,
      link: "My Services",
      to: "services/provider",
    },
    {
      id: 4,
      link: "Received Orders",
      to: "/received/orders",
    },
    {
      id: 5,
      link: "Notification",
      to: "/notification",
    },
  ];







 

  const mains = [
    {
      id: 1,
      link: "Home",
      to: "/",
    },
    {
      id: 2,
      link: "About Us",
      to: "/about us",
    },
    {
      id: 3,
      link: "Contact Us",
      to: "/contact",
    },
   
    {
      id: 4,
      link: "How It Works",
      to: "/provider/services",
    },
  ];
  const role=localStorage.getItem('role')
  return (
    <>
      <nav className="flex sticky top-0 p-6 tracking-widest z-10 bg-[#C90000] shadow shadow-gray-500  ">
        <div className="  flex ">
          <p className="text-[1.3em] text-gray-300 font-bold">
            SERVICE MARKET PLACE
          </p>
        </div>
        <div className="flex-1 flex  text-[0.9em] ">
          {
            role==='customer' ? <RenderNavbar navbars={customers}/>:(
              role=='provider' ? <RenderNavbar navbars={providers}/> :
              <RenderNavbar navbars={mains}/>
            )
          }
        </div>
        {!logged ? (
          <div>
            <NavLink
              className="bg-gray-800 p-2 m-5 px-4  rounded-full text-white "
              to="signIn"
            >
              Sign In
            </NavLink>
            <NavLink
              className="bg-gray-800 p-2 px-4 m-5  rounded-full text-white "
              to="register"
            >
              Sign Up
            </NavLink>
          </div>
        ) : (
          <div
            onMouseEnter={() => {
              setdropdown("profile");
            }}
            onMouseLeave={() => {
              setdropdown("");
            }}
            className=" relative"
          >
            <img
              src={img2}
              alt=""
              className="rounded-full border h-[30px] w-[30px]"
            />
            {dropdown === "profile" && (
              <ul className="text-white flex flex-col w-[200px]  font-bold absolute top-8 right-0  bg-black">
                <li className="text-white border-b-2 p-3 hover:bg-red-700 border-gray-400">
                  <NavLink to="user/profile">Profile</NavLink>
                </li>
                <li className="text-white border-b-2 p-2 hover:bg-red-700 border-gray-400">
                  <button
                    onClick={() => {
                      const value = confirm(
                        "Are you sure tha you want to log out form this session"
                        );
                        if (value) {
                          navigate("/", { replace: true });
                        window.location.href="/";
                        localStorage.removeItem("logged");
                        localStorage.removeItem("userId");
                      }
                    }}
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            )}
          </div>
        )}
      </nav>
    </>
  );
}
