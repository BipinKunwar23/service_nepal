import React, { useState } from "react";
import { useGetAllServicesQuery } from "../../../api/admin/userApi";
import Loader from "./../../../components/Loader";
import { useLocation, useNavigate } from "react-router-dom";
const UserServices = () => {
  const { data, isLoading } = useGetAllServicesQuery();
  const navigate=useNavigate()
  const [isButton, setButton] = useState(null);
  const location=useLocation()
  const [status,setStatus]=useState('active')


  console.log("users", data);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="p-4 mt-6">
      <div>
        <h2 className="text-xl text-blue-600 font-semibold ">Manage Services</h2>
      </div>
      <div className="my-4  font-semibold">
            <ul className="flex gap-14 text-gray-700  text-[0.9em] font-semibold">
              <li>
                <button
                onClick={()=>{
                  setStatus("active")
                }}
                className={` p-2 ${
                  status === "active" &&
                  "border-b-2  border-green-700  font-semibold"
                } `}
                >
                  ACTIVE</button>
              </li>
              <li>
                <button
                 onClick={()=>{
                  setStatus("pending")
                }}
                className={` p-2 ${
                  status === "pending" &&
                  "border-b-2  border-green-700  font-semibold"
                } `}
                >PENDING APPROVAL</button>
              </li>
              <li>
                <button
                 onClick={()=>{
                  setStatus("modify")
                }}
                className={` p-2 ${
                  status === "modify" &&
                  "border-b-2  border-green-700  font-semibold"
                } `}
                >REQUIRE MODIFICATION</button>
              </li>
              <li>
                <button
                 onClick={()=>{
                  setStatus("draft")
                }}
                className={` p-2 ${
                  status === "draft" &&
                  "border-b-2  border-green-700  font-semibold"
                } `}
                >DRAFT</button>
              </li>
              <li>
                <button
                 onClick={()=>{
                  setStatus("denied")
                }}
                className={` p-2 ${
                  status === "denied" &&
                  "border-b-2  border-green-700  font-semibold"
                } `}
                >DENIED</button>
              </li>
              <li>
                <button
                 onClick={()=>{
                  setStatus("paused")
                }}
                className={` p-2 ${
                  status === "paused" &&
                  "border-b-2  border-green-700  font-semibold"
                } `}
                >PAUSED</button>
              </li>
            </ul>
          </div>
      <div>

      <table className="w-full box-border table-auto  bg-white text-gray-700 text-[1em] ">
        <thead>
          <tr
            className="border-b "
            onClick={() => {
              setButton(false);
            }}
          >
            <th className="border-none text-lg text-left font-semibold" colSpan={5}>
              {status?.toUpperCase()} SERVICES
            </th>
          </tr>
          <tr className="text-left font-semibold  border-b text-gray-700 ">
            <td className="p-2">
              <input type="checkbox" />
            </td>
            <td className="p-2">Service</td>
            <td className="p-2">Title</td>

            <td className="p-2">Seller</td>
          </tr>
        </thead>
        <tbody className="">
          {data?.filter(service=>service?.status===status)?.map((service) => {
            return (
              <tr
                key={service?.id}
                className="text-left border-b text-gray-500"
              >
                <td className="py-3 px-2">
                  <input type="checkbox" />
                </td>

                <td className=" w-[200px]  p-2">{service?.option?.name}</td>

                <td className="   w-[400px] overflow-ellipsis p-2 ">
                  {service?.title}
                </td>
                <td className=" w-30 p-2  ">{service?.user?.name}</td>

                <td className="  w-40  ">
                 <button className="font-semibold "
                 onClick={()=>{
                  navigate(`${service?.id}`, {state:{
                    path:location?.pathname
                  }})
                 }}
                 >view </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>

    </div>
  );
};

export default UserServices;
