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
    <section className="  grid grid-cols-3  grid-flow-row  px-5  font-sans bg-white  ">
      {cards &&
        cards.map((card) => {
          return (
            <div
              key={card.id}
              className=" bg-[#fff] p-3 m-5 w-[250px]  rounded-lg transition-all text-center hover:scale-105 shadow shadow-gray-600  hover:cursor-pointer "
              onClick={() => {
                dispatch(setProviderId(card?.id));
                navigate(`/provider/${card?.id}`);
              }}
            >
              <div className=" h-[180px]  box-border bg-white mb-5">
                <img
                  src={`http://localhost:8000/${card?.profile?.photo} `}
                  alt={image}
                  className=" w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className=" p-1">

              <div className="text-lg font-semibold ">
                {card?.name}
              </div>
            
              <div className="">{card?.profile?.description}</div>
              <div className="   text-center">
                <div className="text-center my-2">
                <a href={`/provider/${card?.id}`} className="text-gray-600 font-bold text-sm underline text-center ">See all services</a>

                </div>
                <h2 className=" font-bold">Featuring Services:</h2>
                <ol className="flex flex-col gap-1 text-gray-600 text-center p-2 ">
                  {card?.services?.map((service) => {
                    return (
                      <li key={service?.id} className="font-semibold ml-2 text-center text-[1em]">
                        {service?.name}
                      </li>
                    );
                  })}
                </ol>
                {/* <div className="p-3">
                  <button
                    className="bg-[rgba(0,0,0,0.6)] text-white p-2 px-8 rounded-md w-full "
                    type="button"
                    onClick={() => {
                      navigate(`/provider/${card?.id}`);
                    }}
                  >
                    View More
                  </button>
                </div> */}
              </div>

              </div>
            </div>
          );
        })}
    </section>
  );
}

export default Card;
