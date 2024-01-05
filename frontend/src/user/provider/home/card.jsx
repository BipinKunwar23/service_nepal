import React, { useEffect } from "react";
import image1 from "../../../images/plumber.jpg";
import { useDispatch, useSelector } from "react-redux";
import { setProviderService } from "../../../redux/serviceSlice";
import { useNavigate, useLocation } from "react-router-dom";
const Card = ({ cards }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const selected = useSelector((state) => state.serviceSlice.service);
  console.log("serviceslice", selected);
  if (cards.length === 0) {
    return (
      <section className="grid place-content-center p-20">
        <div>
          <h2>No Service Are Found</h2>
        </div>
      </section>
    );
  }

  return (
    <section className=" ">
      <section className="grid grid-cols-3 gap-4 p-10 ">
        {cards.map((card) => {
          console.log("cardId", card?.id);
          return (
            <div
              className="     bg-[#fff] p-6 rounded-lg transition-all text-center hover:scale-105 shadow-xl shadow-gray-400 "
              key={card?.id}
            >
              <div className="flex">

              <img
                src={`http://localhost:8000/${card?.icons}`}
                alt=""
                className="h-[80px] w-[80px] object-cover mb-3 rounded-full shadow"
              />
              <div className="text-lg font-bold text-[#666] mb-3 flex-1 grid place-content-center">
                <h2 className="text-center">{card?.name}</h2>
              </div>
              </div>
              <div className="">
                <p className="line-clamp-2 text-center  ">{card?.description}</p>
              </div>
              <div className=" grid flex-1  p-4">
                <button
                  className="bg-green-600 p-2 w-full  rounded-md text-white font-bold text-md"
                 onClick={()=>{
                  navigate(`/provider/service/join/${card?.id}`)

                 }}
                >
                  Join Now
                </button>
              </div>
            </div>
          );
        })}
      </section>
    </section>
  );
};

export default Card;
