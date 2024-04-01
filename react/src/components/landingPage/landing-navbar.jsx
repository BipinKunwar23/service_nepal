import React from 'react'
import { useMatch, NavLink,useNavigate } from 'react-router-dom';
import SearchBar from '../search/searchBar';

const LandingNavbar = () => {
    const name=localStorage.getItem('name');

  const navigate=useNavigate()

    return (
        <div className={`  w-full  flex p-3  gap-8   text-gray-100"   `}>
        <p
          className="text-[2em]  font-semibold  cursor-pointer flex gap-3 "
          onClick={() => {
            navigate("/", { replace: true });
          }}
        >
          <span className='text-white'>
          ProHome</span> 
          <span className='text-gray-700'>
          Nepal 
          </span>
        </p>
       
    
        <div className="  text-[1em] flex-1 grid justify-end font-semibold text-white">
          <ul className=" flex-1 flex gap-4  ">
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
              <NavLink to="/user/signin" className="w-full">
                {" "}
                Sign In
              </NavLink>
            </li>
            <li className="p-2  text-white ">
              <NavLink className="bg-[rgba(0,0,0,0.8)] px-4 p-2  rounded-md " to="/user/signup">
                Sign Up
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
  
      );
}

export default LandingNavbar