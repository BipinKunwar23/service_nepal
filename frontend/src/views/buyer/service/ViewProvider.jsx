import React, { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useGetProviderDetailsQuery } from "../../../Api/providerApi";
import Provider from "../../../user/customer/home/Provider";
import Profile from "../../../user/customer/home/profile";
import Loader from "../../../components/Loader";
import { useMatch } from "react-router-dom";
import Service from "../../../user/customer/home/Service";
import { IoIosStar } from "react-icons/io";
import {
  useRateServiceProviderMutation,
  useReviewServiceProviderMutation,
  useGetProviderFeedbacksQuery,
} from "../../../Api/providerApi";
import { useForm } from "react-hook-form";
const Rating = () => {
  const [rating, setRating] = useState(0);
  const { providerId } = useParams();
  const customerId = localStorage.getItem("userId");
  const [rateProvider, { isLoading: israting }] =
    useRateServiceProviderMutation();
  const onChangeRating = async (star) => {
    setRating(star);

    await rateProvider({ rating: star, customerId, providerId })
      .unwrap()
      .then((response) => {
        console.log("response", response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <i key={star} className=" ">
          <IoIosStar
            className={`  hover:cursor-pointer text-[2.2em] ${
              star <= rating ? "text-orange-600" : "text-gray-400"
            }`}
            onClick={() => {
              onChangeRating(star);
            }}
          />
        </i>
      ))}
    </div>
  );
};

const ViewProvider = () => {
  const { providerId, categoryId } = useParams();
  const { data, isLoading, isSuccess } = useGetProviderDetailsQuery({
    providerId,
    categoryId,
  });
  const [reviewProvider, { isLoading: isReview }] =
    useReviewServiceProviderMutation();
  console.log("data", data);
  const service = useMatch(
    "/provider/:providerId/category/:categoryId/service/:serviceId"
  );
  const order = useMatch(
    "/provider/:providerId/category/:categoryId/service/:serviceId/order"
  );
  const [serviceProviderRating, setServiceProviderRating] = useState(0);
  const handleRatingChnage = (newRating) => {
    setServiceProviderRating(newRating);
    console.log(newRating);
  };

  const { isLoading: isFeedback, data: data_feedback } =
    useGetProviderFeedbacksQuery({providerId,categoryId});
  const customerId = localStorage.getItem("userId");
  const { register, control, handleSubmit } = useForm();
  const handleReview = async (values) => {
    await reviewProvider({ review: values.review, customerId, providerId })
      .unwrap()
      .then((response) => {
        console.log("response", response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (isLoading || isReview || isFeedback) {
    return <Loader />;
  }
  return (
    <>
      <section className="   box-border text-[1em]  w-[90Vw] mx-auto rounded-lg p-10 bg-white ">
        <section className="">
          <Profile
            data={{
              id:data?.id,
              name: data?.name,
              email: data?.email,
              profile: data?.profile,
              profession: data?.category?.detail?.profession,
              description: data?.category?.detail?.description,
              rating:data_feedback?.overall_stars
            }}
          />
        </section>

        <section className="grid grid-cols-3">
          <section className="   box-border text-[1em]  ">
            <Provider data={data?.category} />
          </section>
          <section className="col-span-2 ">
            <Service data={data?.category?.services} />
          </section>
        </section>

        <section className="  p-5 flex gap-8 border border-gray-300 mt-3">
          <div className="w-[27Vw]">
            <div className="grid place-items-center">
              <h2 className="text-[1.2em] font-bold text-slate-600 mb-2">
                How was the service?{" "}
              </h2>
              <Rating
                initialRating={serviceProviderRating}
                onChangeRating={handleRatingChnage}
              />
            </div>
            <div className=" flex  gap-5 mb-8 "></div>
            <div className="   shadow shadow-gray-200 mt-1 box-border">
              <div className="  mx-auto mb-3 ">
                <form
                  action=""
                  className="flex flex-col gap-4"
                  onSubmit={handleSubmit(handleReview)}
                >
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor=""
                      className="text-slate-600 text-[1.2em] font-semibold mb-2"
                    >
                      Give your review
                    </label>
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      className="border border-gray-400 rounded-lg p-2 focus:outline-none"
                      {...register("review")}
                    ></textarea>
                  </div>
                  <div className="">
                    <button
                      type="submit "
                      className="bg-green-600 text-white p-2 w-full"
                    >
                      PUBLISH REVIEW
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-[1.2em] font-bold text-slate-600 mb-2">
              Public Review
            </h2>
            <div className="flex flex-col gap-4">
              {data_feedback?.feedbacks.map((feedback) => {
                return (
                  <div className="grid grid-cols-4 p-2 border border-gray-400 rounded-lg">
                    <div className="flex gap-4 ">
                      <img
                        src={`http://localhost:8000/${feedback?.customers?.profile?.photo}`} 
                        className="w-[90px]  h-[90px]  object-cover rounded-full"
                        alt=""
                      />
                      <div className="grid place-content-center">
                      <h2 className=" text-[1.2em] font-bold">{feedback?.customers?.name}</h2>

                      </div>
                    </div>
                    <div className="col-span-3">
                      <div className="flex gap-2 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <i key={star} className=" ">
                            <IoIosStar
                              className={`  hover:cursor-pointer text-[1.8em] ${
                                star <= feedback?.rating
                                  ? "text-orange-600"
                                  : "text-gray-400"
                              }`}
                        
                            />
                          </i>
                        ))}
                      </div>
                      <p>{feedback.review}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default ViewProvider;
