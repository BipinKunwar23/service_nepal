import React, { useEffect, useState } from "react";
import { useNavigate, Outlet, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import image from "../images/Plumber.jpg"
import Button from "../components/button";
import { setCategoryAciton ,setCategory,setSubcategory} from "../redux/categorySlice";
export default function Category({categories}) {
  const selected=useSelector((state)=>state.categorySlice.category)
  const navigate = useNavigate();
  const dispatch = useDispatch();


  return (
    <section className="grid  mb-5  ">
      <section className="flex gap-4 w-full overflow-x-auto ">

      {
        categories.map((category)=>{
          return <div key={category?.id} className={`px-5 ${selected===category?.id && ' shadow shadow-gray-600 rounded-lg text-white p-2 '}`}
          onClick={()=>{
            dispatch(setCategory(category?.id))
            dispatch(setSubcategory(null))

          }}

          
          >
            <div className="  box-border hover:cursor-pointer hover:scale-105 transition ">
            <img src={`http://localhost:8000/${category?.icons}`} className="max-w-[80px] h-[80px]  rounded-full border border-gray-600 shadow-inner shadow-gray-700  mb-5 " alt="" />
            <p className="text-center mt-5 text-gray-800  font-semibold ">{category?.name}</p>

            </div>
    </div>
        })
      }
      </section>
  
    </section>
  );
}
