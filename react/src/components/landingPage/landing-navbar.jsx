import React, { useState } from 'react'
import { useMatch, NavLink,useNavigate } from 'react-router-dom';
import SearchBar from '../search/searchBar';
import SignIn from '../auth/signIn';

const LandingNavbar = () => {
    const name=localStorage.getItem('name');
    const [login,setLogin]=useState()

  const navigate=useNavigate()

    return (
      <>
        <div className={`  w-full  flex my-4  gap-8  "   `}>
        <p
          className="text-[1.4em]  font-semibold  cursor-pointer flex gap-3 "
          onClick={() => {
            navigate("/", { replace: true });
          }}
        >
          <span className=''>
          HomeService</span> 
          <span className='text-gray-700'>
          Nepal 
          </span>
        </p>
       
    
        <div className="  text-[1em] flex-1 grid justify-end font-semibold ">
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
              <button  className="w-full"
              onClick={()=>{
                setLogin(!login)
              }}
              >
                {" "}
                Sign In
              </button>
            </li>
            <li className="p-2  text-white ">
              <NavLink className="bg-[rgba(0,0,0,0.8)] px-4 p-2  rounded-md " to="/user/signup">
                Sign Up
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      {
        login &&
      <div className='absolute right-36 top-20'>

      <SignIn/>
      </div>
      }
      </>

  
      );
}

export default LandingNavbar