import React, { useEffect, useState } from "react";
import {
  useNavigate,
  Outlet,
  useParams,
  useMatch,
  createSearchParams,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MdRemoveRedEye } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { AddCategory } from "./AddCategory";22
import { useViewCategoryQuery } from "../../../../api/admin/categoryApi";

export default function Category() {
  const { data: categories, isLoading } = useViewCategoryQuery();
  console.log("category", categories);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [addItem, setAddItem] = useState(false);
  const ishome = useMatch("category");

  // if (!ishome) {
  //   return <Outlet />;
  // }

  if (isLoading) {
    return <div>loading..</div>;
  }

  return (
    <section className="grid p-4 space-y-8  w-full">
      <div className="flex justify-between mt-8 gap-10">
        <div>
          <input
            type="search"
            className="border border-blue-400 p-2 rounded w-full "
            placeholder="Search category"
          />
        </div>
        {!addItem && (
          <div>
            <button
              type="button"
              className="p-2 px-8 rounded  bg-orange-600 text-white mb-5"
              onClick={() => {
                // navigate("new");
                setAddItem(true);
              }}
            >
              New Category
            </button>
          </div>
        )}
      </div>
      {addItem && (
        <div>
          <AddCategory setAddItem={setAddItem} />
        </div>
      )}

      <section className="flex w-full l ">
        <table className="w-full box-border table-auto bg-white border  border-gray-200  ">
          <thead>
            <tr className="text-left  bg-red-800 text-white ">
              <th className="py-4 px-4 border-b">Id</th>

              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Keywords</th>
              <th className="py-2 px-4 border-b">Created At</th>

              <th className="py-2 px-4 border-b"> Actions</th>
            </tr>
          </thead>
          <tbody className=" ">
            {categories.map((item) => {
              return (
                <tr key={item?.id} className="even:bg-gray-200 odd:bg-gray-400">
                  <td className="p-4 ">{item?.id}</td>

                  <td className="p-4    ">
                    <div className="flex justify-between">
                      <p> {item?.name}</p>
                    </div>
                  </td>

                  <td className="p-4 max-w-md overflow-ellipsis    ">
                    {item?.keywords}
                  </td>

                  <td className="p-4   max-w-md overflow-ellipsis    ">
                    {item?.created_at}
                  </td>

                  <td className="p-4 space-x-4">
                    <button
                      className=" text-indigo-600"
                      onClick={() => {
                        navigate(`${item?.id}`);
                      }}
                    >
                      View
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
    </section>
  );
}
