import React from 'react'
import { useViewServiceCardsQuery } from "../../../../api/seller/serviceApi";
import { createSearchParams, useNavigate } from 'react-router-dom';
const ServiceCards = ({ active }) => {
    const { data: services, isLoading } = useViewServiceCardsQuery();
    console.log("services", services);
    const navigate=useNavigate();
    const name=localStorage.getItem('name');
    if (isLoading) {
      return;
    }
   

    return (
      <div className="grid grid-cols-2 gap-10">
        {services.length>0 && services.filter((service)=>service?.active===active).map((service) => {
          return (
            
            <div
              className="  flex flex-col gap-2 rounded-md  bg-white border border-gray-400 cursor-pointer  "
              key={service?.id}
              onClick={() => {
                navigate(`/user/${name}/seller/service/${service?.id}/option/${service?.option_id}`);
              }}
            >
              <div>
                <img
                  src={`http://localhost:8000/${service?.galleries[0]?.image}`}
                  alt=""
                  className="w-full h-[210px] rounded-md "
                />
              </div>
              <div className="p-2 ">
                <p className="text-[1.1em] text-gray-600 line-clamp-2">
                  {service?.title}
                </p>
              </div>

              <div className="p-2">
                <p className="text-gray-700">
                  <strong>From</strong>: Rs 100
                </p>
              </div>
            </div>
          );
        })}
        <div className="h-[340px] grid place-content-center border border-gray-400 rounded-md p-10 bg-white">
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
          <p className="text-center text-gray-400 font-lg">
            Create new service
          </p>
        </div>
      </div>
    );
  };

  export default ServiceCards