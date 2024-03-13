import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SearchBar from "../../../components/search/searchBar";
import { IoNotificationsOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
const BuyerNavbar = () => {
  const [dropdown, setdropdown] = useState(null);
  const name = localStorage.getItem("name");
  const navigate = useNavigate();
  const navbars = [
 
   
    {
      id: 1,
      to: `/user/${name}/notifications`,
      icon:<IoNotificationsOutline/>
    },
    {
      id: 2,
      to: `/user/${name}/chat/receiver`,
      icon:<AiOutlineMessage/>
    },
    {
      id: 3,
      to: "/chat",
      icon:<MdFavoriteBorder/>
    },
   
  ];
  const seller= {
    id: 5,
    to: `/user/${localStorage.getItem('name')}/seller`,
    link:"Become a Seller",
    rquire:"buyer",
  }
if(localStorage.getItem("role")!=="seller"){

  navbars.splice(1,0,seller)
}

  const sidebars = [
    {
      id: 1,
      to: "/",
      link: "",
    },
  ];
  return (
    <div className="  flex gap-4 bg-white p-4">
      <div
        className="text-[2em] mr-28 font-bold text-indigo-600 cursor-pointer "
        onClick={() => {
          navigate(`/user/${localStorage.getItem("name")}`, { replace: true });
        }}
      >
        Labour
      </div>
      <div className="mx-auto w-[40Vw]">
      <SearchBar />

      </div>
      <div className="flex-1 text-gray-600 grid content-center justify-end ">
        <ul className=" flex flex-1 gap-20  ">
          {navbars.map((navbar) => (
            <li key={navbar?.id} className=" grid place-content-center ">
              
                <NavLink to={navbar.to} className="w-full text-[1.6em] ">
                  {" "}
                  {navbar.icon}
                </NavLink>
              
             

            </li>
          ))}
          <li className="relative">
            <img
              src={localStorage.getItem("photo")}
              alt=""
              className="rounded-full border h-[40px] w-[40px] cursor-pointer"
              onClick={() => {
                setdropdown(!dropdown);
              }}
            />
            {dropdown && (
              <ul className="flex flex-col text-[1.1em] w-[300px] absolute top-12 right-0 gap-4 py-5 border boder-gray-300 p-2 rounded-md bg-white">
                <li className="text-gray-600 flex gap-3">
                  <img
                    src={localStorage.getItem("photo")}
                    alt=""
                    className="rounded-full border h-[35px] w-[35px] "
                  />
                  <h2 className="text-lg">{localStorage.getItem("name")}</h2>
                </li>
                <li className="border border-gray-300 rounded-lg p-3">
                  {
                    localStorage.getItem("role")==="seller" ? 
                  <NavLink
                    to={`/user/${localStorage.getItem("name")}/seller/dashboard`}
                    onClick={() => {
                      setdropdown(!dropdown);
                    }}
                  >
                    Switch to Selling
                  </NavLink>:
                    <NavLink
                    to={`/user/${localStorage.getItem("name")}/seller`}
                    onClick={() => {
                      setdropdown(!dropdown);
                    }}
                  >
                   Become a seller
                  </NavLink>
                  }
                </li>
                <li className="text-gray-600 p-2 hover:bg-gray-300 ">
                  <NavLink
                    to={`/user/${localStorage.getItem("name")}/profile`}
                    onClick={() => {
                      setdropdown(!dropdown);
                    }}
                  >
                    Profile
                  </NavLink>
                </li>
                <li className="text-gray-600 p-2 hover:bg-gray-300 ">
                  <NavLink
                    to={`/user/${localStorage.getItem("name")}/order`}
                    onClick={() => {
                      setdropdown(!dropdown);
                    }}
                  >
                    My Order
                  </NavLink>
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
        </ul>
      </div>
    </div>
  );
};

export default BuyerNavbar;
