import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

import { NavLink, useParams } from "react-router-dom";

const feedback = ({feedbacks}) => {
  console.log('feedbacks',feedbacks);
  const {serviceId}=useParams()

  // const handleRatingChnage = (newRating) => {
  //   setServiceProviderRating(newRating);
  //   console.log(newRating);
  // };

  return (
    <>
      <section className="  space-y-6  w-full h-[75Vh] overflow-y-auto bg-white  col-span-2">
        {feedbacks?.map((feedback) => {
          return (
            <div className="space-y-4 px-8 box-border " key={feedback?.id}>
              <div className="flex gap-6 ">
                <img
                  src={`http://localhost:8000/${feedback?.users?.profile?.photo}`}
                  className="w-[60px]  h-[60px]  object-cover rounded-full"
                  alt=""
                />
                <div className="space-y-2">
                  <h2 className=" text-[1.2em] font-bold">
                    {feedback?.users?.name}
                  </h2>
                  <div className="flex gap-2 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i key={star} className=" ">
                      <FaStar
                        className={`  hover:cursor-pointer text-[1.2em] ${
                          star <= feedback?.stars
                            ? "text-orange-600"
                            : "text-gray-400"
                        }`}
                      />
                    </i>
                  ))}
                <span className="ml-4">{feedback?.stars}.0</span>
                </div>
                </div>
              </div>
              <div className="">
              
                <p>{feedback.review}</p>
              </div>
            </div>
          );
        })}
       
      </section>
    </>
  );
};

export default feedback;
