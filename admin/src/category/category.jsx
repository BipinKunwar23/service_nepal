import React, { useEffect, useState } from "react";
import { useNavigate, Outlet, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MdRemoveRedEye } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import image from "../images/Plumber.jpg"
import Button from "../components/button";
import { setCategoryAciton ,setCategory,setSubcategory,setEditAction} from "../redux/categorySlice";


export default function Category({categories}) {
  const selected=useSelector((state)=>state.categorySlice.category)
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ButtonComponent = () => {
    return (
      <div className="flex justify-evenly">
        <i className="">
          <MdRemoveRedEye className="text-2xl font-bold text-blue-600 cursor-pointer hover:text-gray-700"/>
        </i>
        <i className=""
         onClick={()=>{
          dispatch(setEditAction('category'))
        }}
        >
          <MdEdit className="text-2xl text-blue-600 cursor-pointer hover:text-gray-700"/>
        </i>
        <i className="">
          <MdDelete className="text-2xl text-blue-600 cursor-pointer hover:text-gray-700"/>
        </i>
      </div>
    );
  };

  if(categories.length===0){
    return <section>
      <div className="grid shadow-sm shadow-gray-200  m-5 p-5 ">
      <div className="flex place-content-center mt-8 gap-10">
          <button type="button" className="p-2 px-8 rounded-full bg-orange-600 text-white" onClick={()=>{
            dispatch(setCategoryAciton("create"));
          }}>New Category</button>
        </div>
      </div>
    </section>
  }

  return (
    <section className="grid shadow-sm shadow-gray-200  m-5 ">
      <section className="flex w-full overflow-y-scroll p-5">

      {
        categories.map((category)=>{
          return <div key={category?.id} className={`px-5 ${selected===category?.id && 'shadow shadow-gray-800 rounded-lg text-white p-2 '}`}
          onClick={()=>{
            dispatch(setCategory(category?.id))
            dispatch(setSubcategory(null))

          }}

          
          >
            <div className="w-[120px] m-5  box-border hover:cursor-pointer hover:scale-105 transition">
            <img src={`http://localhost:8000/${category?.icons}`} className="w-[100px] h-[100px] rounded-full border border-gray-300 mb-5 " alt="" />
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
          <button type="button" className="p-2 px-8 rounded-full bg-orange-600 text-white mb-5" onClick={()=>{
            dispatch(setCategoryAciton("create"));
          }}>Add Category</button>
        </div>
     
    </section>
  );
}
