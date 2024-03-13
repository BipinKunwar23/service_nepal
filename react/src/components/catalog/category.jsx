import React, { useEffect, useState } from "react";
import {
  useNavigate,
 
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategory,
  setSubCategory,
} from "../../redux/buyerSlice";
export default function Category({ categories }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
      <section className="flex  gap-8  overflow-x-auto p-3  border ">
        
        
        {categories.map((category) => {
          return (

            <div
              key={category?.id}
              
              onClick={() => {
                dispatch(setCategory(category?.id));
                dispatch(setSubCategory(null));
              
                navigate(`category/${category.id}`)
              }}

              className="grid place-content-center   text-lg  cursor-pointer "
           
            >
                
                <button className="text-center   font-medium ">
                  {category?.name}
                </button>
              
            </div>

         

          );
        })}
      </section>
  );
}
