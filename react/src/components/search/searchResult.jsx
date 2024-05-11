import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useGetSearchedServiceQuery } from "../../api/buyer/filterApi";
import ServiceCard from "../card/serviceCard";
import CardSkeleton from "../../views/buyer/home/cardSkeleton";

const SearchResult = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const service = searchParams.get("query");

  const { data: services, isLoading } = useGetSearchedServiceQuery(service);
  if (isLoading) {
    <CardSkeleton/>
  }
  if (!services || services.length===0) {
    return (
      <div className="p-10 text-xl">
        <p className="text-center">No Result Found For {service}</p>
      </div>
    );
  }
  return (
    <section className="p-4">
      <div className=" my-2">

      <h2 className=" text-2xl text-gray-700 font-semibold ">Result For {service}</h2>
      </div>
      <div>
        <ServiceCard cards={services?.data} url={`/user/${localStorage.getItem('name')}/service`}/>
      </div>
    </section>
  );
};

export default SearchResult;
