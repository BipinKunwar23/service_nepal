import React, { useState } from "react";
import { useViewServiceSummaryQuery } from "../../../../api/seller/serviceApi";
import { useNavigate } from "react-router-dom";
import Loader from "../../../../components/Loader";
import Sidebar from "../../home/sidebar";
import SellerNavbar from "../../home/seller-navbar";
import { IoIosArrowDropup } from "react-icons/io";
import { useDeleteServicesMutation } from "../../../../api/seller/serviceApi";

const ServiceSummary = () => {
  const {
    data: services,
    isLoading,
    isError,
    error,
  } = useViewServiceSummaryQuery();
  const navigate = useNavigate();
  console.log("services", services);
  const [isButton,setButton]=useState(null)
  const [deleteService,{isLoading:isDeleting}]=useDeleteServicesMutation()
  const [status,setStatus]=useState('active')

  const DeletingService=async(id)=>{
    await deleteService(id);
  }

  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className=" w-full   ">
      
        <div className="w-full  ">
          <div>
            <h2 className="font-semibold text-xl text-blue-600">Mange Services</h2>
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

          <table className="w-full box-border table-auto  bg-white text-gray-700 text-[0.9em] ">
            <thead>
              <tr className="border-b "
               onClick={()=>{
                setButton(false)
              }}
              >
                <th className="border-none" colSpan={7}>
                  ACTIVE SERVICES
                </th>
              </tr>
              <tr className="text-left font-semibold  border-b  ">
           
                <td className="p-3">
                  <input type="checkbox" />
                </td>
                <td>SERVICE</td>
                <td className="max-w-xs overflow-x-auto">IMPRESSIONS</td>
                <td>CLICKS</td>
                <td>ORDERS</td>
                <td>CANCELLATION</td>
              </tr>
            </thead>
            <tbody className="">
              {services?.filter((service) => service?.status === status)?.map((service) => {
                return (
                  <tr key={service?.id} className="text-left border-b text-gray-700"
                 
                  >
                    <td className="p-3">
                      <input type="checkbox" />
                    </td>

                    <td className=" w-[420px]  font-semibold">{service?.name}</td>

                    <td className="   w-[150px] ">0</td>
                    <td className="   ">0</td>
                    <td className=" ">{service?.orders}</td>
                    <td>0</td>

                    <td className="text-center  w-[100px] relative ">
                      <button className=" text-xl"
                      onClick={()=>{
                        isButton === service.id
                        ? setButton(null)
                        : setButton(service.id);
                      }}
                      >
                        <i>
                          <IoIosArrowDropup/>
                        </i>
                      </button> 
                      {
                        isButton===service?.id &&
                      <ul className="text-left bg-white border rounded p-3 space-y-2 absolute top-10 z-10 ">
                        <li
                        onClick={()=>{
                          navigate(`/user/${localStorage.getItem('name')}/seller/service/edit/${service?.id}?type=${service?.type}`)
                        }}
                        className="cursor-pointer"
                        >EDIT</li>
                        <li
                        className="cursor-pointer"
                        onClick={()=>{
                          DeletingService(service?.id)
                        }}
                        >DELETE</li>

                      </ul>


                      }

                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>

        </div>
    </section>
  );
};

export default ServiceSummary;
