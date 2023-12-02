import React from "react";
import { useSelector } from "react-redux";
import { setCategoryAciton } from "../redux/categorySlice";
import { useDispatch } from "react-redux";
import { setSubcategory } from "../redux/categorySlice";
import { MdRemoveRedEye } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { setEditAction } from "../redux/categorySlice";
const SubCategory = ({ subcategories }) => {
  const dispatch = useDispatch();
  const AddSubCategory = () => {
    return (
      <div className="flex justify-center">
        <button
          className="bg-green-600 l p-2 px-4 rounded-full   text-white"
          onClick={() => {
            dispatch(setCategoryAciton("subcategory"));
          }}
        >
          Add SubCategory
        </button>
      </div>
    );
  };

  const catg = useSelector((state) => state.categorySlice.category);
  const subcatg = useSelector((state) => state.categorySlice.subcategory);

  const [showButton, setShowButton] = useState(null);

  return (
    <div className="flex flex-col font-semibold shadow min-h-screen shadow-gray-400   ">
      <ul className="flex flex-col mb-8 border-b p-5 border-gray-300 ">
        <li>Departments</li>
        {subcategories.map((subcategory) => {
          return (
            <ul
              className={`m-1 flex gap-3 hover:bg-gray-200 hover:cursor-pointer p-2 rounded-md ${
                subcatg === subcategory?.id && "bg-gray-200"
              }`}
              key={subcategory?.id}
             
            >
              <li className="flex-1 flex gap-1">
                <p
                  onClick={() => {
                    dispatch(setSubcategory(subcategory?.id));
                  }}
                
                  className="cursor-pointer  flex-1 "
                >
                  {subcategory?.name}
                </p>
                {catg && subcatg === subcategory?.id && (
                  <ul className="flex gap-2 ">
                    <li>
                      <i className="">
                        <MdRemoveRedEye className="text-2xl font-bold text-blue-600 cursor-pointer hover:text-gray-700" />
                      </i>
                    </li>
                    <li>
                      <i className=""
                      onClick={()=>{
                        dispatch(setEditAction('subcategory'))
                      }}
                      >
                        <MdEdit className="text-2xl text-blue-600 cursor-pointer hover:text-gray-700" />
                      </i>
                    </li>
                    <li>
                      <i className="">
                        <MdDelete className="text-2xl text-blue-600 cursor-pointer hover:text-gray-700" />
                      </i>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          );
        })}
      </ul>
      {catg && <AddSubCategory />}
    </div>
  );
};

export default SubCategory;
