import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetOptionsByServiceQuery } from "../../../../api/admin/optionApi";
import Select from "react-select";
import AddServiceOption from "./addOpiton";
const ServiceOption = () => {
  const [category, setCategory] = useState();
  const [subcategory, setSubcategory] = useState();
  const { serviceId } = useParams();
  const location = useLocation();
  const [addItem, setAddItem] = useState(false);

  const {
    data: services,
    isError: serviceIsError,
    isLoading: serviceLoading,
    error: serviceError,
  } = useGetOptionsByServiceQuery(serviceId);

  console.log("services", services);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  if (serviceLoading) {
    return <div>loading...</div>;
  }

  return (
    <section className="p-4  ">
      <div className="flex justify-between my-8 gap-10">
        <div>
          <input
            type="search"
            className="border border-blue-400 p-2 rounded w-full "
            placeholder="Search Services"
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
              New  Service Options
            </button>
          </div>
        )}
      </div>
      {addItem && <AddServiceOption setAddItem={setAddItem} />}
      <table className="w-full box-border table-auto bg-white border  border-gray-200  ">
        <thead>
          <tr className="text-left  bg-red-800 text-white ">
            <th className="py-4 px-4 border-b">Id</th>

            <th className="py-2 px-4 border-b">Service Options</th>
            <th className="py-2 px-4 border-b">Keywords</th>


            <th className="py-2 px-4 border-b">Created At</th>

            <th className="py-2 px-4 border-b"> Actions</th>
          </tr>
        </thead>
        <tbody className=" ">
          {services.map((item) => {
            return (
              <tr key={item?.id} className="even:bg-gray-200 odd:bg-gray-400">
                <td className="p-4 ">{item?.id}</td>

                <td className="p-4    ">{item?.name}</td>
                <td className="p-4    ">{item?.keywords}</td>


                <td className="p-4   max-w-md overflow-ellipsis    ">
                  {item?.created_at}
                </td>

                <td className="p-4 space-x-4">
                  <button className=" text-indigo-600"
                  onClick={()=>{
                    navigate(`option/${item?.id}`)
                  }}
                  >View</button>

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

export default ServiceOption;
