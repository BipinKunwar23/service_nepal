import React from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProviderId } from "../../redux/buyerSlice";
import { IoIosStar } from "react-icons/io";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { FaStar } from "react-icons/fa";

function ServiceCard({ cards = [], url, children }) {
  console.log("cards", cards);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div>
      <section className="  grid grid-cols-2 grid-flow-row gap-10 ">
        {cards &&
          cards?.map((card) => {
            console.log("service card", card?.service?.type);
            return (
              <div
                key={card.id}
                className="     hover:cursor-pointer  box-border   grid grid-cols-2 gap-4 p-3 shadow-sm rounded-xl "
                onClick={() => {
                  dispatch(setProviderId(card?.id));
                  navigate(`${url}/${card?.id}`);
                }}
              >
                  <div className="relative">
                    <img
                      src={`http://localhost:8000/${card?.description?.image}`}
                      className=" h-[180px] w-full object-cover object-right-top rounded-lg  border border-gray-300 "
                    />

                    <i className="absolute top-0 right-0 m-2 text-3xl  ">
                      {card?.lists?.length > 0 ? (
                        <MdFavorite className="text-pink-500 text" />
                      ) : (
                        <MdFavoriteBorder className="text-white" />
                      )}
                    </i>
                  </div>
         

                  <div className=" grid gap-2  ">
                  {/* <div>
                      <p className=" font-semibold text-[1.1em]">{card?.title}</p>
                    </div> */}
                    <div className="space-y-2">
                    <h2 className="font-semibold text-[1.2em] text-black">{card?.service?.name}</h2>

                    <h2 className=" text-gray-400">{card?.option?.name}</h2>
                    </div>
                    <div>
                      {card?.service.type === "general" ? (
                        <p className=" space-x-1">
                          <span className="font-semibold text-black text-[1.1em]">RS</span>{" "}
                          <span className="text-slate-500 text-[1.3em] text-2xl  ">
                             {card?.description?.price}
                          </span>
                        </p>
                      ) : (
                        <p className="space-x-2 ">
                          <span className="font-semibold text-black text-[1.1em]">RS</span>{" "}

                          <span className="text-slate-500 text-2xl text-[1.3em]  ">
                             {card?.description?.price}
                          </span>
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                    <div className="flex gap-3 ">
                      <img
                        src={`http://localhost:8000/${card?.user?.profile?.photo}`}
                        className=" h-[20px] w-[20px] object-cover object-center rounded-full   "
                      />
                      <div className="grid content-center">
                        <h2 className="">
                          {" "}
                          {card?.user?.name}
                        </h2>
                      </div>
                    </div>
                    <div className=" ">
                      <div className="flex gap-2 mb-2 ">
                        <div className="grid content-center">
                          <FaStar className="text-xl text-gray-600" />
                        </div>
                        <span className=" text-gray-800 ">
                          {" "}
                          {(card?.user?.feedbacks.length>0 && parseFloat(card?.user?.feedbacks[0].average_rating).toFixed(1)) ||
                            "0.0"}
                        </span>
                        <span className="">({card?.user?.feedbacks.length>0 && card?.user?.feedbacks[0].count_rating || "0"} )</span>
                      </div>
                    </div>
                    

                    </div>
                   
                   
                  </div>
                </div>
            );
          })}
      </section>
      <section className="grid place-content-center">{children}</section>
    </div>
  );
}

export default ServiceCard;
