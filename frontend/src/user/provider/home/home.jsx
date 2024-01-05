import React, { useEffect, useState } from "react";
import { useViewCategoryQuery } from "../../../Api/categoryApi";
import { useNavigate, Outlet, useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../../../redux/categorySlice";
import Category from "../../../services/category";
import SearchBox from "../../../components/searchBox";
import CardSection from "../../../services/cardSection";
import { useGetSubCategoryByProviderQuery } from "../../../Api/subCategoryApi";
import { useGetServicesQuery } from "../../../Api/catServiceApi";
import Card from "./card";
import Loader from "../../../components/Loader";
import ViewCategory from "./viewCategory";
const ProviderHome = () => {
  const category = useSelector((state) => state.categorySlice.category);
  const subcategory = useSelector((state) => state.categorySlice.subcategory);
  const {
    data: subcategories,
    isError,
    isLoading: subcategoryLoading,
    error: subcataegoryError,
  } = useGetSubCategoryByProviderQuery(category);
  const {
    data: services,
    isError: serviceIsError,
    isLoading: serviceLoading,
    error: serviceError,
  } = useGetServicesQuery({ category, subcategory });

  console.log("subcategour", subcategories);

  const navigate = useNavigate();
  const {
    data: categories,
    isError: categoryIsError,
    isLoading: categoryLoading,
    error: cataegoryError,
  } = useViewCategoryQuery();

  if (categoryLoading || subcategoryLoading || serviceLoading) {
    return <Loader />;
  }
  return (
    <>
      <section className="m-8">
        <SearchBox />
      </section>
      <section className="shadow ">
        <Category
          categories={categories}
          setCategory={setCategory}
          selected={category}
        />
      </section>
      <section className="p-5">
        <h2 className="text-lg font-bold ">Departments</h2>

        <div className="grid grid-cols-4 gap-4 p-2">
          {subcategories.map((subcatg) => {
            return (
              <div
                className="  cursor-pointer    bg-[#fff] p-6 rounded-lg transition-all text-center hover:scale-105 shadow-xl shadow-gray-600 "
                key={subcatg?.id}
                onClick={()=>{
                  navigate(`/provider/category/${subcatg.id}`)
                }}
              >
                <div className="flex">
                  <img
                    src={`http://localhost:8000/${subcatg?.icons}`}
                    alt=""
                    className="h-[80px] w-[80px] object-cover mb-3 rounded-full shadow"
                  />
                  <div className="text-lg font-bold text-[#666] mb-3 flex-1 grid place-content-center">
                    <h2 className="text-center">{subcatg?.name}</h2>
                  </div>
                </div>
                <div className="">
                  <p className="line-clamp-4 text-center mb-2 ">
                    {subcatg?.description}
                  </p>
                </div>
                <section>
                  <h2 className="text-left font-bold text-slate-600 mb-2">Featuring Services</h2>
                  <div className="grid gap-2 ">
                    {subcatg?.services.map((service) => {
                      return (
                        <div key={service.id} className="flex gap-5">
                          <img
                            src={`http://localhost:8000/${service?.icons}`}
                            className="h-[50px] w-[50px] object-cover  rounded-full shadow"
                            alt=""
                          />
                          <div className="grid  place-content-center">
                          <h2 className="text-gray-800 font-bold">{service?.name}</h2>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                <div className=" grid flex-1  p-4">
                  <button
                    className="text-orange-600 underline font-bold text-md"
                    onClick={() => {
                      navigate(`/provider/service/join/${subcatg?.id}`);
                    }}
                  >
                    Seee more
                  </button>
                </div>
                </section>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default ProviderHome;
