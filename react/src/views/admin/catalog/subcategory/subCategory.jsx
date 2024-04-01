import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { useState } from "react";
import { useViewCategoryQuery } from "../../../../api/admin/categoryApi";
import { useGetSubCategoryByIdQuery } from "../../../../api/admin/subCategoryApi";

import {
  NavLink,
  Outlet,
  createSearchParams,
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import AddSubCategory from "./AddSubCategory";
import EditSubCategory from "./ediSubCategory";
const SubCategory = () => {
  const { categoryId } = useParams();
  const [editItem, setEditItem] = useState(false);
  const [subcategory, setSubCategory] = useState()
  
  useEffect(() => {
    if (editItem) {
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    }

    return () => {
      document.body.style.position = "static";
    };
  }, [editItem]);


  const {
    data: subcategories,
    isLoading: subcategoryLoading,
    error: subcataegoryError,
  } = useGetSubCategoryByIdQuery(categoryId);

  const [addItem, setAddItem] = useState(false);

  const navigate = useNavigate();
  
  const {
    data: categories,
    isError: categoryIsError,
    isLoading: categoryLoading,
    error: cataegoryError,
  } = useViewCategoryQuery();

  console.log("categories", subcategories);
  const dispatch = useDispatch();

  const isHome = useMatch("admin/category/:categoryId");
  if (!isHome) {
    return <Outlet />;
  }

  if (categoryLoading || subcategoryLoading) {
    return <div>loading...</div>;
  }

  return (
    <>
    {editItem && (
        <div className="bg-[rgba(0,0,0,0.5)] absolute w-[77Vw] h-screen p-4 grid place-content-center">

        <div className="border-2 border-blue-200 p-3 my-4  bg-white top-0 ">
          <div className="flex justify-end">
            <button
              className="text-blue-600 text-xl"
              onClick={() => {
                setEditItem(false);
              }}
            >
              X
            </button>
          </div>
          <EditSubCategory value={subcategory} setEdit={setEditItem} />
        </div>
        </div>

      )}

    <section className=" p-4 ">
      {/* <CurrentLevel/> */}
      <div>
        <h2 className="text-slate-600 text-xl font-semibold">
          Sub-Category Management
        </h2>
      </div>
      <div className="flex justify-between mt-8 gap-10">
        <div>
          <input
            type="search"
            className="border-2 border-blue-400 p-2 rounded w-full "
            placeholder="Search Subcategory"
          />
        </div>
        {!addItem && (
          <div>
            <button
              type="button"
              className="p-2 px-8 rounded  bg-green-600 w-[120px] text-white mb-5"
              onClick={() => {
                setAddItem(true);
              }}
            >
              Add New
            </button>
          </div>
        )}
      </div>

      {addItem && (
        <div className="border-2 border-blue-200 p-3 my-4 ">
          <div className="flex justify-end">
            <button
              className="text-blue-600 text-xl"
              onClick={() => {
                setAddItem(false);
              }}
            >
              X
            </button>
          </div>
          <AddSubCategory setAddItem={setAddItem} />
        </div>
      )}

      
      <table className="w-full box-border table-auto bg-white border  border-slate-100  ">
        <thead>
          <tr className="text-left  bg-slate-100 ">
            <th className="p-3">Sub-Category</th>

            <th className="p-3">Keywords</th>
            <th className="p-3">Icons</th>

            <th className="p-3"> Actions</th>
          </tr>
        </thead>
        <tbody className=" ">
          {subcategories.map((item) => {
            return (
              <tr key={item?.id} className="even:bg-slate-100 ">
                <td className="px-3    ">{item?.name}</td>

                <td className="px-3 max-w-md overflow-ellipsis    ">
                  {item?.keywords}
                </td>

                <td className="px-3 max-w-md overflow-ellipsis    ">
                  <img
                    src={`http://localhost:8000/${item.icons}`}
                    className="w-[50px] h-[50px]"
                    alt=""
                  />
                </td>

                <td className="p-4 space-x-4">
                  <button className=" text-indigo-600">
                    <NavLink to={`subcategory/${item?.id}`}>Service</NavLink>
                  </button>
                  <button
                    className=" text-indigo-600"
                    onClick={() => {
                      setSubCategory(item);
                      setEditItem(true);
                    }}
                  >
                    Edit
                  </button>
                  <button className=" text-indigo-600">Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
    </>

  );
};

export default SubCategory;
