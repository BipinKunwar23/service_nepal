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
    <>
      <section className="  grid grid-cols-4 grid-flow-row   py-4 gap-10   ">
        {cards &&
          cards?.map((card) => {
            console.log("service card", card?.service?.type);
            return (
              <div
                key={card.id}
                className="     hover:cursor-pointer   "
                onClick={() => {
                  dispatch(setProviderId(card?.id));
                  navigate(`${url}/${card?.id}`);
                }}
              >
                <div className="   mb-2 ">
                  <div className="relative">
                    <img
                      src={`http://localhost:8000/${card?.description?.image}`}
                      className=" h-[160px] w-full object-cover object-right-top rounded-lg  border border-gray-300 "
                    />

                    <i className="absolute top-0 right-0 m-2 text-3xl  ">
                      {card?.lists?.length > 0 ? (
                        <MdFavorite className="text-pink-500 text" />
                      ) : (
                        <MdFavoriteBorder className="text-white" />
                      )}
                    </i>
                  </div>

                  <div className="  grid content-center gap-2  ">
                    <div className="flex gap-3 mt-3">
                      <img
                        src={`http://localhost:8000/${card?.user?.profile?.photo}`}
                        className=" h-[30px] w-[30px] object-cover object-center rounded-full   "
                      />
                      <div className="grid content-center">
                        <h2 className="font-semibold text-lg">
                          {" "}
                          {card?.user?.name}
                        </h2>
                      </div>
                    </div>
                    <div>
                      <p className=" font-semibold text-lg">{card?.title}</p>
                    </div>
                    <div className=" ">
                      <div className="flex gap-2 mb-2 font-semibold ">
                        <div className="grid content-center">
                          <FaStar className="text-2xl" />
                        </div>
                        <span className=" text-gray-800 text-lg">
                          {" "}
                          {(card?.rating && card?.ratings[0]?.avg_rating) ||
                            "0.0"}
                        </span>
                        <span className="text-lg">(200)</span>
                      </div>
                    </div>
                    <div>
                      {card?.service.type === "general" ? (
                        <p className=" ">
                          <span className="font-semibold text-black">FROM</span>{" "}
                          <span className="text-gray-600 text-[1em] ml-2 ">
                            RS {card?.description?.price}
                          </span>
                        </p>
                      ) : (
                        <p className=" ">
                          <span className="text-gray-600 text-[1em] ml-2 font-semibold">
                            RS {card?.description?.price}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </section>
      <section className="grid place-content-center">{children}</section>
    </>
  );
}

export default ServiceCard;
