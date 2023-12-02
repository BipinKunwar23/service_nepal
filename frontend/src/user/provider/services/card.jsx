import React, { useEffect ,useState} from "react";
import image1 from "../../../images/plumber.jpg";
import { useDispatch, useSelector } from "react-redux";
import { setProviderService } from "../../../redux/serviceSlice";
import { NavLink, useNavigate } from "react-router-dom";

const serviceCard = ({ cards }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      <section className="grid grid-cols-4 p-5 box-border ">
        {cards.map((card) => {
          console.log("cardId", card?.id);
          return (
            <div
              className="    m-5 bg-[#fff] p-3 rounded-lg transition-all text-center hover:scale-105 shadow shadow-gray-600 "
              key={card?.id}
            >
              <img
                src={`http://localhost:8000/${card?.icons}`}
                alt=""
                className="h-[200px] w-full object-cover mb-3"
              />
              <div className="text-lg font-bold text-[#666] mb-3">
                {card?.name}
              </div>
              <div className="">{card?.description}</div>
              <div className="flex justify-center ">
                <button
                  className="bg-green-600 p-1 px-6 w-full m-5 rounded-lg text-white font-bold text-md"
                  onClick={() => {
                 navigate(`/provider/services/${card?.id}`)
                  }}
                >
                  View More
                </button>
              </div>
            </div>
          );
        })}
      </section>
   
    </section>
  );
};

export default serviceCard;
