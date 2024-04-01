import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoPeople } from "react-icons/io5";
import {
  FaBook,
  FaServicestack,
  FaTachometerAlt,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";

import { BiCategory } from "react-icons/bi";

import { FaHome, FaUser, FaCog } from "react-icons/fa";

export default function Sidebar() {
  const [parent, setParent] = useState(null);
  const navlinks = [
    {
      id: 2,
      link: "Dashboard",
      to: "dashboard",
      icon: <FaHome />,
    },
    {
      id: 3,
      link: "Catalog",
      to: "category",
      icon: <BiCategory />,
    },

    {
      id: 4,
      link: "Users",
      to: "users",
      icon: <IoPeople />,
    },
    {
      id: 5,
      link: "Services",
      to: "services",
      icon: <FaServicestack />,
    },
    {
      id: 7,
      link: "Orders",
      to: "orders",
      icon: <FaClipboardList />,
    },
    {
      id: 6,
      link: "Setting",
      to: "/",
      icon: <FaTachometerAlt />,
    },
  ];

  const abouts = [
    {
      id: 2,
      link: "Company",
      to: "about/company",
      icon: <FaHome />,
    },
    {
      id: 3,
      link: "Teams",
      to: "about/team",
      icon: <IoPeople />,
    },

    {
      id: 4,
      link: "FAQS",
      to: "about/faq",
      icon: <FaBook />,
    },
    {
      id: 4,
      link: "Legals",
      to: "about/legal",
      icon: <FaBook />,
    },
  ];

  return (
    <>
      <div className="   ">
      <div
        className="text-[1.6em] mr-4 p-4 mb-2  space-x-3 font-semibold text-white  cursor-pointer "
        onClick={() => {
          navigate(`/user/${localStorage.getItem("name")}`, { replace: true });
        }}
      >
        <span>ProHome</span>
        <span className="">Nepal</span>
      </div>
        <nav className="admin  flex flex-col text-[1em]  font-semibold ">
          <ul className="space-y-3  ">
            {navlinks.map((link) => {
              return (
                <li key={link.id} className="   ">
                  <NavLink
                    to={link.to}
                    className=" p-2 px-4 flex gap-4"
                    onClick={() => {
                      setParent(null);
                    }}
                  >
                    <i className="text-[1.2em]">{link?.icon}</i>
                    {link?.link}
                  </NavLink>
                </li>
              );
            })}
            <li className="w-full border"></li>
            {abouts.map((link) => {
              return (
                <li key={link.id} className="   ">
                  <NavLink
                    to={link.to}
                    className=" p-2 px-4  flex gap-4"
                    onClick={() => {
                      setParent(null);
                    }}
                  >
                    <i className="text-[1.2em]">{link?.icon}</i>
                    {link?.link}
                  </NavLink>
                </li>
              );
            })}
            <li className="  p-2 px-4  flex gap-4 ">
              <i className="">
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
    </>
  );
}
