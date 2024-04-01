import React from "react";
import BuyerNavbar from "../home/buyer-navbar";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useGetSavedServicesQuery } from "../../../api/buyer/savedApi";
import { FiAlignLeft } from "react-icons/fi";
import Loader from "../../../components/Loader";
export const List = () => {
  const { data: lists, isLoading } = useGetSavedServicesQuery();
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  if(isLoading){
    return <Loader/>
  }
  return (
    <>
      <section className=" p-8">
        <h2 className="text-3xl p-4 font-semibold">My Lists</h2>
        <div className="p-4 grid grid-cols-4 gap-8">
          {lists?.map((list) => {
            return (
              <div
                className="   flex flex-col gap-2 rounded-md    bg-white cursor-pointer  "
                key={list?.id}
                onClick={() => {
                  navigate({
                    pathname:`/user/${name}/list/${list?.id}`,
                    search:createSearchParams({name:list?.name}).toString()
                  });
                }}
              >
                <div className="relative">
                  <div>{
                    list?.first_service?.first_gallery_image ?
                    <img
                      src={`http://localhost:8000/${list?.first_service?.first_gallery_image}`}
                      alt=""
                      className="w-full h-[250px] rounded-md "
                    /> :
                    <div className="w-full h-[250px] rounded-md bg-[rgba(0,0,0,0.7)] " >

                    </div>
                    }

                  </div>

                  <div className="absolute top-0  grid place-content-end w-full h-full p-8">
                    <p className="text-gray-200 text-xl flex gap-2 bg-[rgba(0,0,0,0.8)] p-2 w-[80px] rounded">
                      <i className="grid place-content-center">
                        <FiAlignLeft />
                      </i>
                      {list?.service_count}
                    </p>
                  </div>
                </div>
                <div className="p-2 ">
                  <p className=" text-gray-800 font-semibold text-xl">
                    {list?.name}
                  </p>
                  <p className="text-gray-600">Private</p>
                </div>
              </div>
            );
          })}
          <div className=" space-y-4 ">
            <div className="grid  place-content-cente border border-gray-400 rounded-md p-4 h-[250px] bg-white">
            <button
              className="bg-gray-800 text-white w-[100px] h-[100px] mx-auto mb-3 text-[2em] font-bold rounded-full"
              onClick={() => {
                navigate({
                  pathname: `/user/${name}/seller/list/new`,
                });
              }}
            >
              {" "}
              +
            </button>

            </div>
            <div className="grid place-content-center "> 
            <p className="text-center text-gray-800 text-xl font-semibold ">Create new list</p>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};
