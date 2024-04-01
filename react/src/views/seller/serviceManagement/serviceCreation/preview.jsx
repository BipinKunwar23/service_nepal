import React, { useState } from "react";

import {
useSaveServiceMutation
} from "../../../../api/seller/serviceApi";
import Loader from "../../../../components/Loader";

import { useNavigate, useParams } from "react-router-dom";
import SellerProfile from "../../../../components/service/profile";
import ServiceCategory from "./../../../../components/service/category";
import Service from "../../../../components/service/service";
import PricePackage from "../../../../components/service/package";

import ServiceTerms from "../../../../components/service/terms";
import { useSelector } from "react-redux";
const PrviewService = ({ services }) => {
  const navigate = useNavigate();

  const type = useSelector((state) => state.sellerSlice.type);

  const [setService, { isLoading: isSaving }] = useSaveServiceMutation();
  const { serviceId } = useParams();

  const saveService = async () => {
    await setService(serviceId)
      .unwrap()
      .then((response) => {
        if (response) {
          navigate(`/user/${localStorage.getItem("name")}/profile`, {
            replace: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (isSaving) {
    return <Loader />;
  }
  if (type === "specific") {
    return (
      <section>
        <SellerProfile />
        <section className="grid grid-cols-2 gap-4">
          <div className="">
            <img
              src={`http://localhost:8000/${services?.description?.image} `}
              className="object-cover object-center w-full min-h-[400px] h-full"
              alt=""
            />
          </div>
          <div className="space-y-3">
            <h2 className="font-semibold text-2xl">{services?.title}</h2>
            <p className="text-gray-600 ">
              {services?.description?.description}
            </p>
            <p className="text-gray-600 text-xl">
              {" "}
              <span className="text-black mr-3">NPR</span>
              {services?.description?.price}
            </p>
            <div>
              <p className="mt-4 font-semibold text-xl">
                {services?.description?.note}
              </p>
            </div>
            <div className=" mt-4">
              <button
                className="bg-green-600 text-white p-2 w-full rounded"
                onClick={saveService}
              >
                Review and Save
              </button>
            </div>
          </div>
        </section>
      </section>
    );
  }

  return (
    <section className="text-[1.1em]  bg-white  p-8 ">
      <SellerProfile />
      <ServiceCategory
        category={services?.service?.subcategory?.category}
        subcategory={services?.service?.subcategory}
        service={services?.service}
      />
      <section className="">
        <div className="flex flex-col gap-6 mb-5">
          <Service
            galleries={services?.galleries}
            title={services?.title}
            description={services?.description}
          />
        </div>
        <section>
          <PricePackage
            standards={services?.standards}
            service_packages={services?.packages}
          />
        </section>
      

        <section className="mt-4 space-y-6">
          <ServiceTerms requirements={services?.requirements} />
        </section>
      </section>
      <section className="grid place-content-center">
        <button
          className="bg-green-600 text-white p-2 w-[400px] rounded"
          onClick={saveService}
        >
          Review and Save
        </button>
      </section>
    </section>
  );
};

export default PrviewService;
