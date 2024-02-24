import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setServiceName } from "../../../redux/buyerSlice";
const SubCategory = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const subcategories=useSelector((state)=>state.buyerSlice.subcategories)
  console.log('subcategories',subcategories);
  return (
    <section className=" relative  ">
      <div className="  ">
        <div className="grid grid-cols-4 gap-5">
          {subcategories.map((subcategory) => {
            return (
              <div className=" bg-white  p-4" key={subcategory.id}>
                <ul>

              <li className="flex flex-col gap-8" >
               <img src={`http://localhost:8000/${subcategory.icons}`} alt=""  className="h-[250px] rounded-lg object-cover  w-full border shadow shadow-gray-300 "/>


                <ul className="flex flex-col gap-4">
                  <li className="mb-3">
                    
                <p className="text-[1.8em] font-semibold text-gray-700  ">
                  {subcategory.name}
                </p>
                  </li>
                  {subcategory.services.map((service) => {
                    return (
                      <li key={service.id}>
                        <p className="text-[1.4em]  text-gray-600  mt-1 hover:cursor-pointer "
                        onClick={()=>{
                          dispatch(setServiceName(service?.name))
                          navigate(`service/${service.id}`)
                        }}
                        >{service?.name}</p>
                      </li>
                    );
                  })}
                </ul>
              </li>
              </ul>

              </div>

            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SubCategory;
