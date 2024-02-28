import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import User from "./user";
import OrderForm from "../../views/buyer/order/orderForm";
import { Chat } from "../chat/chat";
import { setServiceDetails, setPackageName } from "../../redux/sellerSlice";
import { useDispatch, useSelector } from "react-redux";
const Service = ({ services }) => {
  const packageName = useSelector((state) => state.sellerSlice.packageName);
  const [packageData, setPackageData] = useState({});
  console.log("pacakges", packageData);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [continues, setContinue] = useState(false);
  const [chat, setChat] = useState(false);


  useEffect(() => {
    if (continues) {
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    }
    dispatch(setServiceDetails(services));

    setPackageData(
      services?.prices?.packages.find((item) => item.package === packageName)
    );

    // Clean up by restoring the original body style when the component unmounts
    return () => {
      document.body.style.position = "static";
    };
  }, [continues, packageName]);

  return (
    <>
      <section className="text-[1.2em]  bg-white px-10 py-5  ">
        <ul className="flex gap-4 my-5 ">
          <li>
            {services?.category?.name} <span className="ml-2 "> {">"}</span>
          </li>
          <li>
            {services?.subcategory?.name} <span className="ml-2 "> {">"}</span>
          </li>

          <li>{services?.service?.name}</li>
        </ul>
        <section className=" flex gap-10">
          <div className="flex w-[65%] flex-col gap-6 mb-5">
            <div>
              <p className="text-[1.4em] font-semibold text-slate-600">
                {services?.title}
              </p>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-4">
                <img
                  src={`http://localhost:8000/${services?.user?.profile?.photo}`}
                  className="w-[90px] h-[90px] rounded-full"
                  alt=""
                />
                <h2 className="font-semibold text-[1.3em] text-gray-800 place-self-center">
                  {services?.user?.name}
                </h2>
              </div>
            </div>
            <div className="flex gap-10 flex-col ">
              <div className="mb-3">
                {services?.galleries?.map((gallery) => {
                  return (
                    <div key={gallery?.id} className="flex-1">
                      <img
                        src={`http://localhost:8000/${gallery?.image}`}
                        alt=""
                        className="h-[400px] w-full object-cover object-left-top"
                      />
                    </div>
                  );
                })}
              </div>

              <div>
                <ul className="flex gap-5">
                  <li>
                    <strong>Service Types :</strong>
                  </li>
                  <li>{services?.scope?.name}</li>
                </ul>
              </div>

              <div>
                <h2 className="font-semibold">About Services</h2>
                <p>{services?.description}</p>
              </div>
            </div>

            <div>
              <User user={services?.user} />
            </div>
          </div>
          <section className="flex-1  ">
            <div className="  box-border ">
              <ul className="grid grid-cols-3    bg-white border border-gray-400  text-center">
                <li
                  className={` border-r border-gray-500 shadow  ${
                    packageName === "basic" && "bg-gray-700 text-white"
                  }`}
                >
                  <button
                    className=" p-3 w-full"
                    onClick={() => {
                      dispatch(setPackageName("basic"));
                    }}
                  >
                    Basic
                  </button>
                </li>
                <li
                  className={` border-r border-gray-500 shadow  ${
                    packageName === "standard" && "bg-gray-700 text-white"
                  }`}
                >
                  <button
                    className="w-full py-3 px-2"
                    onClick={() => {
                      dispatch(setPackageName("standard"));
                    }}
                  >
                    Standard
                  </button>
                </li>
                <li
                  className={`  ${
                    packageName === "premium" && "bg-gray-700 text-white"
                  }`}
                >
                  <button
                    className="p-3 w-full "
                    onClick={() => {
                      dispatch(setPackageName("premium"));
                    }}
                  >
                    Premium
                  </button>
                </li>
              </ul>
              <div className="shadow p-3 shadow-gray-300 flex flex-col gap-5">
                <div className="">
                  <div className="">
                    <div className="flex justify-between">
                      <p className=" font-semibold mb-3">
                        {packageData?.name?.toUpperCase()}
                      </p>
                      <p className="text-gray-500 text-xl">
                        Rs {packageData?.price}
                      </p>
                    </div>
                    <p className="text-slate-400">{packageData?.description}</p>
                    <div className="mt-3"></div>
                  </div>

                  <div>
                    <h2>Fearutes</h2>
                    <ol>
                      <li>Feature1</li>
                      <li>Feature1</li>
                      <li>Feature1</li>
                      <li>Feature1</li>
                      <li>Feature1</li>
                    </ol>
                  </div>
                </div>

                <div>
                  <button
                    className=" bg-gray-800 text-white  rounded-md mb-5 p-2 w-full"
                    onClick={() => {
                      setContinue(!continues);
                    }}
                  >
                    Continue
                  </button>
                  <button
                    className="border border-gray-400 rounded-md  p-2 w-full"
                    onClick={() => {
                      setChat(true)
                    }}
                  >
                    Contact Now
                  </button>
                </div>
              </div>
            </div>
          </section>
        </section>
      </section>

      <div
        className={` top-0 w-full bg-[rgba(0,0,0,0.7)] h-screen justify-items-end  absolute z-10 px-10 py-1 ${
          continues ? "grid" : "hidden"
        }`}
      >
        <OrderForm packages={packageData} setContinue={setContinue} />
      </div>

      <div
        className={` top-[10Vh] left-10 bg-[rgba(0,0,0,0.7)]  bg-white justify-items-end  fixed z-10   ${
          chat ? "grid" : "hidden"
        }`}
      >
        <Chat setChat={setChat} receiverId={services?.user?.id} />
      </div>
    </>
  );
};

export default Service;
