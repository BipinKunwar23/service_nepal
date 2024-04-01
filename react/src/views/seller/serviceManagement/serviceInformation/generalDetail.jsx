import React from "react";

import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../../components/Loader";
import SellerProfile from "../../../../components/service/profile";
import ServiceCategory from "../../../../components/service/category";
import Service from "../../../../components/service/service";
import PricePackage from "../../../../components/service/package";
import ServiceFaqs from "../../../../components/service/faq";
import ServiceTerms from "../../../../components/service/terms";
import OrderGateWay from "../../../../components/service/order";
import BuyerReview from "../../../buyer/review/review";
import User from "../../../../components/service/user";
const GeneralServiceDetail = ({ data }) => {
  console.log("hello");
  const { serviceId, optionId } = useParams();

  const navigate = useNavigate();

  return (
    <section className="">
      <div className="p-6">
        <button
          className="text-green-600 font-semibold text-3xl"
          onClick={() => {
            navigate(`/user/${localStorage.getItem("name")}/seller/dashboard`, {
              replace: true,
            });
          }}
        >
          Technician
        </button>
      </div>
      <div className="grid justify-end px-4 mx-auto">
        <button
          className="bg-green-600 text-white p-2 rounded w-[200px] font-semibold text-lg"
          onClick={() => {
            navigate(
              `/user/${localStorage.getItem(
                "name"
              )}/seller/service/edit/${serviceId}?type=general`
            );
          }}
        >
          Edit Service
        </button>
      </div>
      <section className="text-[1.1em]  bg-white   mx-auto  p-8 ">
        <div className=" text-[1.1em] text-gray-500">
          <ServiceCategory
            category={data?.services?.service?.subcategory?.category}
            subcategory={data?.services?.service?.subcategory}
            service={data?.services?.service}
          />
        </div>
        <section className="flex gap-3">
          <section className="w-[65%]">
            <div className="mb-8">
              <SellerProfile user={data?.services?.user} />
            </div>

            <div className="">
              <div className="flex flex-col gap-6 mb-5">
                <Service
                  galleries={data?.services?.galleries}
                  title={data?.services?.title}
                  description={data?.services?.description?.description}
                />
              </div>

              <section>
                <PricePackage
                  standards={data?.standards}
                  service_packages={data?.services?.packages}
                />
              </section>
              <section className="mt-4">
                <ServiceFaqs faqs={data?.services?.faqs} />
              </section>
            </div>
          </section>
          <section className="flex-1">
            <OrderGateWay
              packages={data?.services?.packages}
              standards={data?.standards}
            />
          </section>
        </section>
        <section>
          <BuyerReview />
        </section>
      </section>
    </section>
  );
};

export default GeneralServiceDetail;
