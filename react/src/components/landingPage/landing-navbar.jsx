import React from 'react'
import { useMatch, NavLink,useNavigate } from 'react-router-dom';
import SearchBar from '../search/searchBar';

const LandingNavbar = () => {
    const name=localStorage.getItem('name');

  const navigate=useNavigate()

    return (
        <div className={`   sticky w-full top-0 flex p-4  gap-8  text-white bg-[#1D438A] text-gray-100"   `}>
        <p
          className="text-[2.3em]  font-bold  cursor-pointer "
          onClick={() => {
            navigate("/", { replace: true });
          }}
        >
          Technician
        </p>
       
    
        <div className="  text-[1.1em] flex-1 grid justify-end">
          <ul className=" flex-1 flex gap-8  ">
            <li className=" p-2">
              <NavLink to="/" className="w-full">
                {" "}
                About Us
              </NavLink>
            </li>
            <li className=" p-2">
              <NavLink to="/" className="w-full">
                {" "}
                How it works
              </NavLink>
            </li>
  
            <li className="p-2">
              <NavLink to="user/signin" className="w-full">
                {" "}
                Sign In
              </NavLink>
            </li>
            <li className="p-2  text-white ">
              <NavLink className="bg-red-600 px-4 p-2  rounded-md " to="user/signup">
                Sign Up
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
  
      );
}

export default LandingNavbar