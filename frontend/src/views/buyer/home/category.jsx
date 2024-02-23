import React, { useEffect, useState } from "react";
import {
  useNavigate,
  Outlet,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategory,
  setSubcategory,
} from "../../../redux/categorySlice";
export default function Category({ categories }) {
  const selected = useSelector((state) => state.categorySlice.category);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.cardSlice.filters);
  const [filterParams, setFilterParams] = useSearchParams();

  useEffect(() => {
    const filteredObject = Object.fromEntries(
      Object.entries(filters).filter(([key, value]) => value !== null)
    );
    setFilterParams(filteredObject);
  }, [filters]);

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
                dispatch(setSubcategory(null));
                // dispatch(
                //   setFilterAction({
                //     subcategory: null,
                //     category: category.id,
                //     location: null,
                //   })
                // );
                navigate(`category/${category.id}`)
              }}
              // onMouseEnter={()=>{
              //   dispatch(setCategory(category.id))
              // }}
             
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
