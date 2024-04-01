import React, { useState } from "react";
import logo from "../../images/logo.png";
import { FaEdit, FaEnvelope, FaLocationArrow } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { useViewProfileQuery } from "../../api/profileApi";
import BuyerProfile from "./../../views/buyer/profile/buyerProfile";
import { MdModeEdit } from "react-icons/md";
import SellerService from "../../views/seller/serviceManagement/serviceInformation/sellerService";
function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = localStorage.getItem("userId");
  const {
    data: user = {},
    isLoading,
    isError,
    error,
  } = useViewProfileQuery(userId);
  console.log("users", user);
  const [address, editAddress] = useState(false);
  const [description, setDescription] = useState(false);
  const [education, setEducation] = useState(false);
  const [skills, setSkills] = useState(false);

  const [certificate, setCertificate] = useState(false);
  const role = localStorage.getItem("role");

  if (isLoading) {
    return <div className="min-h-screen">loading profile</div>;
  }

  return (
    <section className="">
      <div className="p-6">
        <button
          className="text-green-600 font-semibold text-2xl"
          onClick={() => {
            navigate(`/user/${localStorage.getItem("name")}/seller/dashboard`, {
              replace: true,
            });
          }}
        >
          ProHome Nepal
        </button>
      </div>
      <div className="bg-slate-100 p-20 ">
        <div className="flex gap-10 p-1  mx-auto ">
          <div className="flex  w-[30Vw] flex-col gap-4 ">
            <div className=" bg-white pt-8 pb-2 shadow shadow-gray-400">
              <div className="  flex place-content-center   ">
                <img
                  className="w-[170px] h-[170px]  rounded-full"
                  src={
                    user?.profile?.photo
                      ? `http://localhost:8000/${user.profile?.photo}`
                      : logo
                  }
                  alt=""
                />
              </div>
              <div className="mt-3">
                <div className="flex gap-4 justify-center place-items-center">
                <h2 className="text-center font-semibold text-xl ">
                  Bipin Kunwar
                </h2>
                <button>
                <i>
                    <MdModeEdit />
                  </i>

                </button>
                </div>
                <h2 className="text-center text-gray-500 mt-2 ">
                  @{user?.profile?.name}
                </h2>
              </div>
              <div className="border-t-2 mt-5 p-3 space-y-5">

              <div className="flex justify-between  text-slate-500">
                <p className="flex gap-2">
                  <i>
                    <IoLocationSharp className=" text-[1.3em] " />
                  </i>
                  <span htmlFor="" className="">
                    Location
                  </span>
                </p>
                <div className="flex gap-2">

                {user?.profile?.address ? (
                  <p className="text-gray-700 font-semibold ">
                    {user?.profile?.address}
                  </p>
                ) : (
                  <p className="text-gray-700 font-semibold  ">Add Your Address</p>
                )}
                <button
                  className="text-gray-700 "
                  type="button"
                  onClick={() => {
                    editAddress(true);
                  }}
                >
                  <i>
                    <MdModeEdit />
                  </i>
                </button>
                </div>

              </div>
              <div className="flex justify-between   text-slate-500">
                <p className="flex gap-3">
                  <i>
                    <FaPhoneAlt className=" text-[0.9em] " />
                  </i>
                  <span htmlFor="" className="">
                    Phone Number
                  </span>
                </p>
                <div className="flex gap-2">

                {user?.profile?.phone_number ? (
                  <p className="text-gray-700 font-semibold ">
                    {user?.profile?.phone_number}
                  </p>
                ) : (
                  <p className="text-gray-700 font-semibold  ">Add Your Phone Number</p>
                )}
                <button
                  className="text-gray-700 "
                  type="button"
                  onClick={() => {
                    editAddress(true);
                  }}
                >
                  <i>
                    <MdModeEdit />
                  </i>
                </button>
                </div>

              </div>
              </div>



              <div className=" grid grid-cols-1 p-2">
                <ul className="flex flex-col gap-6">
                  {address && (
                    <form action="">
                      <div className="">
                       
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

            <div className="flex  w-[30Vw] flex-col gap-4 bg-white  shadow mb-5 p-4">
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
    </section>
  );
}

export default Profile;
