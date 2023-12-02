import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';

export default function Naavbar() {

  

  const dashbars = [
    {
      id: 1,
      link: "Home",
      to: "/",
    },
    {
      id: 2,
      link: "Dashboard",
      to: "/dashboard",
    },
    {
      id: 3,
      link: "Category",
      to: "/category",
    },
  
    {
      id: 4,
      link: "Approval",
      to: "/",
    },
    {
      id: 5,
      link: "Feedbacks",
      to: "/",
    },
    {
      id: 6,
      link: "Setting",
      to: "/",
    },
 
 
  ];


 
  return (
    <>
    
    <nav className="flex sticky top-0   z-10 bg-gray-200 border-b-2  border-gray-400 ">
      <h2 className="text-2xl font-semibold  text-center p-8  ">Admin </h2>
    <ul className="flex flex-1 place-self-center ml-[10%] ">
      {
        dashbars.map((dashbar)=>{
          return <li key={dashbar.id} className="  p-3 ">
          <NavLink to={dashbar.to} className=" m-5 ">
            {dashbar?.link}
          </NavLink>
          </li>
        })
      }
    </ul>
  
    </nav>

    </>
  );
}
