import React, { useEffect, useState } from "react";
import {
  useNavigate,
 
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategory,
  setSubCategory,
} from "../../../redux/buyerSlice";
export default function Category({ categories }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
      <section className="flex gap-10 w-full overflow-x-auto ">
        {categories.map((category) => {
          return (
            <section className="flex flex-col gap-8">

            <div
              key={category?.id}
              className={`m-3
        
              `}
              onClick={() => {
                dispatch(setCategory(category?.id));
                dispatch(setSubCategory(null));
              
                navigate(`category/${category.id}`)
              }}
           
            >
              <div className="  box-border hover:cursor-pointer hover:scale-105 transition text-lg ">
                <img
                  src={`http://localhost:8000/${category?.icons}`}
                  className="max-w-[80px] h-[80px]  rounded-full border border-gray-600 shadow-inner shadow-gray-700  mb-5 "
                  alt=""
                />
                <p className="text-center mt-5 text-gray-800  font-semibold ">
                  {category?.name}
                </p>
              </div>
            </div>

         
            </section>

          );
        })}
      </section>
  );
}
