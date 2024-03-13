import React, { useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useViewProviderServiceDetailsByIdQuery } from "../../../Api/providerApi";
import Loader from "../../../components/Loader";
import Order from "../order/makeOrder";
import {useForm} from 'react-hook-form'
import { useDispatch, useSelector } from "react-redux";
import { setAvailableDate } from "../../../redux/buyerSlice";
const ViewService = () => {
  const { providerId, serviceId ,categoryId} = useParams();
  const { data, isLoading, isSuccess } = useViewProviderServiceDetailsByIdQuery(
    { providerId, serviceId }
  );
  const available_date=useSelector((state)=>state.buyerSlice.available_date);
  console.log("date", available_date);
  const [additonal, setAdditonal] = useState({
    other: false,
    experience: false,
    training: false,
    project: false,
  });

  const navigate = useNavigate();
  // const {pivot}=services;
  // console.log('pivot',pivot);
  const dispatch=useDispatch();

  const {register,handleSubmit}=useForm()
  const onSubmit=(values)=>{
    if(values?.service_date>available_date){
      dispatch(setAvailableDate(values?.service_date))
      navigate('order')

    }
    else {
     navigate(`/provider/${providerId}/category/${categoryId}/service/${serviceId}` , {replace:true})
    }
  }
  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="bg-[#CDF4F3] rounded-lg shadow-lg shadow-gray-300 ">
      <section className="p-10  ">
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="flex  overflow-x-auto ">
              {data?.services?.images.map((image, index) => {
                return (
                  <img
                    src={image.url}
                    alt=""
                    className="h-[200px] w-full object-cover shadow shadow-gray-700 rounded-md"
                    key={index}
                  />
                );
              })}
            </div>
            <div>
              <div className="">
                <h2 className="text-2xl text-red-600 font-bold mb-5">
                  {data?.services?.name}
                </h2>
              </div>
              <p className="text-slate-600">{data?.services?.pivot?.description}</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="mb-3 font-bold">Featured Services</p>
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
                      className="text-center border border-gray-400 text-blue-600"
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
        </div>
        <div>
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="cursor-pointer mb-2 font-bold ">Additional Information</h2>
              <p className="mb-3 text-blue-600">{data?.services?.pivot?.additional_info}</p>
            </div>
            <div>
              <h2 className="cursor-pointer mb-2 font-bold  ">Refund Policy</h2>
              <p className="mb-3 text-blue-600">{data?.services?.pivot?.refund_policy}</p>
            </div>{" "}
            <div>
              <h2 className="cursor-pointer mb-2 font-bold ">Terms and Conditons</h2>
              <p className="mb-3 text-blue-600 ">{data?.services?.pivot?.terms}</p>
            </div>
          </div>
        </div>
        <form className="border border-gray-400 box-border grid grid-cols-3 gap-5 w-[60Vw] mx-auto my-5 bg-gray-600 rounded-md shadow"
        onSubmit={handleSubmit(onSubmit)}
        >
          <div className="col-span-2 p-6 border-r border-gray-700 flex flex-col gap-4">
            <label htmlFor="" className="text-white font-semibold">Serivce Required Date</label>
            <input
              type="date"
              className="p-2 rounded-lg border border-blue-500 focus:outline-none w-full"
              {...register('service_date')}
            />
          </div>
          <div className="grid content-end p-5">
            <button className="bg-orange-600 text-white rounded-lg p-2 px-4 w-full " type="submit">
              Check Availability
            </button>
          </div>
        </form>
     
      </section>
      <section className="">
        <Outlet />
      </section>
    </section>
  );
};

export default ViewService;
