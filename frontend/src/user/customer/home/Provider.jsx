import React, { useState } from "react";

import { FaStar } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import { setServiceId } from "../../../redux/cardSlice";
import ImageSlider from "./ImageSlider";
import { setAvailableDate } from "../../../redux/serviceSlice";
const Provider = ({ data }) => {
  const serviceId = useSelector((state) => state.cardSlice.serviceId);
  const { detail } = data;
  console.log("cards", data);
  const navigate = useNavigate();
  const [view, setView] = useState(false);
  const dispatch = useDispatch();
  const [viewItem, setviewItem] = useState(null);
  const actions = [
    {
      name: "Descriptions",
    },
    {
      name: "Education and Training",
    },
    {
      name: "Skills and Experience",
    },
    {
      name: "Payment Policy",
    },
    {
      name: "Service Terms",
    },
    {
      name: "Deliverable and Limitation",
    },
  ];

  const handleItem = () => {
    console.log("vieitem", viewItem);

    switch (viewItem) {
      case "Descriptions":
        return (
          <div className="p-3">
            <p>{detail?.description}</p>
          </div>
        )
        break;
      case "Education and Training":
        return (
            <div className="p-3">
              <p>{detail?.education}</p>
          </div>
        );
        break;

      case "Skills and Experience":
        return (
            <div className="p-3">
              <p>{detail?.experience}</p>
            </div>
        );
        break;
      case "Service Terms":
        return (
            <div>
              <p className="p-3">{detail?.terms}</p>
            </div>
        );
        break;
      case "Payment Policy":
        return (
             <div>
              <p className="p-3">{detail?.measures}</p>
            </div>
        );
        break;
      case "Deliverable and Limitation":
        return (
            <div>
              <p className="p-3">{detail?.limitation}</p>
          </div>
        );
        break;
      default:
        return null;
        break;
    }
  };

  return (
    <section className=" rounded-lg shadow">
      {/* <h2 className="text-center font-semibold text-lg mt-3 text-gray-800">
        Service Details
      </h2>
     */}

      <section className="    flex flex-col shadow rounded-lg ">
        <div>
          {/* <div className="grid grid-cols-2">
                <strong>Category</strong>
                <p>{data?.name}</p>
              </div> */}
        </div>
        {/* <div>
              <p>About Profession</p>
              <div>
                <strong>Professon</strong>
                <p>{detail?.profession}</p>
              </div>
              <div>
                <strong>Description</strong>
                <p>{detail?.description}</p>
              </div>
            
            </div> */}

        <div className="">
          <p className="text-[1.2em] font-bold text-gray-800 p-2 ">Availability</p>
          <div className="provider-catgory-column">
            <strong> Time</strong>
            <p>
              <span>{detail?.available_time?.start}</span>-{" "}
              <span>{detail?.available_time?.end}</span>
            </p>
          </div>
          <div className="provider-catgory-column">
            <strong> Days</strong>
            <ul className="flex flex-wrap gap-4 text-blue-600 font-semibold col-span-2">
              {detail?.available_days.map((day) => (
                <li key={day}>{day}</li>
              ))}
            </ul>
          </div>
          <div className="provider-catgory-column">
            <strong> Cities</strong>
            <ul className="flex gap-4 text-blue-600 font-semibold">
              {detail?.available_cities.map((city, index) => (
                <li key={index}>{city.city}</li>
              ))}
            </ul>
          </div>
          <div className="provider-catgory-column">
            <strong> Date</strong>
            <p>
              <span>{detail?.available_date}</span>
            </p>
          </div>
          <div className="px-2">
                  <button className="bg-orange-800 p-2 w-full text-white rounded-md my-4"
                  onClick={()=>{
                    navigate("order")
                  }}
                  >Order Now</button>
                  </div>
        </div>

        <div>
          <ul className="flex flex-col gap-2 border-t border-gray-400 mt-4 shadow">
            {actions.map((action) => {
              return (
                  <li
                    className=" grid grid-cols-1 border-b border-gray-400  p-2 "
                    key={action.name}
                    onClick={() => {
                      viewItem && viewItem===action.name ? setviewItem(null) :
                      setviewItem(action.name)
                      
                    }}
                  >
                    <button className=" font-semibold text-left ">
                      {action.name}
                    </button>
                    {action.name === viewItem && handleItem()}
                  </li>
              );
            })}
          </ul>
        </div>
      </section>
    </section>
  );
};

export default Provider;
