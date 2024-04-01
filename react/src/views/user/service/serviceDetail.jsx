import React, { useEffect } from "react";

import { useGetServiceDetailsByIdQuery } from "../../../api/public/serviceApi";
import Loader from "../../../components/Loader";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SellerProfile from "../../../components/service/profile";
import ServiceCategory from "../../../components/service/category";
import Service from "../../../components/service/service";
import PricePackage from "../../../components/service/package";
import ServiceFaqs from "../../../components/service/faq";
import { useDispatch, useSelector } from "react-redux";
import User from "../../../components/service/user";
import OrderGateWay from "../../../components/service/order";
import BuyerReview from "../../buyer/review/review";
import OrderForm from "../../buyer/order/orderForm";
import ServiceSkeleton from './../../../components/service/serviceSkeleton';

const UserServiceDetails = () => {
  const { serviceId, optionId } = useParams();
  console.log("serviceId", serviceId);

  const { data, isLoading } = useGetServiceDetailsByIdQuery({serviceId,optionId});
  const continues = useSelector((state) => state.buyerSlice.continue);
  const packageName = useSelector((state) => state.sellerSlice.packageName);



  useEffect(() => {
    if (continues ) {
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    }

    // Clean up by restoring the original body style when the component unmounts
    return () => {
      document.body.style.position = "static";
    };
  }, [continues]);

  const scrollToSeller = () => {
    if (seller.current) {
      seller.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  useEffect(() => {
    if (location.hash === "#seller") {
      scrollToSeller();
    }
  }, []);

  if (isLoading) {
    return <ServiceSkeleton />;
  }

  return (
    <>
      <section className="text-[1.1em]  bg-white   mx-auto  p-8 ">
        <div className=" text-[1.1em] text-gray-500 flex gap-3  mb-5">
          <div className="w-[65%]">
            <ServiceCategory
              category={data?.services?.category}
              subcategory={data?.services?.subcategory}
              service={data?.services?.service}
              option={data?.services?.option}
            />
          </div>
          <div className="relative flex-1 ml-2"></div>
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
                  description={data?.services?.description}
                />
              </div>
              <section>
                <User user={data?.services?.user} />
              </section>
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
      <div
        className={` top-0 w-full bg-[rgba(0,0,0,0.8)] h-screen justify-items-end  absolute z-10  py-1 ${
          continues ? "grid" : "hidden"
        }`}
      >
        <OrderForm
          packages={data?.services?.packages?.find(
            (pckg) => pckg?.package === packageName
          )}
          serviceId={data?.services?.id}
          standards={data?.standards}
        />
      </div>
    </>
  );
};

export default UserServiceDetails;
