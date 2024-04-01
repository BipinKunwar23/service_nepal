import React from "react";
import {
  Outlet,
  useLocation,
  useMatch,
  useNavigate,
  NavLink,
} from "react-router-dom";
import { IoPeople } from "react-icons/io5";

import { GiMoneyStack } from "react-icons/gi";
import { SlCalender } from "react-icons/sl";
import { FaServicestack, FaTachometerAlt , FaClipboardList,FaSignOutAlt, FaCalendar, FaHome} from "react-icons/fa";
const Sidebar = () => {
  const seller = `/user/${localStorage.getItem("name")}/seller`;
  const name = localStorage.getItem("name");
  const navigate = useNavigate();
  const business = [
    {
      id: 2,
      link: "Dashboard",
      to: `${seller}/dashboard`,
      icon: <FaHome />,
    },
    {
      id: 3,
      link: "Services",
      to: `${seller}/services`,
      icon: <FaServicestack />,
    },

    {
      id: 4,
      link: "Orders",
      to: `${seller}/orders`,
      icon: <FaClipboardList />,
    },
    {
      id: 5,
      link: "Customers",
      to: `${seller}/customer`,
      icon: <IoPeople />,
    },
    
    {
      id: 7,
      link: "Earnings",
      to: "earning",
      icon: <GiMoneyStack />,
    },
    {
      id: 8,
      link: "Calender",
      to: "calender",
      icon: <FaCalendar />,
    },
  ];
  const users = [
    {
      id: 7,
      link: "Profile",
      to: "profile",
      icon: <FaClipboardList />,
    },
    {
      id: 8,
      link: "Account",
      to: "account",
      icon: <FaClipboardList />,
    },
    {
      id: 9,
      link: "Setting",
      to: "/seting",
      icon: <FaTachometerAlt />,
    },
    
  ];
  return (
    <div className="">
        

        <div className="flex place-items-center p-4 gap-3  ">
        <h2 className="text-2xl font-semibold">ProHome Nepal</h2>
        </div>
        
      <nav className="admin  flex flex-col text-[1em]  font-semibold mt-2">
        <ul className="space-y-3  ">
          {business.map((link) => {
            return (
              <li key={link.id} className=" text-gray-500  ">
                <NavLink
                  to={link.to}
                  className=" p-2 px-4 flex gap-4"
                  onClick={() => {
                    setParent(null);
                  }}
                >
                  <i className="text-blue-600 text-[1.2em]">{link?.icon}</i>
                  {link?.link}
                </NavLink>
              </li>
            );
          })}
          <li className="w-full border"></li>
          {users.map((link) => {
            return (
              <li key={link.id} className="text-gray-500   ">
                <NavLink
                  to={link.to}
                  className=" p-2 px-4  flex gap-4"
                  onClick={() => {
                    setParent(null);
                  }}
                >
                  <i className="text-blue-600 text-[1.2em]">{link?.icon}</i>
                  {link?.link}
                </NavLink>
              </li>
            );
          })}
          <li className="  p-2 px-4  flex gap-4 text-gray-500  ">
            <i className="text-blue-600">
              <FaSignOutAlt />
            </i>
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
      </nav>
    </div>
  );
};

export default Sidebar;
