import React from 'react'
import { useViewServiceCardsQuery } from "../../../../api/seller/serviceApi";
import { createSearchParams, useNavigate } from 'react-router-dom';
const ServiceCards = ({ active }) => {
    const { data: services=[], isLoading } = useViewServiceCardsQuery();
    console.log("services", services);
    const navigate=useNavigate();
    const name=localStorage.getItem('name');
    if (isLoading) {
      return;
    }
   

    return (
      <div className="grid grid-cols-2 gap-14 text-lg mt-12  ">
        {services.length>0 && ( active ? services.filter((service)=>service?.status!=="draft") : services.filter((service)=>service?.status==="draft") ).map((service) => {
          return (
            
            <div
              className="  flex flex-col gap-2 rounded-md text-[0.9em] bg-white border-gray-400 cursor-pointer  "
              key={service?.id}
              onClick={() => {
              
                navigate(`/user/${name}/seller/service/${service?.id}`)

              }}
            >
              <div>
               
                  <img
                  src={`http://localhost:8000/${service?.description.image}`}
                  alt=""
                  className="w-full h-[160px] rounded-md "
                />
              </div>
              <div className='p-2 space-y-2 flex-1 flex flex-col'>
              <div className=" ">
                <p className="  text-gray-600 font-semibold ">
                  {service?.title}
                </p>
              </div>
             

              <div className="grid  content-end justify-end flex-1">
                <p className="text-gray-500 ">
                  <span className='text-[0.8em] mr-2'>STARTING AT</span> <span className='font-semibold text-gray-800' >RS {service?.description?.price}</span>
                </p>
              </div>

              </div>
            </div>
          );
        })}
        <div className="grid place-content-center border border-gray-400 rounded-md p-10 bg-white">
          <button
            className="bg-gray-800 text-white w-[100px] h-[100px] mx-auto mb-3 text-[2em] font-bold rounded-full"
            onClick={() => {
              navigate({
                pathname:`/user/${name}/seller/service/new`,
              
              });

            }}
          >
            {" "}
            +
          </button>
          <p className="text-center text-gray-400 ">
            Create new service
          </p>
        </div>
      </div>
    );
  };

  export default ServiceCards