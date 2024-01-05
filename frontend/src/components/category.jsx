import React, { useEffect, useState } from "react";
import { useNavigate, Outlet, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import image from "../images/Plumber.jpg"
import Button from "./button";
export default function Categories({categories,setCategory,selected,button,children}) {
  const navigate = useNavigate();
console.log('button is',button);
  const dispatch = useDispatch();


  return (
    <section className="flex bg-[#1D438A]  ">
      {
        categories.map((category)=>{
          return <div key={category?.id} className={`px-5 ${selected?.id===category?.id && 'shadow shadow-slate-300 '}`}
          onClick={()=>{
            dispatch(setCategory(category))
          }}

          
          >
            <div className="max-w-[150px] m-5  box-border hover:cursor-pointer hover:scale-105 transition">
            <img src={image} className="max-w-[120px] h-[120px] rounded-full border border-gray-300 mb-5 " alt="" />
            <p className="text-center mt-5 text-gray-600 font-semibold ">{category?.name}</p>

            </div>
       {
        selected?.id===category?.id && children
       }
          </div>
        })
      }
    
     
    </section>
  );
}
