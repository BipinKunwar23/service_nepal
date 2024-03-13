import React, { useEffect, useRef, useState } from "react";
import { useGetServiceDetailsByIdQuery } from "../../../api/buyer/serviceApi";
import { useGetServiceStandardQuery } from "../../../api/seller/serviceApi";
import Loader from "../../../components/Loader";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ServiceDetail from "../../../components/service/serviceDetail";
import SellerProfile from "../../../components/service/profile";
import ServiceCategory from "../../../components/service/category";
import Service from "../../../components/service/service";
import PricePackage from "../../../components/service/package";
import ServiceFaqs from "../../../components/service/faq";
import { useDispatch, useSelector } from "react-redux";
import User from "../../../components/service/user";
import OrderGateWay from "../../../components/service/order";
import BuyerReview from "../review/review";
import OrderForm from "../order/orderForm";
import { Chat } from "../../../components/chat/chat";
import { setChat } from "../../../redux/buyerSlice";
const BuyerService = () => {
  const chat = useSelector((state) => state.buyerSlice.chat);
  const continues = useSelector((state) => state.buyerSlice.continue);

  const packageName = useSelector((state) => state.sellerSlice.packageName);
  const location = useLocation();
  console.log("location", location);

  const seller = useRef(null);
  const dispatch=useDispatch()

  const navigate = useNavigate();
  const { serviceId, optionId } = useParams();

  const { data: services, isLoading } =
    useGetServiceDetailsByIdQuery(serviceId);
  const { data: standards, isLoading: isStandards } =
    useGetServiceStandardQuery(optionId);

  useEffect(() => {
    if (continues) {
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

  console.log("services", services);
  if (isLoading || isStandards) {
    return <Loader />;
  }

  return (
    <>
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
              <User user={services?.user} />
            </section>
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
      <div
        className={` top-0 w-full bg-[rgba(0,0,0,0.8)] h-screen justify-items-end  absolute z-10  py-1 ${
          continues ? "grid" : "hidden"
        }`}
      >
        <OrderForm
          packages={  services?.packages?.find((pckg)=>pckg?.package===packageName)}
          serviceId={services?.id}
          standards={standards}
        />
      </div>
      <div
        className={` top-[8Vh] left-10    justify-items-end  fixed z-10   ${
          chat ? "grid" : "hidden"
        }`}
      >
        <div className="w-[40Vw] mx-auto bg-white border border-gray-300 shadow my-4 grid  rounded-lg">
          <Chat setChat={setChat} receiverId={services?.user?.id}>
            <div className="">
              <button
                className="text-xl text-gray-400 "
                onClick={() => {
                  dispatch(
                    setChat(false)
                  )
                }}
              >
                {" "}
                X
              </button>
            </div>
          </Chat>
        </div>
      </div>

      
    </>

  );
};

export default BuyerService;
