import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCategory, setSubCategory } from "../../../redux/buyerSlice";
export default function Category({ categories }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <section className="flex flex-wrap gap-8 w-full overflow-x-auto border border-gray-300 p-3 px-10  ">
      {categories.map((category) => {
        return (
          <div
            key={category?.id}
            onClick={() => {
              dispatch(setCategory(category?.id));
              dispatch(setSubCategory(null));

              navigate(`category/${category.id}`);
            }}
            className="grid place-content-center   text-lg border p-1 px-4 cursor-pointer rounded-full border-gray-400"
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
