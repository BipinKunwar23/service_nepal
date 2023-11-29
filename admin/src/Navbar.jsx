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
      id: 1,
      link: "Dashboard",
      to: "/dashboard",
    },
    {
      id: 1,
      link: "Category",
      to: "/category",
    },
  
    {
      id: 1,
      link: "Approval",
      to: "/",
    },
    {
      id: 1,
      link: "Feedbacks",
      to: "/",
    },
    {
      id: 1,
      link: "Setting",
      to: "/",
    },
 
 
  ];


 
  return (
    <>
    
    <nav className=" shadow shadow-white flex text-white text-[1em] gap-20 sticky top-0 bg-gray-900 z-10">
      <h2 className="text-2xl font-semibold  text-center p-8  ">Admin </h2>
    <ul className="flex flex-1 place-self-center  ">
      {
        dashbars.map((dashbar)=>{
          return <li key={dashbar.id} className="  p-3 ">
          <NavLink to={dashbar.to} className="text-white m-5">
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
