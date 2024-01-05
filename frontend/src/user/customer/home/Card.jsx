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
    <section className="  grid grid-cols-3 gap-5  grid-flow-row  px-5  font-sans  ">
      {cards &&
        cards.map((card) => {
          return (
            <div
              key={card.id}
              className=" bg-white  p-3 rounded-lg transition-all text-center hover:scale-105 shadow-lg shadow-gray-600  hover:cursor-pointer "
              onClick={() => {
                dispatch(setProviderId(card?.id));
                navigate(
                  `/provider/${card?.id}/category/${card?.category?.id}`
                );
              }}
            >
              <div className="  box-border flex gap-2  mb-2">
                <img
                  src={card?.image}
                  className=" h-[100px] w-[100px] object-cover rounded-full shadow-inner"
                />

                <div className="text-lg font-semibold grid place-content-center ">
                  <h2> {card?.name}</h2>
                  <h2 className="text-green-600">
                    {" "}
                    {card?.category?.profession}
                  </h2>
                </div>
              </div>
              <div className=" p-1">
                <div className="   text-center">
                  <div>
                    <p className="line-clamp-3">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Perferendis quidem repellat cum fugiat illo fugit
                      expedita, tempora, atque sed labore in voluptatem dolores
                      dolorem, numquam similique rem officia cumque vero!
                    </p>
                  </div>
                  <div>
                    <strong>Sun Mon Tue Wed</strong>
                  </div>
                  <div>
                    <strong> 10:00 AM - 5:00 PM</strong>
                  </div>
                
                  <div>
                    <strong> From: 2023-22-05 ,Tue </strong>
                  </div>
                  <div>
                    <strong>Gaindakot, Nawalpur </strong>
                  </div>
                  <div>
                    <span className="text-slate-600 text-lg"> <span className="text-green-600">20%</span> off for Early Booking</span>
                  </div>
               
                  
                  <h2 className=" font-bold">Featuring Services:</h2>
                  <ol className="flex flex-col gap-1 text-gray-600 text-center p-2 ">
                    {card?.services?.map((service) => {
                      return (
                        <li
                          key={service?.id}
                          className="font-semibold ml-2 text-center text-[1em]"
                        >
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
