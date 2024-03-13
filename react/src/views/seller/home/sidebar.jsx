import React from 'react'
import { Outlet, useLocation, useMatch, useNavigate, NavLink } from "react-router-dom";
import { FaCalendar, FaHome } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { FaServicestack } from "react-icons/fa";
import { FaAddressBook } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { SlCalender } from "react-icons/sl";
const Sidebar = () => {
  const seller=`/user/${localStorage.getItem('name')}/seller`
  const name=localStorage.getItem('name')
  const navigate=useNavigate()
  return (

    <div className=" p-4 h-screen bg-white overflow-y-auto w-full ">
    <ul className=" space-y-5  text-[1.2em]   mx-auto  ">
      <li>
        <p
          className="text-[1.6em] p-2 font-semibold text-pink-600 cursor-pointer "
          onClick={() => {
            navigate("/", { replace: true });
          }}
        >
          Technician
        </p>
      </li>
      <li className=" p-2 ">
        <NavLink to={`${seller}/dashboard`} className="w-full flex gap-4">
        <i>
          <FaHome className="text-xl"/>
        </i>
          {" "}
          Dashboard
        </NavLink>
      </li>
     
      <li className="p-2">
        <NavLink to={`${seller}/services`} className="w-full flex gap-4">
      <i>
          <FaServicestack className="text-xl"/>
        </i>
          {" "}
          Services
        </NavLink>
      </li>
      <li className=" p-2">
        <NavLink to={`${seller}/orders`} className="w-full flex gap-4">
      <i>
          <FaAddressBook className="text-xl"/>
        </i>
          {" "}
          Orders
        </NavLink>
      </li>
    
      <li className=" p-2">
        <NavLink to="/" className="w-full flex gap-4">
      <i>
          <GiMoneyStack className="text-xl"/>
        </i>
          {" "}
          Earnings
        </NavLink>
      </li>
      <li className=" p-2">
        <NavLink to="/" className="w-full flex gap-4">
      <i>
          <FaCalendar className="text-xl"/>
        </i>
          {" "}
          Calenders
        </NavLink>
      </li>
  
    </ul>
  </div>
  )
}

export default Sidebar