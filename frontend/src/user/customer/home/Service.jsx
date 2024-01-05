import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaStar } from "react-icons/fa";

import { useNavigate, useParams } from "react-router-dom";
import { setServiceId } from "../../../redux/cardSlice";
import ImageSlider from "./ImageSlider";
import { setAvailableDate } from "../../../redux/serviceSlice";
import { IoCartOutline } from "react-icons/io5";
import { IoCart } from "react-icons/io5";
import { setSelectedScope } from "../../../redux/serviceSlice";
const Service = ({ data }) => {
  const selectedScope = useSelector((state) => state.serviceSlice.scopes);
  const dispatch = useDispatch();

  const handleSelectedItem = (scope) => {
    const isIncludes = selectedScope.includes(scope);
    if (isIncludes) {
      const updatedScope = selectedScope.filter(
        (selected) => selected.id !== scope.id
      );
      dispatch(setSelectedScope(updatedScope));
    } else {
      dispatch(setSelectedScope([...selectedScope, scope]));
    }

    // const isinclude=selectedScope.some((selected)=>selected.id===scope.id)
  };
  console.log("selected scope", selectedScope);
  return (
    <section>
      <h2 className=" text-slate-700 font-bold p-3">Featuring Services</h2>
      <div className="grid grid-cols-2   ">
        {data?.map((service) => (
          <div
            key={service?.id}
            className=" p-2 shadow-md bg-white shadow-gray-400 grid    m-3 rounded-lg box-border"
          >
            <div className="ml-2">
              <div className="flex gap-5 mb-3">
                <img
                  src={service?.icons}
                  alt=""
                  className="w-[80px] h-[80px] object-cover rounded-full"
                />
                <div className="grid content-center">
                  <h2 className=" text-gray-700 font-semibold text-lg mb-2">
                    {service?.name}
                  </h2>
                </div>
              </div>
              <div className="">
                <h2 className="bg-red-600 p-2 text-white">Service Scopes</h2>
                <div className="grid grid-cols-2">
                  {service?.scopes.map((scope) => {
                    return (
                      <div
                        key={scope.id}
                        className=" m-2 rounded-lg shadow bg-gray-100 p-2"
                      >
                        <p className="mb-3 font-semibold text-gray-800 flex gap-2">
                          <span className="block flex-1">{scope.name}</span>
                          <button
                            onClick={() => {
                              handleSelectedItem(scope);
                            }}
                          >
                            {selectedScope.includes(scope) ? (
                              <i className="text-lg text-blue-600">
                                <IoCart />
                              </i>
                            ) : (
                              <i className="font-bold text-lg">
                                <IoCartOutline />
                              </i>
                            )}
                          </button>
                        </p>
                        <p>
                          <span className="text-slate-500">{scope.price}</span>
                          <span className="text-orange-700 font-semibold">
                            / {scope.unit}
                          </span>
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <a href="" className="underline text-gray-600 mb-2">
                see more
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Service;
