import React from 'react'
import plumber from "../../../images/plumber.jpg";
import { FaEnvelope } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
const Profile = ({data}) => {
  return (
<section className="flex  flex-col gap-5 py-3 bg-gray-800     ">
            <div className=" flex place-content-center">
              <img
                src={plumber}
                className="h-[200px] w-[200px] object-cover rounded-full shadow shadow-gray-600"
                alt=""
              />
            </div>
            <div className="flex flex-col gap-4 mt-5">
                  <div className=" flex place-content-center">
                    {Array(data?.rating)
                      .fill()
                      .map((_, index) => (
                        <i key={index} className=" ">
                          <FaStar className=" text-[#FA130C] text-[1.4em]" />
                        </i>
                      ))}
                  </div>
                </div>
            <div className="flex flex-col ">
              <div className="grid place-content-center  ">
                <ul className=" text-center grid gap-4  text-white">
                  <li className=" ">
                    {" "}
                    <ul className=" flex gap-2 place-content-center">
                      <li className=" grid place-content-center">
                        <i>
                          <FaUser className=" text-blue-600 text-[1.5em]" />
                        </i>
                      </li>
                      <li className=" text-lg ">{data?.name}</li>
                    </ul>
                  </li>

                  <li>
                    <ul className=" flex gap-2 place-content-center">
                      <li className=" grid place-content-center">
                        <i>
                          <FaHome className=" text-blue-600 text-[1.3em]" />
                        </i>
                      </li>
                      <li className=" ">{`${data?.profile?.address?.chowk}, ${data?.profile?.address?.muncipility}-${data?.profile?.address?.ward}, ${data?.profile?.address?.district}`}</li>
                    </ul>
                  </li>

                  <li className="">
                    <ul className=" flex flex-col gap-3">
                      <li className=" ">
                        {" "}
                        <ul className=" flex gap-2 place-content-center">
                          <li className=" grid place-content-center">
                            <i>
                              <FaEnvelope className=" text-blue-600 text-[1em]" />
                            </i>
                          </li>
                          <li className=" italic text-[0.9em]">{data.email}</li>
                        </ul>
                      </li>
                      <li className=" ">
                        <ul className=" flex gap-2 place-content-center">
                          <li className=" grid place-content-center">
                            <i>
                              <FaPhoneAlt className=" text-blue-600 text-[1em]" />
                            </i>
                          </li>
                          <li className="text-[0.9em]">
                            {data?.profile?.phone_number}
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              
              </div>
              <div className=" flex justify-center mt-4">
                <button className=" text-white font-bold underline">
                  View More
                </button>
              </div>
            </div>
            <div className="p-4 text-white bg-gray-900 flex flex-col gap-5 ">
              <div className="flex flex-col gap-5">
                <label htmlFor="">Description</label>
                <textarea
                  name=""
                  id=""
                  rows="3"
                  className="border-2 border-gray-400 rounded-md"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white w-full p-2 rounded-lg"
                >
                  Send Message
                </button>
              </div>
            </div>
          </section>
  )
}

export default Profile