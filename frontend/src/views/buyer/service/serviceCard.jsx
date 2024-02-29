import React from "react";
import { FaEnvelope } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProviderId } from "../../../redux/buyerSlice";
import { IoIosStar } from "react-icons/io";

function ServiceCard({ cards }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("cards", cards);
  return (
    <section className="  flex gap-10  grid-flow-row    font-sans px-4  ">
      {cards &&
        cards.map((card) => {
          return (
            <div
              key={card.id}
              className="    w-[24%] m-5 hover:cursor-pointer  "
              onClick={() => {
                dispatch(setProviderId(card?.id));
                navigate(
                  `/user/service/${card?.id}`
                );
              }}
            >
              <div className="   mb-2 ">
                <img
                  src={`http://localhost:8000/${card?.image}`}
                  className=" h-[200px] w-full object-cover object-right-top rounded-lg  border border-gray-300 "
                />

                <div className="text-[1.3em]  grid content-center gap-2  ">
                  <div className="flex gap-5 mt-3">
                  <img
                  src={`http://localhost:8000/${card?.user?.profile?.photo}`}
                  className=" h-[40px] w-[40px] object-contain rounded-full   "
                />
                <div className="grid content-center">
                <h2 className="font-bold"> {card?.user?.name}</h2>

                </div>

                  </div>
                  <div>
                    <p className="text-gray-600 font-semibold ">{card?.title}</p>
                  </div>
                  
                  <div className="flex gap-2 mb-2 ">
                     <div className="grid content-center">

               
                    <IoIosStar
                     className="text-orange-600"
                     />
                     </div>
                     <span className="text-lg text-gray-600"> 5.0</span>
                
              </div>
              <div>
              <p className=" font-semibold">From <span className="text-gray-600"> Rs 300</span></p>
              </div>
                </div>
              </div>
              </div>

              
             
          );
        })}
    </section>
  );
}

export default ServiceCard;
