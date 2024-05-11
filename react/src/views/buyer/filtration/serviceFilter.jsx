import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaStar } from "react-icons/fa";
import {
  useUpdateBudgetMutation,
  useUpdateLocationMutation,
  useUpdateRatingMutation,
} from "../../../api/searchHistoryApi";

import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import Loader from "../../../components/Loader";
import ServiceCard from "../../../components/card/serviceCard";
import {
  useGetFilterTypesQuery,
  useGetFilteredServicesQuery,
} from "../../../api/buyer/filterApi";
import { useViewServiceByIdQuery } from "../../../api/admin/catServiceApi";

import { IoIosStar } from "react-icons/io";

import FilterQuery from "../../../components/filtration/filterQuery";

const ServiceFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { subcategoryId } = useParams();

  const [updateBudget] = useUpdateBudgetMutation();
  const [updateLocation] = useUpdateLocationMutation();
  const [updateRating] = useUpdateRatingMutation();

  console.log("data", history);

  const { serviceId } = useParams();

  const location = useLocation();
  console.log("location", location?.search);

  const { data: filter_Type, isLoading: isFilters } =
    useGetFilterTypesQuery(serviceId);
  const { data: services, isLoading } = useGetFilteredServicesQuery({
    serviceId,
    filter: location?.search,
  });
  const { data: service, isLoading: isService } =
    useViewServiceByIdQuery(serviceId);
    console.log('service',service);

  console.log("filteredService", services);
  console.log("filter_Type", filter_Type);

  if (isService || isFilters || isLoading) {
    return <Loader />;
  }

  return (
    <section className="p-4">
      <FilterQuery services={services} filter_Type={filter_Type} name={service?.name} />
    </section>
  );
};

export default ServiceFilter;
