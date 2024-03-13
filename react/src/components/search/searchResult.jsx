import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useGetSearchedServiceQuery } from "../../api/buyer/filterApi";
import ServiceCard from "../card/serviceCard";

const SearchResult = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const service = searchParams.get("query");

  const { data: services, isLoading } = useGetSearchedServiceQuery(service);
  console.log("services", services);
  if (isLoading) {
    return;
  }
  if (!services || services.length === 0) {
    return (
      <div className="p-10 text-xl">
        <p className="text-center">No Result Found For {service}</p>
      </div>
    );
  }
  return (
    <section className="">
      <div className="px-4 mt-3">

      <h2 className=" text-3xl ">Result For {service}</h2>
      </div>
      <div>
        <ServiceCard cards={services} />
      </div>
    </section>
  );
};

export default SearchResult;
