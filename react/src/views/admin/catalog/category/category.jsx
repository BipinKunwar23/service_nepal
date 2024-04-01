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
import { AddCategory } from "./AddCategory";
import EditCategory from "./editCategory";
import {
  useViewCategoryQuery,
  useDeleteCategoryMutation,
} from "../../../../api/admin/categoryApi";

export default function Category() {
  const { data: categories, isLoading } = useViewCategoryQuery();
  console.log("category", categories);
  const [deleteCategory] = useDeleteCategoryMutation();
  const DeleteCategory = async (id) => {
    await deleteCategory(id)
      .unwrap()
      .then((response) => {
        if (response) {
          setEdit(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [addItem, setAddItem] = useState(false);
  const [editItem, setEditItem] = useState(false);
  const [categoryId, setCategory] = useState();

  const ishome = useMatch("category");

  // if (!ishome) {
  //   return <Outlet />;
  // }

    
  useEffect(() => {
    if (editItem) {
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    }

    return () => {
      document.body.style.position = "static";
    };
  }, [editItem]);
  
  if (isLoading) {
    return <div>loading..</div>;
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
          <EditCategory categoryId={categoryId} setEdit={setEditItem} />
        </div>
        </div>

      )}
    <section className="grid p-4   w-full">
      <div>
        <h2 className="text-slate-600 text-xl font-semibold">
          Category Management
        </h2>
      </div>
      <div className="flex justify-between mt-8 gap-10">
        <div>
          <input
            type="search"
            className="border-2 border-blue-400 p-2 rounded w-full "
            placeholder="Search category"
          />
        </div>
        {!addItem && (
          <div>
            <button
              type="button"
              className="p-2 w-[150px] rounded  bg-green-600 text-white mb-5"
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
          <AddCategory setAddItem={setAddItem} />
        </div>
      )}

      <section className="flex w-full  ">
        <table className="w-full box-border table-auto ">
          <thead>
            <tr className="text-left  bg-slate-100 ">
              <th className="p-3 ">Category</th>
              <th className="p-3 ">Keywords</th>

              <th className="p-3  "> Actions</th>
            </tr>
          </thead>
          <tbody className=" ">
            {categories.map((item) => {
              return (
                <tr key={item?.id} className=" even:bg-slate-100">
                  <td className="p-3    ">
                    <div className="flex justify-between">
                      <p> {item?.name}</p>
                    </div>
                  </td>

                  <td className="p-3 max-w-md overflow-ellipsis    ">
                    {item?.keywords}
                  </td>

                  <td className="p-3 space-x-4">
                    <button
                      className=" text-indigo-600"
                      onClick={() => {
                        navigate(`${item?.id}`);
                      }}
                    >
                      Subcategory
                    </button>

                    <button
                      className=" text-indigo-600"
                      onClick={() => {
                        // navigate("new");
                        setCategory(item?.id);
                        setEditItem(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className=" text-indigo-600"
                      onClick={() => {
                        DeleteCategory(item?.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </section>
    </>

  );
}
