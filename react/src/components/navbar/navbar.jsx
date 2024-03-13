import React, { useState } from "react";
import { NavLink, useLocation, useMatch, useNavigate } from "react-router-dom";

import { FaSearch } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import SellerNavbar from "./seller-navbar";
import LandingNavbar from "../landingPage/landing-navbar";
import UserNavbar from "./user-navbar copy";
import { IoNotificationsOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";

const Navbar = () => {
  const logged = localStorage.getItem("logged");
  const role=localStorage.getItem("role");
  const name=localStorage.getItem('name')
  const isSeller = useMatch(`user/${encodeURIComponent(name)}/*`);

  const customers = [
    {
      id: 1,
      to: "/booking/customer",
      icon:<IoNotificationsOutline/>
    },
    {
      id: 2,
      to: `/${name}/chat/receiver`,
      icon:<AiOutlineMessage/>
    },
    {
      id: 3,
      to: "/chat",
      icon:<MdFavoriteBorder/>
    },
    {
      id: 4,
      to: `/${name}/orders`,
      link:"orders"
    },
    {
      id: 5,
      to: `/user/${localStorage.getItem('name')}`,
      link:"Become a Seller"
    },
  ];
  const sellers = [
    {
      id: 5,
      to: "/booking/customer",
      link:<IoNotificationsOutline/>
    },
    {
      id: 6,
      to: `/${name}/chat/receiver`,
      link:<AiOutlineMessage/>
    },
    {
      id: 7,
      to: "/chat",
      link:"orders"
    },
    {
      id: 8,
      to: "/user",
      link:"Become a Buyer"
    },
  ];



  return (
    <nav className="sticky   top-0  text-white z-10    ">
 

      {logged ? (
        isSeller && role==="seller" ? (
          <SellerNavbar  />
          ) : isSeller ? (
          <UserNavbar navbars={sellers} />
        ) : (
          <UserNavbar navbars={customers} />
        )
      ) : (
        <LandingNavbar />
      )}
    </nav>
  );
};

export default Navbar;
