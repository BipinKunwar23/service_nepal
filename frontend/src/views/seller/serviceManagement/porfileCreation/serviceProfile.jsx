import React, { useState } from "react";
import PersonalInfo from './personalInfo';
import Availability from "./Availability";
import SecurityInfo from "./securityInfo";
import Qualification from './qualification';

import { useViewProfileQuery } from "../../../../api/profileApi";
import Loader from "../../../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setProfileStep } from "../../../../redux/sellerSlice";

const ServiceProfile = () => {
  const {data:users,isLoading}=useViewProfileQuery()
  const step=useSelector((state)=>state.sellerSlice.profileSteps)
  const dispatch=useDispatch()
  

  console.log(users);
  if(isLoading){
    return <Loader/>
  }
  return (
    <section className=" py-4 px-10 mx-auto bg-gray-100">
      <section className="w-[80Vw] mx-auto">
        <div className="flex justify-between mb-9 text-gray-300">
          <div className="flex gap-2">
            <span className="bg-green-400 border rounded-full h-[30px] w-[30px] block text-center text-lg text-white ">
              {" "}
              1
            </span>
            <button
              className={`  text-lg font-semibold  ${
                step === "personal" && "text-gray-800"
              } `}
              disabled={!(users && users?.profile)}
              onClick={() => {
                dispatch(setProfileStep("personal"))
              }}
            >
              Personal Info
            </button>
          </div>
          <div className="flex gap-2">
            <span className="bg-green-400 border rounded-full h-[30px] w-[30px] block text-center text-lg text-white ">
              2
            </span>
            <button
              onClick={() => {
                dispatch(setProfileStep("profession"))

  
              }}
              disabled={!(users && users?.profile)}


              className={` text-lg font-semibold  ${
                step === "profession" && "text-gray-800"
              } `}
            >
              Professional Info
            </button>
          </div>
          <div className="flex gap-2">
            <span className="bg-green-400 border rounded-full h-[30px] w-[30px] block text-center text-lg text-white ">
              3
            </span>

            <button
              className={` text-lg font-semibold  ${
                step === "availability" && "text-gray-800"
              }`}
              disabled={!(users && users?.profession)}


              onClick={() => {
                dispatch(setProfileStep("availability"))

              }}
            >
              Availability Info
            </button>
          </div>
          <div className="flex gap-2">
            <span className="bg-green-400 border rounded-full h-[30px] w-[30px] block text-center text-lg text-white ">
              4
            </span>

            <button
              className={` text-lg font-semibold  ${
                step === "security" && "text-gray-800"
              }`}
              onClick={() => {
                dispatch(setProfileStep("security"))

              }}
              disabled={!(users && users?.availability)}


            >
              Security Info
            </button>
          </div>
        </div>
        {step === "profession" ? (
          <Qualification />
        ) : step === "availability" ? (
          <Availability />
        ) : step === "security" ? <SecurityInfo/> : (
          <PersonalInfo />
        )}
      </section>
    </section>
  );
};

export default ServiceProfile;
