import React, { useEffect } from "react";
import logo from "../images/logo.png";
import { useNavigate,Outlet} from 'react-router-dom'; 
import Service from "./service";
import Category from "./Category"
import { FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {setCategory} from '../redux/cardSlice'

const Home = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch()

  return (
    <div className="grid grid-cols-5 gap-1 box-border p-1 bg-[#1D438A]">
       <Category/>
      <section className="col-span-4 col-start-2 col-end-6 row-start-1 shadow flex flex-col bg-[rgba(0,0,0,0.6)] "
            onMouseEnter={()=>{
        
              dispatch(setCategory({parent:{},subparent:{},child:{}}))
                    }}
      >
      <div className="flex  gap-4  text-slate-800  px-20 mt-10">
      <div className=" flex    flex-1 rounded-sm ">
            <div className=" flex-1">
              <input
                type="text"
                name=""
                id=""
                className="  flex-1 p w-full p-2 text-gray-800 bg-gray-200 focus:outline-none rounded-sm text-sm"
                placeholder="Search Your Services"
              />
            </div>
            <div className="  px-5 p-2 grid place-content-center bg-[#0118E6] rounded-sm ">
              <button>
                <FaSearch className=" text-gray-300" />
              </button>
            </div>
          </div>
            <div className="w-[150px] ">
              <button className="bg-blue-600 w-full text-white p-2 "
              onClick={()=>{
                navigate('category/all')
              }}
              >Create New</button>
            </div>
          </div>
       <Outlet/>
      </section>
    </div>
  );
};

export default Home;
