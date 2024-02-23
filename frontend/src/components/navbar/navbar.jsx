import React, { useState } from "react";
import { NavLink, useLocation, useMatch, useNavigate } from "react-router-dom";

import { FaSearch } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import SellerNavbar from "./seller-navbar";
import LandingNavbar from "./landing-navbar";
import UserNavbar from "./user-navbar";

const Navbar = () => {
  const logged = localStorage.getItem("logged");
  const role=localStorage.getItem("role");
  const name=localStorage.getItem('name')
  const isSeller = useMatch(`user/${encodeURIComponent(name)}/*`);


  const customers = [
    {
      id: 5,
      link: "Notification",
      to: "/booking/customer",
    },
    {
      id: 6,
      link: "Message",
      to: "/user/profile",
    },
    {
      id: 7,
      link: "Orders",
      to: "/chat",
    },
  ];
  const sellers = [
    {
      id: 5,
      link: "Notification",
      to: "/booking/customer",
    },
    {
      id: 6,
      link: "Message",
      to: "/user/profile",
    },
    {
      id: 7,
      link: "My Orders",
      to: "/chat",
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
