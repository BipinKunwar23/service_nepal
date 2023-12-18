import React, { useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useViewProviderServiceDetailsByIdQuery } from "../../../Api/providerApi";
import Loader from "../../../components/Loader";
import Order from "../order/makeOrder";
const ViewService = () => {
  const { providerId, serviceId } = useParams();
  const { data, isLoading, isSuccess } = useViewProviderServiceDetailsByIdQuery(
    { providerId, serviceId }
  );
  console.log("data", data);
  const [additonal, setAdditonal] = useState({
    other: false,
    experience: false,
    training: false,
    project: false,
  });

  const navigate=useNavigate();
  // const {pivot}=services;
  // console.log('pivot',pivot);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="bg-[#D6FFFF]">
      <section className="p-10  ">
        <div className="flex flex-col gap-8">
          <div className="">
            <h2 className="text-2xl text-slate-600 font-bold">
              {data?.services?.name}
            </h2>
        
          </div>
          <p>{data?.services?.pivot?.description}</p>

          <div className="grid grid-cols-2 auto-rows-min gap-5">
            {data?.services?.images.map((image, index) => {
              return (
                <img
                  src={image.url}
                  alt=""
                  className="h-[250px] w-full object-cover shadow shadow-gray-700 rounded-md"
                  key={index}
                />
              );
            })}
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

        </div>
        <div>
          <div className="mt-5">
            <ul className="flex gap-5 mb-3">
              <li>
                <strong>Days:</strong>
              </li>
              {data?.services?.pivot?.days.map((day) => {
                return <li key={day}>{day}</li>;
              })}
            </ul>

            <ul className="flex gap-4 mb-3">
              <li>
                <strong>Time:</strong>
              </li>
              <li>{data?.services?.pivot?.time?.start} AM</li>
              <li>-</li>
              <li>{data?.services?.pivot?.time?.end} PM</li>
            </ul>
            <ul className="flex gap-4 mb-3">
              <li>
                <strong>Cities:</strong>
              </li>
              {data?.services?.pivot?.cities.map((city) => {
                return <li key={city.city}>{city.city}</li>;
              })}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className="cursor-pointer mb-2 "
                onClick={() => {
                  setAdditonal({
                    ...additonal,
                    experience: !additonal?.experience,
                  });
                }}
              >
                Experience
              </h2>
              {additonal?.experience && (
                <>
                  <p className="mb-3">{data?.services?.pivot?.expereince}</p>
                  <img
                    src={`http://localhost:8000/${data?.services?.pivot?.expereince_certificate}`}
                    alt=""
                    className="w-1/2 max-h-[200px] object-cover"
                  />
                  
                </>
              )}
            </div>
            <div>
              <h2
                className="cursor-pointer mb-2"
                onClick={() => {
                  setAdditonal({
                    ...additonal,
                    training: !additonal?.training,
                  });
                }}
              >
                Trainings
              </h2>
              {additonal?.training && (
                <>
                  <p className="mb-3">{data?.services?.pivot?.trainings}</p>
                  <img
                    src={`http://localhost:8000/${data?.services?.pivot?.training_certificate}`}
                    alt=""
                    className="w-1/2 max-h-[200px] object-cover"
                  />
                </>
              )}
            </div>
            <div>
              <h2 className="cursor-pointer mb-2" onClick={()=>{
                setAdditonal({...additonal,project:!additonal?.project})
              }}>Projects</h2>
              {additonal?.project && (
                <>
                  <p className="mb-3">{data?.services?.pivot?.projects}</p>
                  <img
                    src={`http://localhost:8000/${data?.services?.pivot?.project_certificate}`}
                    alt=""
                    className="w-1/2 max-h-[200px] object-cover"
                  />
                </>
              )}
            </div>

            <div className="mb-5">
              <h2 className="cursor-pointer mb-2" onClick={()=>{
                setAdditonal({...additonal,other:!additonal?.other})
              }}>Others</h2>
              {additonal?.project && (
                <>
                  <p>{data?.services?.pivot?.additonal_info}</p>
                 
                </>
              )}
            </div>
          </div>
        </div>
      <div className="flex justify-center">
              <button className="bg-orange-600 text-white rounded-lg p-2 px-4 "
              onClick={()=>{
                navigate('order')
              }}
              >
                Place An Order
              </button>
            </div>
      </section>
      <section className="">
       <Outlet/>
      </section>
    </section>
  );
};

export default ViewService;
