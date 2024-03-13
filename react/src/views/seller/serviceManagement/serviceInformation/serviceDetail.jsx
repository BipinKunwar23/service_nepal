import React from "react";
import {
  useGetServiceStandardQuery,
  useViewServiceDetailsQuery,
} from "../../../../api/seller/serviceApi";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../../components/Loader";
import SellerProfile from "../../../../components/service/profile";
import ServiceCategory from "./../../../../components/service/category";
import Service from "../../../../components/service/service";
import PricePackage from "../../../../components/service/package";
import ServiceFaqs from "../../../../components/service/faq";
import ServiceTerms from "../../../../components/service/terms";
import OrderGateWay from "../../../../components/service/order";
import BuyerReview from "../../../buyer/review/review";
import User from "../../../../components/service/user";
const SellerServiceDetail = () => {
  const { serviceId, optionId } = useParams();
  const { data: standards, isLoading: isStandards } =
    useGetServiceStandardQuery(optionId);
  const { data: services, isLoading } = useViewServiceDetailsQuery(serviceId);
  const navigate=useNavigate()
  if (isStandards || isLoading) {
    return <Loader />;
  }
  return (
    <section className="">
     <div className="p-6">
        <button className="text-green-600 font-semibold text-3xl"
        onClick={()=>{
          navigate(`/user/${localStorage.getItem('name')}/seller/dashboard`,{replace:true})
        }}
        >Technician</button>
      </div>
      <div className="grid justify-end px-4 mx-auto">
        <button className="bg-green-600 text-white p-2 rounded w-[200px] font-semibold text-lg"
        onClick={()=>{
          navigate(`/user/${localStorage.getItem('name')}/seller/service/edit/${serviceId}`)
        }}
        >Edit Service</button>
      </div>
      <section className="text-[1.1em]  bg-white   mx-auto  p-8 ">
      <div className=" text-[1.1em] text-gray-500">
        <ServiceCategory
          category={services?.category}
          subcategory={services?.subcategory}
          service={services?.service}
          option={services?.option}
        />
      </div>
      <section className="flex gap-3">
        <section className="w-[65%]">
          <div className="mb-8">
            <SellerProfile user={services?.user} />
          </div>

          <div className="">
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
          </div>
        </section>
        <section className="flex-1">
          <OrderGateWay packages={services?.packages} standards={standards} />
        </section>
      </section>
      <section>
        <BuyerReview />
      </section>
    </section>
   
    </section>

  );
};

export default SellerServiceDetail;
