import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {useGetStandardByServiceIdQuery} from "../../../../api/admin/standardApi"
import Select from "react-select";
import AddService from "./AddStandard";
import EditStandard from "./eidtStandard";

const ServiceStandards = () => {
  const [category, setCategory] = useState();
  const [subcategory, setSubcategory] = useState();
  const { optionId } = useParams();
  const location = useLocation();
  const [addItem, setAddItem] = useState(false);
  const [editItem, setEditItem] = useState(false);
  const [standard, setStandard] = useState()
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
  } = useGetStandardByServiceIdQuery(optionId);

  console.log("services", services);

  const navigate = useNavigate();

  const dispatch = useDispatch();

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
        <EditStandard standard={standard} setEdit={setEditItem} />
      </div>
      </div>

    )}
    <section className="p-4  ">
      <div>
        <h2 className="text-slate-600 text-xl font-semibold">Service-Standards Management</h2>
      </div>
      <div className="flex justify-between mt-8 gap-10">
        <div>
          <input
            type="search"
            className="border-2 border-blue-400 p-2 rounded w-full "
            placeholder="Search Standards"
          />
        </div>
        {!addItem && (
          <div>
            <button
              type="button"
              className="p-2 w-[200px] rounded  bg-green-600 text-white mb-5"
              onClick={() => {
                setAddItem(true);
              }}
            >
              New Standards
            </button>
          </div>
        )}
      </div>
      {addItem && (
        <div className="border-2 border-blue-200 p-3 my-4 ">
          <div className="flex justify-end">
            <button className="text-blue-600 text-xl"
            onClick={()=>{setAddItem(false)}}
            >X</button>
          </div>
          <AddService setAddItem={setAddItem} />
        </div>
      )}
      <table className="w-full box-border table-auto bg-white border  border-gray-200  ">
        <thead>
          <tr className="text-left  bg-slate-100 ">

            <th className="p-3">Standard Term</th>


            <th className="p-3"> Actions</th>
          </tr>
        </thead>
        <tbody className=" ">
          {services?.map((item) => {
            return (
              <tr key={item?.id} className="even:bg-slate-100">

                <td className="p-3    ">{item?.name}</td>

              

                <td className="p-3 space-x-4">
                  <button className=" text-indigo-600"
                  onClick={()=>{
                    navigate(`standard/${item?.id}`)
                  }}
                  >View</button>

                  <button className=" text-indigo-600"
                  onClick={()=>{
                    setStandard(item)
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

export default ServiceStandards;
