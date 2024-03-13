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
  const [isButton,setButton]=useState()
  const [deleteService,{isLoading:isDeleting}]=useDeleteServicesMutation()

  const DeletingService=async(id)=>{
    await deleteService(id);
  }

  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className=" w-full p-4  bg-gray-100 ">
      
        <div className="w-full  ">
          <div>
            <h2 className="my-4 text-4xl font-thin text-gray-500">Services</h2>
          </div>
          <div className="my-4">
            <ul className="flex gap-14 text-gray-400 ">
              <li>
                <button>ACTIVE</button>
              </li>
              <li>
                <button>PENDING APPROVAL</button>
              </li>
              <li>
                <button>REQUIRE MODIFICATION</button>
              </li>
              <li>
                <button>DRAFT</button>
              </li>
              <li>
                <button>DENIED</button>
              </li>
              <li>
                <button>PAUSED</button>
              </li>
            </ul>
          </div>
          <table className="w-full box-border table-auto  bg-white text-gray-500 text-[0.9em] ">
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
              <tr className="text-left font-semibold  border-b text-gray-400 ">
           
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
              {services?.map((service) => {
                return (
                  <tr key={service?.id} className="text-left border-b text-gray-600"
                 
                  >
                    <td className="py-3 px-2">
                      <input type="checkbox" />
                    </td>

                    <td className=" w-[420px]  font-semibold">{service?.name}</td>

                    <td className="   w-[150px] ">0</td>
                    <td className="   ">0</td>
                    <td className=" ">{service?.orders}</td>
                    <td>0</td>

                    <td className="text-center  w-[100px] relative ">
                      {
                        !isButton ?
                      <button className=" text-xl"
                      onClick={()=>{
                        setButton(!isButton)
                      }}
                      >
                        <i>
                          <IoIosArrowDropup/>
                        </i>
                      </button> :
                      <ul className="text-left bg-white border rounded p-3 space-y-2 absolute top-5">
                        <li
                        onClick={()=>{
                          navigate(`/user/${localStorage.getItem('name')}/seller/service/edit/${service?.id}`)
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
    </section>
  );
};

export default ServiceSummary;
