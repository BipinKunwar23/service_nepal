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
import Faq from "./faq";

const ServiceProfile = () => {
  const { data: user, isLoading } = useViewProfileQuery();
  const step = useSelector((state) => state.sellerSlice.profileSteps);
  console.log('step',step);
  const dispatch = useDispatch();
  console.log("user", user);
  if (isLoading) {
    return <Loader />;
  }

  const HandelPage = ({user,step}) => {
    switch (step) {
      case 1:
        return <PersonalInfo personal={user?.profile} />;

        break;
      case 2:
        return <Qualification profession={user?.profession} />;
        break;
      case 3:
        return (
          <Availability
            availability={user?.availability}
            cities={user?.locations}
          />
        );
        break;
      case 4:
        return <Faq faqs={user?.faqs} />;
      case 5:
        return <Preview user={user} />;
        break;

      default:
        break;
    }
  };


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
                  step === "2" && "text-gray-800"
                } `}
                // disabled={!(user && user?.personal)}
                onClick={() => {
                  dispatch(setProfileStep(1));
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
                  dispatch(setProfileStep(2));
                }}
                disabled={!(user && user?.profile)}
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
                disabled={!(user && user?.profession)}
                onClick={() => {
                  dispatch(setProfileStep(3));
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
                  step === "faq" && "text-gray-800"
                }`}
                disabled={!(user && user?.availability)}
                onClick={() => {
                  dispatch(setProfileStep(4));
                }}
              >
                FAQS
              </button>
            </div>
            <div className="flex gap-2">
              <span className="bg-green-400 border rounded-full h-[30px] w-[30px] block text-center text-lg text-white ">
                5
              </span>

              <button
                className={` text-lg font-semibold  ${
                  step === "preview" && "text-gray-800"
                }`}
                disabled={!(user && user?.faqs)}
                onClick={() => {
                  dispatch(setProfileStep(5));
                }}
              >
                Preview
              </button>
            </div>
          </div>

         {
          <HandelPage user={user} step={step}/>
         }
        </section>
      </section>
    </>
  );
};

export default ServiceProfile;
