import React, { useState } from "react";

import {
  useGetServiceStandardQuery,
  useSaveServiceMutation,
} from "../../../../api/seller/serviceApi";
import Loader from "../../../../components/Loader";

import { useNavigate, useParams } from "react-router-dom";
import SellerProfile from "../../../../components/service/profile";
import ServiceCategory from "./../../../../components/service/category";
import Service from "../../../../components/service/service";
import PricePackage from "../../../../components/service/package";
import ServiceFaqs from "../../../../components/service/faq";
import ServiceTerms from "../../../../components/service/terms";
const PrviewService = ({ services }) => {
  const navigate = useNavigate();
  const { data: standards, isLoading } = useGetServiceStandardQuery(
    services?.option_id
  );

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

  if (isLoading || isSaving) {
    return <Loader />;
  }

  return (
    <section className="text-[1.1em]  bg-white  p-8 ">
      <SellerProfile />
      <ServiceCategory
        category={services?.category}
        subcategory={services?.subcategory}
        service={services?.service}
        option={services?.option}
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
            standards={standards}
            service_packages={services?.packages}
          />
        </section>
        <section className="mt-4">
          <ServiceFaqs faqs={services?.faqs} />
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
