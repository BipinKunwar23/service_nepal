import React from "react";
import { FaEnvelope } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProviderId } from "../../../redux/cardSlice";
import image from "../../../images/plumber.jpg";
function Card({ cards }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("cards", cards);
  return (
    <section className="  grid grid-cols-3  grid-flow-row  px-20  font-sans bg-white  ">
      {cards &&
        cards.map((card) => {
          return (
            <div
              key={card.id}
              className=" bg-[#fff] p-3 m-5  rounded-lg transition-all text-center hover:scale-105 shadow shadow-gray-600  hover:cursor-pointer "
              onClick={() => {
                dispatch(setProviderId(card?.id));
              }}
            >
              <div className="w-full h-[200px]  box-border bg-white">
                <img
                  src={`http://localhost:8000/${card?.profile?.photo}`}
                  alt={image}
                  className=" w-full h-full object-cover rounded-md"
                />
              </div>
              <div className=" flex place-content-center">
                {Array(card?.rating)
                  .fill()
                  .map((_, index) => (
                    <div key={index} className=" ">
                      <FaStar className=" text-[#FA130C] text-[1em] m-2 mt-5 mb-5 " />
                    </div>
                  ))}
              </div>
              <div className="text-xl font-semibold text-[#666] mb-3">
                {card?.name.toUpperCase()}
              </div>
              <div className="">{card?.description}</div>
              <div className="bg-indigo-800  text-white  text-left">
                <ol className="flex flex-col gap-4 text-white list-disc p-4 ">
                  {card?.services?.map((service) => {
                    return (
                      <li key={service?.id} className="font-semibold ml-2">
                        {service?.name}
                      </li>
                    );
                  })}
                </ol>
                <div className="p-3">
                  <button
                    className="bg-[rgba(0,0,0,0.6)] text-white p-2 px-8 rounded-md w-full "
                    type="button"
                    onClick={() => {
                      navigate(`/provider/${card?.id}`);
                    }}
                  >
                    View More
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </section>
  );
}

export default Card;
