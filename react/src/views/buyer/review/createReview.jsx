import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useReviewServiceMutation } from "../../../api/buyer/feedbackApi";

import { FaStar } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const createReview = () => {
  const [reviewService, { isLoading }] = useReviewServiceMutation();

  const { register, control, handleSubmit } = useForm();

  const [ratingStar, setRatingStars] = useState(0);
  const {serviceId}=useParams()
  const location=useLocation()
  const navigate=useNavigate()


 
  const handleReview = async (values) => {
    await reviewService({ review: values.review,rating:ratingStar, serviceId })
      .unwrap()
      .then((response) => {
        console.log("response", response);
        if(response){
navigate(location?.state?.path,{replace:true})
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <section className="p-5 justify-center grid">
      <div className="w-[40Vw] border p-10 shadow  bg-white ">
        <h2 className="font-semibold text-gray-700 text-xl mb-6">Review and Rating</h2>
        <form
          action=""
          className="space-y-4"
          onSubmit={handleSubmit(handleReview)}
        >
          <div className="space-y-8 border p-8">
            <p className="text-slate-600 text-[2em]  text-center ">
              How was your experience?
            </p>
            <div className="flex  gap-6 justify-center ">
              {[1, 2, 3, 4, 5].map((star) => (
                <i key={star} className=" ">
                  <FaStar
                   className={`  cursor-pointer text-[2em] ${
                    star <= ratingStar ? "text-orange-500" : "text-gray-400"
                  }`}
                    onClick={() => {
                        setRatingStars(star)
                    }}
                  />
                </i>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <textarea
              name=""
              id=""
              cols="30"
              rows="6"
              className="border rounded-sm p-2 focus:outline-none placeholder:text-lg text-lg placeholder:text-gray-500"
              {...register("review")}
              placeholder="Write your review "
            ></textarea>
          </div>
          <div className="">
            <button
              type="submit "
              className="bg-green-600 text-xl text-white p-2 w-full"
            >
              Publish Review
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default createReview;
