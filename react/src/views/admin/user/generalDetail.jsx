import React from "react";

import { useNavigate, useParams } from "react-router-dom";
import SellerProfile from "../../../components/service/profile";
import ServiceCategory from "../../../components/service/category";
import Service from "../../../components/service/service";
import PricePackage from "../../../components/service/package";
import ServiceFaqs from "../../../components/service/faq";
import OrderGateWay from "../../../components/service/order";
import BuyerReview from "../../buyer/review/review";
import User from "../../../components/service/user";
const GeneralServiceDetail = ({ data }) => {
  console.log("hello");
  const { serviceId, optionId } = useParams();

  const navigate = useNavigate();

  return (
    <section className="">
     
     
      <section className="  bg-white   mx-auto shadow p-4  w-[70Vw]  ">
        <div className=" text-[1.1em] text-gray-500">
          <ServiceCategory
            category={data?.services?.service?.subcategory?.category}
            subcategory={data?.services?.service?.subcategory}
            service={data?.services?.service}
          />
        </div>
        <section className="flex gap-3">
          <section className="w-full">
            <div className="my-4">
              <SellerProfile photo={data?.services?.description?.image}  name={data?.services?.user?.profile?.name}/>
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
      
        </section>
       
      </section>
    </section>
  );
};

export default GeneralServiceDetail;
