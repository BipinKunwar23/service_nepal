import React from "react";
import { useViewOrderDetailsByIdQuery } from "../../../Api/orderApi";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import Loader from "../../../components/Loader";
const viewDetail = () => {
  const { orderId } = useParams();
  const { data, isLoading } = useViewOrderDetailsByIdQuery(orderId);
  const navigate=useNavigate();
  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className=" bg-slate-600">
      <section className="w-[80Vw]  shadow bg-white text-slate-600 shadow-gray-700 p-10 mx-auto rounded-md ">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <p>
              <strong>{data?.order.id}</strong>
            </p>
            <p className="text-center  text-lg">
              <strong className="  ">
                {data?.order?.service_name}
              </strong>
            
            </p>
          
            <p>
              <strong>Date: {data?.order.created}</strong>
            </p>
          </div>

          <p className="text-center mb-5">
            <strong>On : {data?.order.date}</strong>{" "}
            <span className="ml-3 text-orange-600">
              {data?.order.emergency ? "Emergency" : data?.order.delay}
            </span>
            <span className="ml-5">
                {
                    data?.order?.status
                }
              </span>
          </p>
        </div>
        <section className="w-[80%] mx-auto ">
          <div className="flex flex-col gap-4 mb-5 ">
            <p className="flex flex-col">
              <strong> Descripton</strong> {data?.order.service}
            </p>
            <p className="flex flex-col">
              <strong> Work Load</strong> {data?.order.size}
            </p>
          </div>
          <div className="mb-4">
            <p className="mb-3 font-bold">Ordered Services</p>
            <table cellPadding={4} className=" w-full border-2 border-gray-400">
              <thead>
                <tr className="border border-gray-500">
                  <th className="border border-gray-400">S.N</th>
                  <th className="border border-gray-400">Service</th>
                  <th className="border border-gray-400">Price</th>
                  <th className="border border-gray-400">Unit</th>
                </tr>
              </thead>
              <tbody>
                {data?.scopes.map((scope, index) => {
                  return (
                    <tr
                      className="text-center border border-gray-400"
                      key={scope.id}
                    >
                      <td className="border border-gray-400">{index + 1}</td>
                      <td className="border border-gray-400">{scope?.name}</td>
                      <td className="border border-gray-400">
                        {" "}
                        {scope?.price}
                      </td>
                      <td className="border border-gray-400">{scope?.unit}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="font-bold mb-1">Files or Images</p>
          <div className="grid grid-cols-2 gap-5 mb-5 ">
            {data?.order?.images.map((image) => {
              return (
                <img
                  src={image.url}
                  alt=""
                  key={image.id}
                  className="w-full h-[200px] object-cover my-2  box-border"
                />
              );
            })}
          </div>
        </section>

        <div className="flex justify-around p-3 mb-5">
          <p>
            <strong>Order By :</strong>{" "}
            <span className="ml-2">{data?.order.name}</span>
          </p>
          <p>
            <strong>Email :</strong>{" "}
            <span className="ml-2">{data?.order.email}</span>
          </p>
          <p>
            <strong>Contact No :</strong>{" "}
            <span className="ml-2">{data?.order.number}</span>
          </p>
        </div>
        <div>
          <p className="text-center mb-5">
            <strong>Location :</strong>{" "}
            <span className="ml-3">{data?.order.location}</span>
          </p>
        </div>
        <div className="mb-5">
          <p className="text-center">
            Need Response back with in <strong> {data?.order.response}</strong>
          </p>
        </div>
        <div className="">
          <button className="bg-green-700 p-2 px-4 mx-auto  block rounded-full text-white"
          onClick={()=>{
            navigate('agreement')
          }}
          >
            Get Started
          </button>
        </div>
      </section>
        <Outlet/>
    </section>
  );
};

export default viewDetail;
