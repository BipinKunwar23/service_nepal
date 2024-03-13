import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoPeople } from "react-icons/io5";
import { FaBook, FaServicestack, FaTachometerAlt } from "react-icons/fa";
import { FaAddressBook } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { SlCalender } from "react-icons/sl";
import { MdDashboard } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { RiDashboard3Line } from "react-icons/ri";

import { FaHome, FaUser, FaCog } from 'react-icons/fa';

export default function Sidebar() {
  const [parent, setParent] = useState(null);
  const navlinks = [
    {
      id: 1,
      link: "Home",
      to: "/",
      icon:<FaHome/>
    },
    {
      id: 2,
      link: "Dashboard",
      to: "dashboard",
      icon: <RiDashboard3Line/>
    },
    {
      id: 3,
      link: "Contents",
      icon:<FaBook/>,

      subLinks: [
        {
          id: 1,
          link: "Catalog",
          to: "category",
          icon: <BiCategory/>
        },
        {
          id: 2,
          link: "Subcategory",
          to: "/subcategory",
        },
        {
          id: 3,
          link: "Services",
          to: "/services",
        },
      ],
    },

    {
      id: 4,
      link: "Users",
      to: "/",
      icon:<IoPeople/>
    },
    {
      id: 5,
      link: "Services",
      to: "/",
      icon: <FaServicestack/>
    },
    {
      id: 6,
      link: "Setting",
      to: "/",
      icon:<FaTachometerAlt/>
    },
  ];

  return (
    <>
      <div>
        <nav className=" shadow border-r w-[250px] shadow-white text-lg flex flex-col text-[1em] min-h-screen text-gray-600 ">
          <h2 className="text-xl font-semibold ml-10  m-10 ">Admin Page </h2>
          <ul className="space-y-8 ">
            {navlinks.map((link) => {
              return (
                <li key={link.id} className="   ">
                  {link?.subLinks ? (
                    <button
                      className="mx-10 flex gap-4 "
                      onClick={() => {
                        parent !== link?.id
                          ? setParent(link?.id)
                          : setParent(null);
                      }}
                    >
                      <i className="text-blue-600">
                        {link?.icon}
                      </i>
                      {link?.link}
                    </button>
                  ) : (
                    <NavLink
                      to={link.to}
                      className=" mx-10  flex gap-4"
                      onClick={() => {
                        setParent(null);
                      }}
                    >
                      <i className="text-blue-600 text-[1.2em]">
                        {link?.icon}
                      </i>
                      {link?.link}
                    </NavLink>
                  )}

                  {parent && parent === link.id && (
                    <ul className=" space-y-6">
                      <li></li>
                      {navlinks
                        .find((link) => link.id === parent)
                        .subLinks?.map((sublink) => (
                          <li key={sublink.id} className="">
                            <NavLink
                              to={sublink.to}
                              className=" ml-[70px] flex gap-4"
                            >
                              <i className="text-blue-600 text-xl">
                                {sublink.icon}
                              </i>
                              {sublink?.link}
                            </NavLink>
                          </li>
                        ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
