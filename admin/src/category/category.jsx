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

  const ButtonComponent = () => {
    return (
      <div className="flex justify-evenly">
        <button className=" hover:text-green-500">View</button>
        <button className=" hover:text-green-500">Edit</button>
        <button className=" hover:text-green-500">Delete</button>
      </div>
    );
  };
  return (
    <section className="grid shadow-sm shadow-gray-200  m-5 p-5 ">
      <section className="flex w-full overflow-y-scroll">

      {
        categories.map((category)=>{
          return <div key={category?.id} className={`px-5 ${selected===category?.id && ' bg-green-500 rounded-lg text-white p-2 '}`}
          onClick={()=>{
            dispatch(setCategory(category?.id))
            dispatch(setSubcategory(null))

          }}

          
          >
            <div className="max-w-[150px] m-5  box-border hover:cursor-pointer hover:scale-105 transition">
            <img src={image} className="max-w-[120px] h-[120px] rounded-full border border-gray-300 mb-5 " alt="" />
            <p className="text-center mt-5 text-gray-600 font-semibold ">{category?.name}</p>

            </div>
       {
        selected===category?.id && <ButtonComponent/>
       }
          </div>
        })
      }
      </section>
    
    <div className="flex place-content-center mt-8 gap-10">
          <Button name="View All" bg_color="green-600" text_color="white"></Button>
          <button type="button" className="p-2 px-8 rounded-full bg-orange-600 text-white" onClick={()=>{
            dispatch(setCategoryAciton("create"));
          }}>Add More</button>
        </div>
     
    </section>
  );
}
