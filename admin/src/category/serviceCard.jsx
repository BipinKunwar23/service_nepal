import React from "react";
import image1 from "../images/plumber.jpg";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryAciton } from "../redux/categorySlice";
const serviceCard = ({ cards }) => {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.categorySlice.subcategory);
  if (cards.length === 0) {
    return (
      <section className="grid place-content-center p-20">
        <div>
          <h2>No Service Are Found</h2>
          {selected && (
            <button
              className="bg-gray-400 p-2 px-8 rounded-md m-5"
              onClick={() => {
                dispatch(setCategoryAciton("service"));
              }}
            >
              Create New
            </button>
          )}
        </div>
      </section>
    );
  }
  return (
    <section className=" ">
      <div className="flex justify-end">
        {selected && (
          <button
            className="bg-blue-600 p-2 px-8 rounded-full text-white"
            onClick={() => {
              dispatch(setCategoryAciton("service"));
            }}
          >
            Add Services
          </button>
        )}
      </div>
      <section className="grid grid-cols-3 p-5 box-border ">
        {cards.map((card) => {
          return (
            <div
              className="    m-5 bg-[#fff] p-3 rounded-lg transition-all text-center hover:scale-105 shadow shadow-gray-300 "
              key={card?.id}
            >
              <img
                src={image1}
                alt=""
                className="h-[200px] w-full object-cover mb-3"
              />
              <div className="text-lg font-bold text-[#666] mb-3">
                {card?.name}
              </div>
              <div className="">{card?.description}</div>
              <div className="flex justify-between p-5">
                <button className="text-green-600">View</button>
                <button className="text-green-600">Edit</button>

                <button className="text-green-600">Delete</button>

              
              </div>
            </div>
          );
        })}
      </section>
    </section>
  );
};

export default serviceCard;
