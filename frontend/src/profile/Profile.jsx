import React, { useState } from "react";
import logo from "../images/logo.png";
import { FaEnvelope } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {useViewProfileQuery} from '../Api/ProfileApi'

function Profile() {
  const navigate = useNavigate();
  const location =useLocation()
  const userId= localStorage.getItem('userId');
  const { data: user, isLoading, isError, error } = useViewProfileQuery(userId);
  console.log(user);

 if(isLoading){
  return <div>loading profile</div>
 }
  return (
    <div className="grid place-content-center p-5">
      <div className="flex gap-5 w-[70Vw] p-1 bg-white shadow shadow-gray-700 rounded-lg ">
        <div className="flex  w-[25Vw] flex-col gap-4">
          <div className="  flex place-content-center  p-1 ">
            <img
              className="w-[260px] h-[260px] border-2 border-[rgba(0,0,0,.3)] rounded-full"
              src={  user?.photo ? `http://localhost:8000/${user.photo}`: logo}
              alt=""
            />
          </div>
          <div className=" grid grid-cols-1 p-5">
            <ul className="flex flex-col gap-6">
              {user?.address && 
              <li className=" grid grid-cols-6">
                <i>
                  <FaHome className=" text-[1.5em] text-blue-600" />
                </i>
                <p className="col-span-5 break-words">
                  {`${user?.address?.chowk}, ${user?.address?.muncipility}-${user?.address?.ward}, ${user?.address?.district}`}
                  
                </p>
              </li>
                }
              {
                user?.phone_number &&
              <li className=" grid grid-cols-6">
                <i>
                  <FaPhoneAlt className=" text-[1.5em] text-blue-600" />
                </i>
                <p className="col-span-5 break-words"> {user?.phone_number}</p>
              </li>
              }
              {
                user?.email &&
              <li className="grid grid-cols-6">
                <i>
                  <FaEnvelope className=" text-[1.5em] text-blue-600" />
                </i>
                <p className="break-words col-span-5">
                {user?.email}
                </p>
              </li>

              }
              <li>
                <button className="bg-blue-600 p-2  text-white w-full"
                onClick={()=>{
                  navigate('create', {state:{
                    path:location.pathname
                  }});
                }}
                >
                  Edit Profile
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-1 flex flex-col p-4   box-border gap-4 " >
          <div className=" mt-20 ">
            <h2 className=" text-indigo-600  font-semibold text-3xl">
              {user?.name.toUpperCase()}
            </h2>
           
          </div>
          {
            user?.bio &&
          <div>
            <p className="p-1">
            {user?.bio}
            </p>
          </div>
          }
          {/* <div>
            <h2 className="bg-gray-400 p-3">Services Offers</h2>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Profile;
