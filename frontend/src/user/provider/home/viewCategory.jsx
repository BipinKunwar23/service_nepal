import React, { useState } from "react";

import JoinCategory from "./join-category/join";
import { useParams } from "react-router-dom";
import { useGetSubcatgoryAllDetailsQuery } from "../../../Api/subCategoryApi";
import { useGetJoinedCategoryQuery } from "../../../Api/providerApi";
import Loader from "../../../components/Loader";
import SeviceSetup from "../setup/home";
const ViewCategory = ({ subcategory }) => {
  const [join, setJoin] = useState(false);
  const providerId = localStorage.getItem("userId");

  const { categoryId } = useParams();

  const { data, isLoading } = useGetSubcatgoryAllDetailsQuery(categoryId);
  const { data:category, isLoading:iscategory } = useGetJoinedCategoryQuery({providerId,categoryId});
  console.log('join',category);


  const [joinScope,setJoinScope]=useState(null)
  if (isLoading || iscategory) {
    return <Loader />;
  }
  return (
    <section className="p-10 ">
      <section className="grid grid-cols-2 gap-5">
        <div className=" ">
          <img
            src={`http://localhost:8000/${data?.icons}`}
            className="h-[200px] w-full object-cover"
            alt="logo"
          />
        </div>
        <div className="flex flex-col">
          <h2 className=" text-lg text-slate-600 font-semibold mb-2 ">
            {data?.name}
          </h2>
          <p className="mb-2">{data?.description}</p>

        
        </div>

        
      </section>
      <section className="grid grid-cols-2 mt-3 gap-5">
      
        <section>
          <h2 className="text-left font-bold text-slate-600 my-2">
            Featuring Services
          </h2>
          <div className="grid gap-2 grid-cols-2">
            {data?.services.map((service) => {
              return (
                <div
                  key={service.id}
                  className={`flex flex-col gap-5 border border-slate-400 p-4 shadow rounded-lg hover:bg-[#CDF4F3] ${joinScope===service.id && 'bg-[#CDF4F3]'}  `}
                  onClick={()=>{
                    setJoinScope(service?.id)
                  }}
                >
                  <div className="flex gap-5">
                    <img
                      src={`http://localhost:8000/${service?.icons}`}
                      className="h-[50px] w-[50px] object-cover  rounded-full shadow"
                      alt=""
                    />
                    <div className="grid  place-content-center">
                      <h2 className="text-gray-800 font-bold">
                        {service?.name}
                      </h2>
                    </div>
                  </div>
                  <div>
                    <ul className="m-3 flex flex-col gap-3">
                      <li className="font-bold">Scopes</li>
                      {service?.scopes.map((scope) => {
                        return (
                          <li className="flex gap-4">
                            <span className="bg-blue-600 h-[10px] w-[10px] rounded-full"></span>
                            <span className=" block text-gray-600 font-bold">
                              {scope.name}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
     
        </section>
        {
          joinScope && category ? <SeviceSetup serviceId={joinScope}/> :
          <JoinCategory subcategoryId={data?.id} />

        }
      </section>
    </section>
  );
};

export default ViewCategory;
