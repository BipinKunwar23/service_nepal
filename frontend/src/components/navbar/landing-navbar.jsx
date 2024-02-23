import React from 'react'
import { useMatch, NavLink,useNavigate } from 'react-router-dom';

const LandingNavbar = () => {
    const name=localStorage.getItem('name');
  const isbuyer = useMatch(`buyer/${name}/*`);
  const navigate=useNavigate()

    return (
        <div className={`    flex p-4  gap-8 ${isbuyer ? "bg-white text-slate-500" : "bg-[#1D438A] text-gray-100"}   `}>
        <p
          className="text-[2.3em]  font-bold  cursor-pointer "
          onClick={() => {
            navigate("/", { replace: true });
          }}
        >
          Technician
        </p>
        {
          isbuyer && 
        <div className="w-[33Vw] grid content-center">
          <input
            type="search"
            className="bg-white p-2 w-full border border-pink-300 rounded-lg"
            placeholder="What service are you looking today ?"
          />
        </div>
        }
    
        <div className="  text-[1.2em] flex-1 grid justify-end">
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
  
            <li className=" p-2">
              <NavLink to="/seller" className="w-full">
                {" "}
                Become a seller
              </NavLink>
            </li>
            <li className="p-2">
              <NavLink to="signin" className="w-full">
                {" "}
                Sign In
              </NavLink>
            </li>
            <li className="p-2  text-white ">
              <NavLink className="bg-red-600 px-4 p-2  rounded-md " to="signup">
                Sign Up
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
  
      );
}

export default LandingNavbar