import React from "react";
import seller from "../../../../images/become-seller.jpg";
import { ImProfile } from "react-icons/im";
import { FcServiceMark } from "react-icons/fc";
import personal from "../../../../images/progress.png";
import skill from "../../../../images/requirements.png";
import packages from "../../../../images/boxes.png";
import { useNavigate } from 'react-router-dom';

const SetupSeller = () => {
  const navigate=useNavigate()
  return (
    <section className="w-[80Vw] mx-auto my-5 grid grid-cols-2 gap-8 shadow shadow-gray-500 p-3">
      <div>
        <img src={seller} alt="" />
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-[1.5em] text-white bg-green-600 p-2">
          How to sell service on <i>Techinan</i>
        </h2>
          <div className="flex gap-5 p-1">
            <img src={personal} alt="" className="w-[40px] h-[40px] " />
            <div>
              <h2 className="text-lg text-slate-700 font-semibold">
                Create you profile
              </h2>
              <p className="mt-1 text-slate-600 ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
                animi esse neque vero voluptatum ipsa quisquam ea quia
                cupiditate
              </p>
            </div>
        </div>
          <div className="flex gap-5 p-1 ">
            <img src={skill} alt="" className="w-[40px] h-[40px] " />
            <div>
              <h2 className="text-lg text-slate-700 font-semibold">
                Add your services
              </h2>
              <p className="mt-1 text-slate-600 ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
                animi esse neque vero voluptatum ipsa quisquam ea quia
                cupiditate
              </p>
            </div>
        </div>
          <div className="flex gap-5 p-1">
            <img src={packages} alt="" className="w-[40px] h-[40px] " />
            <div>
              <h2 className="text-lg text-slate-700 font-semibold">
               Add packeges
              </h2>
              <p className="mt-1 text-slate-600 ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
                animi esse neque vero voluptatum ipsa quisquam ea quia
                cupiditate
              </p>
            </div>
        </div>
        <div className=" grid place-content-center">
          <button className="bg-blue-600 p-2 rounded-md text-white text-[1.2em] w-[300px]"
          onClick={()=>{
            navigate("setup")
          }}
          >
            Continue
          </button>
        </div>
      </div>{" "}
    </section>
  );
};

export default SetupSeller;
