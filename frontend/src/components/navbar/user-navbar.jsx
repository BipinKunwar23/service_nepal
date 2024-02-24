import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import img2 from "../../images/logo.png"
const UserNavbar = ({navbars}) => {
  const [dropdown,setdropdown]=useState(null)
  const name=localStorage.getItem('name')
  const navigate=useNavigate()
  return (
    <div className="  flex gap-10 bg-white p-4">
    <p
      className="text-[1.5em]  font-bold text-pink-600 cursor-pointer "
      onClick={() => {
        navigate("/", { replace: true });
      }}
    >
      Technician
    </p>
      <div className="flex-1">
      <input
        type="search"
        className="bg-white p-2 w-full border border-pink-300 rounded-lg"
        placeholder="What service are you looking today ?"
      />
    </div>
    <div className=" text-red-500 text-[1em] grid content-center ">
      
      <ul className=" flex flex-1 gap-10   ">
        {navbars.map((navbar) => (
          <li key={navbar?.id} className="font-semibold ">
            <NavLink to={navbar.to} className="w-full" target="_blank">
              {" "}
              {navbar.link}
            </NavLink>
          </li>
        ))}
        <li className="relative">
          <img
            src={img2}
            alt=""
            className="rounded-full border h-[30px] w-[30px] cursor-pointer"
            onClick={() => {
              setdropdown(!dropdown);
            }}
          />
          {dropdown && (
            <ul className="flex flex-col w-[200px] absolute top-8 right-0  bg-white">
              <li className="text-gray-600 p-3 hover:bg-gray-300 ">
                <NavLink to={`/user/${name}/profile`}onClick={()=>{
                  setdropdown(!dropdown)
                }}>Profile</NavLink>
              </li>
              <li className="text-gray-600 p-3 hover:bg-gray-300 ">
                <NavLink to="/seller/create/job" onClick={()=>{
                  setdropdown(!dropdown)
                }}>My Jobs</NavLink>
              </li>
              <li className="text-gray-600 p-3 hover:bg-gray-300 ">
                <NavLink to={`/user/${name}`} onClick={()=>{
                  setdropdown(!dropdown)
                }}>Become a seller</NavLink>
              </li>
              <li className="text-gray-600  p-2 hover:bg-gray-300 ">
                <button
                  onClick={() => {
                    setdropdown(!dropdown)
                    localStorage.removeItem("logged");
                    localStorage.removeItem("userId");
                    localStorage.removeItem("token");

                    window.location.href = "/";
                    navigate("/", { replace: true });
                  }}
                >
                  Sign Out
                </button>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
    </div>
  );
}

export default UserNavbar