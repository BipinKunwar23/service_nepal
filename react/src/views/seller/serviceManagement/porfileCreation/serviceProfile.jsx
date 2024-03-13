import React, { useState } from "react";
import PersonalInfo from "./personalInfo";
import Availability from "./availability";
import SecurityInfo from "./securityInfo";
import Qualification from "./qualification";
import Preview from "./preview";

import { useViewProfileQuery } from "../../../../api/seller/profileApi";
import Loader from "../../../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setProfileStep } from "../../../../redux/sellerSlice";

const ServiceProfile = () => {
  const { data: users, isLoading } = useViewProfileQuery();
  const step = useSelector((state) => state.sellerSlice.profileSteps);
  const dispatch = useDispatch();

  console.log("user", users);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="p-6">
        <h2 className="text-green-600 font-semibold text-3xl">Technician</h2>
      </div>
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
                // disabled={!(users && users?.personal)}
                onClick={() => {
                  dispatch(setProfileStep("personal"));
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
                  dispatch(setProfileStep("profession"));
                }}
                disabled={!(users && users?.personal)}
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
                  dispatch(setProfileStep("availability"));
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
                  step === "preview" && "text-gray-800"
                }`}
                disabled={!(users && users?.availability)}
                onClick={() => {
                  dispatch(setProfileStep("preview"));
                }}
              >
             Preview
              </button>
            </div>
           
          </div>
          {step === "profession" ? (
            <Qualification profession={users?.profession} />
          ) : step === "availability" ? (
            <Availability availability={users?.availability}  cities={users?.cities} />
          )  : step==="preview" ?<Preview profile={users}/> :

          (
            <PersonalInfo personal={users?.personal} />
          )
          
          }
        </section>
      </section>
    </>
  );
};

export default ServiceProfile;
