import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useGetOptionsByServiceQuery } from "../../../../api/admin/optionApi";
import Select from "react-select";
import AddServiceOption from "./addOpiton";
import EditOption from "./editOption";
const ServiceOption = () => {
  const [category, setCategory] = useState();
  const [subcategory, setSubcategory] = useState();
  const { serviceId } = useParams();
  const location = useLocation();
  const [addItem, setAddItem] = useState(false);
  const [editItem, setEditItem] = useState(false);
  const [option, setOption] = useState()
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
    data: services,
    isError: serviceIsError,
    isLoading: serviceLoading,
    error: serviceError,
  } = useGetOptionsByServiceQuery(serviceId);

  console.log("services", services);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  if (serviceLoading) {
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
        <EditOption option={option} setEdit={setEditItem} />
      </div>
      </div>

    )}

    <section className="p-4  ">
      <div>
        <h2 className="text-slate-600 text-xl font-semibold">
          Service-Option Management
        </h2>
      </div>
      <div className="flex justify-between mt-8 gap-10">
        <div>
          <input
            type="search"
            className="border-2 border-blue-400 p-2 rounded w-full "
            placeholder="Search Services"
          />
        </div>
        {!addItem && (
          <div>
            <button
              type="button"
              className="p-2 px-8 rounded  bg-green-600 w-[200px] text-white mb-5"
              onClick={() => {
                setAddItem(true);
              }}
            >
              New Option
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
          <AddServiceOption setAddItem={setAddItem} />
        </div>
      )}
      <table className="w-full box-border table-auto   ">
        <thead>
          <tr className="text-left  bg-slate-100  ">
            <th className="p-3">Service Options</th>
            <th className="p-3">Keywords</th>

            <th className="p-3"> Actions</th>
          </tr>
        </thead>
        <tbody className=" ">
          {services.map((item) => {
            return (
              <tr key={item?.id} className="even:bg-slate-100 ">
                <td className="p-3   ">{item?.name}</td>
                <td className="p-3    ">{item?.keywords}</td>

                <td className="p-3 space-x-4">
                  {searchParams.get("type") === "general" && (
                    <button
                      className=" text-blue-600"
                      onClick={() => {
                        navigate(`option/${item?.id}`);
                      }}
                    >
                      Standard
                    </button>
                  )}
                  <button className=" text-indigo-600"
                   onClick={()=>{
                    setOption(item)
                    setEditItem(true)
                  }}
                  >Edit</button>
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

export default ServiceOption;
