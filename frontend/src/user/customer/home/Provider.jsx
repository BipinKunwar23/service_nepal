import React from "react";

import { FaStar } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import { setServiceId } from "../../../redux/cardSlice";
import ImageSlider from "./ImageSlider";
const Provider = ({services}) => {
  const serviceId = useSelector((state) => state.cardSlice.serviceId);

  console.log("cards", serviceId);
const navigate= useNavigate();


    return (
      <section >
     
            <section className="grid grid-cols-2   ">
              {services.map((service) => (
                <div
                  key={service?.id}
                  className=" p-3 shadow shadow-gray-800 grid grid-cols-2  cursor-pointer text-center m-5  border-gray-600 rounded-lg box-border"
                  onClick={()=>{
                    navigate(`service/${service.id}`);
                  }}
                >
                  <div>
                   <ImageSlider images={service?.images}/>
                  
                  </div>
                  <div className="mr-2">
                    <p className="justify-between flex mb-2">
                      <span className="text-sm font-bold">Gaindakot</span>
                      <span className="text-gray-500 text-md">$ 200 USD</span>
                    </p>
                    <p className="text-sm  text-gray-600 mb-2">
                      <span>10:00 AM - 5:00 PM</span>
                    </p>
                    <p className="text-center mb-2">
                      <span className=" text-gray-600 text-sm">
                        SUN MON TUE WED FRI SAT
                      </span>
                    </p>
                    <h2 className=" text-gray-700 font-semibold text-lg mb-2">
                      {service?.name}
                    </h2>
                    <p className="text-center mb-2">
                      <a href="" className="underline text-gray-600">see more</a>
                    </p>
                    <div className="flex flex-col gap-4 ">
                  <div className=" flex place-content-center">
                    {Array(4)
                      .fill()
                      .map((_, index) => (
                        <i key={index} className=" ">
                          <FaStar className=" text-[#FA130C] text-[1.4em]" />
                        </i>
                      ))}
                  </div>
                </div>
                    
                  </div>

               
                </div>
              ))}
            </section>
        <section>
          <div className=" flex gap-10 bg-white p-8 mx-10 shadow shadow-gray-200 mt-1 box-border">
            <div className=" flex-1 border border-gray-300 p-6 ">
              <form action="" className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="text-[1.2em] font-semibold">
                    Feedback
                  </label>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="4"
                    className="border-2 border-gray-300"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="bg-orange-600 text-white p-2 w-full"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
            <div className="flex-1 grid bg-white place-content-center ">
              <div className="flex flex-col gap-10">
                <h2 className="text-center text-[1.5em] font-semibold text-orange-600">
                  Rate Service Provider
                </h2>
                <div className=" flex justify-center gap-2 ">
                  {Array(4)
                    .fill()
                    .map((_, index) => (
                      <i key={index} className=" ">
                        <FaStar
                          className=" text-[rgba(0,0,0,0.6)] hover:cursor-pointer text-[2em]"
                          onClick={() => {}}
                        />
                      </i>
                    ))}
                </div>
                <div>
                  <button
                    type="submit "
                    className="bg-green-600 text-white p-2 w-full"
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    );
  
};

export default Provider;
