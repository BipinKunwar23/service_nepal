import React from "react";
import { useViewServiceDetailsQuery } from "../../api/sellerApi";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import { useSelector } from "react-redux";

const Service = () => {
  const { serviceId } = useParams();
  const { data, isLoading } = useViewServiceDetailsQuery(serviceId);
  const serviceName=useSelector((state)=>state.serviceSlice.service);
  console.log("service", serviceName);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="text-[1.2em] text-gray-600 bg-gray-200 py-10 ">
      <h2>{serviceName}</h2>
      <div className="bg-white w-[90Vw] mx-auto p-10 flex flex-col gap-6 ">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <img
              src={`http://localhost:8000/${data?.user?.profile?.photo}`}
              className="w-[90px] h-[90px] rounded-full"
              alt=""
            />
            <h2 className="font-semibold text-[1.3em] text-gray-800 place-self-center">
              {data?.user?.name}
            </h2>
          </div>
          <div className="grid content-center">
            <button className="bg-blue-600 text-white p-2 px-4 rounded-sm">
              Edit Service
            </button>
          </div>
        </div>
        <ul className="flex gap-4 ">
          <li>
            {data?.category?.name} <span className="ml-2 "> {">"}</span>
          </li>
          <li>
            {data?.subcategory?.name} <span className="ml-2 "> {">"}</span>
          </li>

          <li>{data?.service?.name}</li>
        </ul>
        <div>
          <p className="text-[1.4em] font-semibold text-slate-600">
            {data?.title}
          </p>
        </div>
        <div className="flex gap-10 ">
          <div className=" w-[60%]  ">
            <div className="mb-3">

            {data?.galleries?.map((gallery) => {
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
              <div>
                <ul className="flex gap-5">
                  <li>
                    <strong>Service Types :</strong>
                  </li>
                  <li>{data?.scope?.name}</li>
                </ul>
              </div>

              <div>
                <h2 className="font-semibold">About Services</h2>
                <p>{data?.description}</p>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-gray-100 p-5 box-border flex flex-col gap-8">
            <ul className="grid grid-cols-3 gap-5 bg-gray-700  text-white  text-center">
              <li className=" border-r p-3 border-green-300">
                <button>Basic</button>
              </li>
              <li className="border-r p-3 border-green-300">
                <button className="">Standard</button>
              </li>
              <li className="border-r p-3 ">
                <button>Premium</button>
              </li>
            </ul>
            <div>
              <p className=" font-semibold mb-3">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis
              </p>
              <p className="text-slate-400">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Placeat, possimus architecto illo dignissimos ut minima ullam id
              </p>
              <div className="mt-3">
                <strong className="">$ 300</strong>
              </div>
            </div>
            <ul className="flex flex-col gap-3">
              <li className="font-semibold text-xl">Features / Services</li>
              <li>This is feature1</li>
              <li>This is feature2</li>
              <li>This is feature3</li>
              <li>This is feature 4</li>
            </ul>
            <div className="grid grid-cols-2 gap-5">
              <input
                type="number"
                className="border border-gray-400 p-2 "
                placeholder="No of items"
              />
              <button className="bg-blue-600 p-2 text-white ">Order Now</button>
            </div>
            <div>
              <button className="bg-green-600 text-white p-2 w-full">
                Contact Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;
