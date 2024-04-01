import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { createReview } from "../../../redux/buyerSlice";

const Rating = ({ rating }) => {
  const { serviceId } = useParams();
  const dispatch=useDispatch()
  const location=useLocation();

  return (
    <section className="space-y-8 ">
      <div className="text-center space-y-4">
        <h2 className="text-gray-600 text-lg font-semibold">Overall Rating</h2>
        <p className="text-center">
          <span className="text-6xl font-semibold">{rating}</span>
        </p>
        <div className="flex justify-center gap-4 ">
          {[1, 2, 3, 4, 5].map((star) => (
            <i key={star} className=" ">
              <FaStar
                className={`  hover:cursor-pointer text-[1.5em] ${
                  star <= rating? "text-orange-500" : "text-gray-400"
                }`}
               
              />
            </i>
          ))}
        </div>
        <p className="text-gray-500  font-semibold ">Based on 20 reviews</p>
       
      </div>

      <div className=" flex flex-col gap-6  ">
        <div className=" flex space-x-2">
          <h2 className="w-20">Excellent</h2>
          <div className="review-bar">
            <div className="w-1/2 "></div>
          </div>
        </div>
        <div className=" flex space-x-2">
          <h2 className="w-20">Good</h2>
          <div className="review-bar">
            <div className="w-2/3"></div>
          </div>
        </div>
        <div className=" flex space-x-2">
          <h2 className="w-20">Average</h2>
          <div className="review-bar">
            <div className="w-1/3"></div>
          </div>
        </div>
        <div className=" flex space-x-2">
          <h2 className="w-20">Poor</h2>
          <div className="review-bar">
            <div className="w-2/5"></div>
          </div>
        </div>
      </div>
      <div className="py-6">
          <button
            
            className="bg-green-600 text-white p-2 w-full text-lg px-5 rounded bottom-full mt-7"
            onClick={()=>{
              dispatch(createReview(true))
            }}
          >
            write a review
          </button>
        </div>
    </section>
  );
};

export default Rating;
