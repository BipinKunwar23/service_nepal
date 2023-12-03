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
    <section className="grid shadow-sm shadow-gray-200  m-5 p-5 ">
      <section className="flex w-full overflow-y-scroll p-5">

      {
        categories.map((category)=>{
          return <div key={category?.id} className={`px-5 ${selected===category?.id && ' shadow shadow-gray-600 rounded-lg text-white p-2 '}`}
          onClick={()=>{
            dispatch(setCategory(category?.id))
            dispatch(setSubcategory(null))

          }}

          
          >
            <div className="max-w-[150px] m-5  box-border hover:cursor-pointer hover:scale-105 transition">
            <img src={`http://localhost:8000/${category?.icons}`} className="max-w-[120px] h-[120px] rounded-full border border-gray-300 mb-5 " alt="" />
            <p className="text-center mt-5 text-gray-600 font-semibold ">{category?.name}</p>

            </div>
    </div>
        })
      }
      </section>
    
    <div className="flex place-content-center mt-8 gap-10">
          <Button name="View All" bg_color="green-600" text_color="white"></Button>
          
        </div>
     
    </section>
  );
}
