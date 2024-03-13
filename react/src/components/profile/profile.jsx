import React, { useState } from "react";
import logo from "../../images/logo.png";
import { FaEnvelope } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useViewProfileQuery } from "../../api/profileApi";
import BuyerProfile from './../../views/buyer/profile/buyerProfile';
import SellerService from "../../views/seller/serviceManagement/serviceInformation/sellerService";
function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = localStorage.getItem("userId");
  const { data: user, isLoading, isError, error } = useViewProfileQuery(userId);
  console.log(user);
  const [address, editAddress] = useState(false);
  const [description, setDescription] = useState(false);
  const [education, setEducation] = useState(false);
  const [skills, setSkills] = useState(false);

  const [certificate, setCertificate] = useState(false);
  const role = localStorage.getItem("role");


  if (isLoading) {
    return <div>loading profile</div>;
  }

  return (
    <>
      <div className="p-6">
        <button className="text-green-600 font-semibold text-3xl"
        onClick={()=>{
          navigate(`/user/${localStorage.getItem('name')}/seller/dashboard`,{replace:true})
        }}
        >Technician</button>
      </div>
    <div className="bg-slate-100 p-4 text-[1.2em]">
      <div className="flex gap-20 w-[80Vw] p-1  mx-auto ">
        <div className="flex  w-[30Vw] flex-col gap-4">
          <div className=" bg-white pt-8 pb-2 shadow shadow-gray-400">
            <div className="  flex place-content-center   ">
              <img
                className="w-[200px] h-[200px] border-2 border-[rgba(0,0,0,.3)] rounded-full"
                src={user?.photo ? `http://localhost:8000/${user.photo}` : logo}
                alt=""
              />
            </div>
            <div>
              <h2 className="text-center font-semibold text-2xl text-slate-700">
                Bipin Kunwar
              </h2>
            </div>
            <div className=" grid grid-cols-1 p-5">
              <ul className="flex flex-col gap-6">
                {user?.address && (
                  <li className=" grid grid-cols-6">
                    <i>
                      <FaHome className=" text-[1.5em] text-blue-600" />
                    </i>
                    <p className="col-span-5 break-words"></p>
                  </li>
                )}
                {!user?.address && (
                  <form action="">
                    <div className="">
                      <div className="flex justify-between p-4">
                        <label htmlFor="" className="font-bold">
                          Address
                        </label>
                        {!address && (
                          <button
                            className="text-blue-600 "
                            type="button"
                            onClick={() => {
                              editAddress(true);
                            }}
                          >
                            Edit Address
                          </button>
                        )}
                      </div>
                      {address && (
                        <div className="flex flex-col gap-5 bg-gray-200 p-4">
                          <input
                            type="text"
                            className="bg-white p-2 border "
                            placeholder="Your address here"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              className="bg-white p-2 w-full shadow"
                              type="button"
                              onClick={() => {
                                editAddress(false);
                              }}
                            >
                              Cancel
                            </button>
                            <button
                              className="bg-green-600 text-white p-2 w-full shadow"
                              type="submit"
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      )}
                      {!address && (
                        <p className="text-slate-500  p-4">Add Your Address</p>
                      )}
                    </div>
                  </form>
                )}
                {user?.address && (
                  <li className=" grid grid-cols-6">
                    <i>
                      <FaHome className=" text-[1.5em] text-blue-600" />
                    </i>
                    <p className="col-span-5 break-words"></p>
                  </li>
                )}
                {user?.phone_number && (
                  <li className=" grid grid-cols-6">
                    <i>
                      <FaPhoneAlt className=" text-[1.5em] text-blue-600" />
                    </i>
                    <p className="col-span-5 break-words">
                      {" "}
                      {user?.phone_number}
                    </p>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="flex  w-[30Vw] flex-col gap-4 bg-white  mb-5 p-4">
            <form action="" className="">
              <div>
                <div className="flex justify-between">
                  <label htmlFor="" className="p-4 font-semibold text-lg ">
                    Description
                  </label>
                  {!description && (
                    <button
                      className="text-blue-600 "
                      type="button"
                      onClick={() => {
                        setDescription(true);
                      }}
                    >
                      Edit Description
                    </button>
                  )}
                </div>
                {!description && (
                  <p className="text-slate-500  p-4">
                    Add Your hobbies, profession, instrests
                  </p>
                )}
              </div>

              {description && (
                <div className="flex flex-col gap-5 bg-gray-200 p-4 mt-3">
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="8"
                    className="p-2 placeholder:text-[1.1em] placeholder:text-slate-400"
                    placeholder="Add you hobby,Intrests and your profession so that buyer can know you more"
                  ></textarea>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      className="bg-white p-2 w-full shadow"
                      type="button"
                      onClick={() => {
                        setDescription(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-green-600 p-2 w-full shadow text-white"
                      type="submit"
                    >
                      Update
                    </button>
                  </div>
                </div>
              )}

              <div className="border-b-2 mt-12 border-gray-300"></div>
            </form>
            <form action="" className="">
              <div>
                <div className="flex justify-between">
                  <label htmlFor="" className="p-4 font-semibold text-lg ">
                    Education
                  </label>
                  {!description && (
                    <button
                      className="text-blue-600 "
                      type="button"
                      onClick={() => {
                        setDescription(true);
                      }}
                    >
                      Edit Description
                    </button>
                  )}
                </div>
                {!description && (
                  <p className="text-slate-500  p-4">
                    Add Your hobbies, profession, instrests
                  </p>
                )}
              </div>

              {description && (
                <div className="flex flex-col gap-5 bg-gray-200 p-4 mt-3">
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="8"
                    className="p-2 placeholder:text-[1.1em] placeholder:text-slate-400"
                    placeholder="Add you hobby,Intrests and your profession so that buyer can know you more"
                  ></textarea>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      className="bg-white p-2 w-full shadow"
                      type="button"
                      onClick={() => {
                        setDescription(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-green-600 p-2 w-full shadow text-white"
                      type="submit"
                    >
                      Update
                    </button>
                  </div>
                </div>
              )}

              <div className="border-b-2 mt-4 border-gray-300"></div>
            </form>
          </div>
        </div>
        {role !== "seller" ? <BuyerProfile /> : <SellerService />}
      </div>
    </div>
    </>

  );
}

export default Profile;
