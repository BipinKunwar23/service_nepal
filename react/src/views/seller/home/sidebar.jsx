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
import { FaTag } from 'react-icons/fa'
import {
  FaServicestack,
  FaTachometerAlt,
  FaClipboardList,
  FaSignOutAlt,
  FaCalendar,
  FaHome,
} from "react-icons/fa";
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
      id: 7,
      link: "Earnings",
      to: "earning",
      icon: <GiMoneyStack />,
    },
    {
      id: 8,
      link: "Calender",
      to: "calender",
      icon: <SlCalender />,
    },
    {
      id: 15,
      link: "Promotion",
      to: `${seller}/promotion`,
      icon: <FaTag />,
    },
  ];
  const users = [
    {
      id: 7,
      link: "Profile",
      to:`/user/${localStorage.getItem("name")}/profile`,
      icon: <FaClipboardList />,
    },
    {
      id: 8,
      link: "Account",
      to: "account",
      icon: <FaClipboardList />,
    },
  ];
  return (
    <div className="text-gray-100">
      <div className="flex place-items-center p-4 gap-3  ">
        <h2 className="text-xl font-semibold">HomeService Nepal</h2>
      </div>

      <nav className="admin  flex flex-col text-[1em]  font-semibold mt-2">
        <ul className="space-y-4  ">
          {business.map((link) => {
            return (
              <li key={link.id} className="  ">
                <NavLink
                  to={link.to}
                  className=" p-2 px-4 flex gap-4"
                  onClick={() => {
                    setParent(null);
                  }}
                >
                  <i className=" text-[1.2em]">{link?.icon}</i>
                  {link?.link}
                </NavLink>
              </li>
            );
          })}
          <li className="w-full border"></li>
          {users.map((link) => {
            return (
              <li key={link.id} className="   ">
                <NavLink
                  to={link.to}
                  className=" p-2 px-4  flex gap-4"
                  onClick={() => {
                    setParent(null);
                  }}
                >
                  <i className=" text-[1.2em]">{link?.icon}</i>
                  {link?.link}
                </NavLink>
              </li>
            );
          })}
          <li className="  p-2 px-4  flex gap-4   ">
            <i className=" ">
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
