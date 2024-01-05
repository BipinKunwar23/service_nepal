import React from "react";
import plumber from "../../../images/plumber.jpg";
import { FaEnvelope } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
const Profile = ({ data }) => {
  return (
    <section className="grid grid-cols-5 gap-5 border border-gray-300 p-4  ">
      <div className=" flex place-content-center">
        <img
          src={plumber}
          className="h-[200px] w-[200px] object-cover rounded-lg shadow shadow-gray-600"
          alt=""
        />
      </div>

      <div className="flex flex-col col-span-2 p-2">
     
        <div className="  ">
          <h2 className="text-gray-700 font-bold text-lg">
            <span>{data?.name} </span> <span>({data?.profession})</span>
          </h2>
          <div className="flex flex-col  gap-4 my-5">
          <div className="">
            {Array(data?.rating)
              .fill()
              .map((_, index) => (
                <i key={index} className=" ">
                  <FaStar className=" text-[#FA130C] text-[1.4em]" />
                </i>
              ))}
          </div>
        </div>
          <div>
            <ul className="flex flex-col gap-3">
              <li className="flex gap-5">
                <strong className="block w-[18%]">Email</strong>
                <p className="  text-blue-600 font-semibold">: {data.email}</p>
              </li>
             
              <li className="flex gap-5">
                <strong className="block w-[18%]">Contact No</strong>
                <p className="text-blue-600 font-semibold">: {data?.profile?.phone_number}</p>
              </li>
              <li className="flex gap-5 ">
                <strong className="block w-[18%]">Address</strong>
                <p className="text-blue-600 font-semibold">
                  : {`${data?.profile?.address?.chowk}, ${data?.profile?.address?.muncipility}-${data?.profile?.address?.ward}, ${data?.profile?.address?.district}`}
                </p>
              </li>
            </ul>
            <div>
              <button className="bg-red-700 p-2 rounded-md text-white mt-3">View Bio</button>
            </div>
          </div>

       
        </div>
      </div>
      <div className="p-4 text-white col-span-2 bg-gray-900 flex flex-col gap-5 ">
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
  );
};

export default Profile;
