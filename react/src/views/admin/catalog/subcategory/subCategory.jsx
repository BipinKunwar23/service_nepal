import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { useState } from "react";
import { useViewCategoryQuery } from "../../../../api/admin/categoryApi";
import { useGetSubCategoryByIdQuery } from "../../../../api/admin/subCategoryApi";

import { NavLink, Outlet, createSearchParams, useLocation, useMatch, useNavigate, useParams } from "react-router-dom";
import AddSubCategory from "./AddSubCategory";
const SubCategory = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState();
  const location = useLocation();
  console.log('search',location?.pathname);
  console.log("option", category);
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


  const isHome=useMatch('admin/category/:categoryId')
if(!isHome){
  return <Outlet/>
}

  if (categoryLoading || subcategoryLoading) {
    return <div>loading...</div>;
  }

  return (
    <section className="  ">
      {/* <CurrentLevel/> */}
      <div className="flex justify-between my-8 gap-10">
        <div>
          <input
            type="search"
            className="border border-blue-400 p-2 rounded w-full "
            placeholder="Search Subcategory"
          />
        </div>
        {!addItem && (
          <div>
            <button
              type="button"
              className="p-2 px-8 rounded  bg-orange-600 text-white mb-5"
              onClick={() => {
                setAddItem(true);
              }}
            >
              New SubCategory
            </button>
          </div>
        )}
      </div>


      {
      addItem && <div>
        <AddSubCategory setAddItem={setAddItem}/>
      </div>
     }

      <table className="w-full box-border table-auto bg-white border  border-gray-200  ">
        <thead>
          <tr className="text-left  bg-red-800 text-white ">
            <th className="py-4 px-4 border-b">Id</th>

            <th className="py-2 px-4 border-b">SubCategory</th>
            <th className="py-2 px-4 border-b">Category</th>

            <th className="py-2 px-4 border-b">Keywords</th>
            <th className="py-2 px-4 border-b">Icons</th>

            <th className="py-2 px-4 border-b">Created At</th>

            <th className="py-2 px-4 border-b"> Actions</th>
          </tr>
        </thead>
        <tbody className=" ">
          {subcategories
            .filter((subcategory) => {
              if (category) {
                return subcategory?.category_id === category;
              }
              return true;
            })
            .map((item) => {
              return (
                <tr key={item?.id} className="even:bg-gray-200 odd:bg-gray-400">
                  <td className="p-4 ">{item?.id}</td>

                  <td className="p-4    ">{item?.name}</td>

                  <td className="p-4    ">
                    {
                      categories?.find(
                        (category) => category.id === item?.category_id
                      ).name
                    }
                  </td>

                  <td className="p-4 max-w-md overflow-ellipsis    ">
                    {item?.keywords}
                  </td>

                  <td className="p-4 max-w-md overflow-ellipsis    ">
                    <img
                      src={`http://localhost:8000/${item.icons}`}
                      className="w-[50px] h-[50px]"
                      alt=""
                    />
                  </td>

                  <td className="p-4   max-w-md overflow-ellipsis    ">
                    {item?.created_at}
                  </td>

                  <td className="p-4 space-x-4">
                    <button
                      className=" text-indigo-600"
                      // onClick={() => {
                      //   navigate({
                      //     pathname:`${location.pathname}${location?.search}/subcategory/${item?.id}`,
                      //     search:createSearchParams({subname:item.name}).toString(),
                      //   })
                      // }}
                    >
                      <NavLink to={`subcategory/${item?.id}`}>view</NavLink>
                    </button>
                    <button className=" text-indigo-600">Edit</button>
                    <button className=" text-indigo-600">Delete</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </section>
  );
};

export default SubCategory;
