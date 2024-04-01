import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import SellerProfile from "./profile";
import ServiceCategory from "./category";
const SpecificServiceDetail = ({ services,children }) => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  console.log("services", services);

  return (
    <section className="">
      
      
      {/* <SellerProfile /> */}
   
      <section className="grid grid-cols-3 gap-8  mx-auto p-20 my-8 box-border border ">
        <div className=" col-span-2">
          <img
            src={`http://localhost:8000/${services?.description?.image}`}
            className="object-cover object-center w-full min-h-[400px] h-full"
            alt=""
          />
        </div>
        <div className="space-y-3">
          <h2 className="font-semibold text-2xl">{services?.title}</h2>
          <p className="text-gray-600 ">{services?.description?.description}</p>
          <p className="text-gray-600 text-xl">
            {" "}
            <span className="text-black mr-3">NPR</span>
            {services?.description?.price}
          </p>
          <div>
            {children}
          </div>
          <div>
            <p className="mt-4 font-semibold text-xl">
              {services?.description?.note}
            </p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default SpecificServiceDetail;
