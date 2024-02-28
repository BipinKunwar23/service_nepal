import React from "react";
import { useGetSearchListQuery } from "../../api/buyer/filterApi";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/sellerSlice";
import { createSearchParams, useNavigate } from "react-router-dom";
const ServiceList = ({ search }) => {
  const { data, isLoading } = useGetSearchListQuery(search);
  console.log('searchdata',data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("search", search);
  if (isLoading || data.length === 0) {
    return;
  }
  return (
    <div className="absolute w-full z-10 border shadow-lg p-4 bg-white top-17">
      <ul className="text-lg text-gray-700 flex flex-col gap-3">
        {data?.map(( item,index) => {
          return (
            <li
              className=" cursor-pointer"
              key={index}
              onClick={() => {
                dispatch(setSearchValue(item?.keywords));
                navigate({
                
                  pathname: "user/search",
                  search: createSearchParams({
                      service: `${item?.keywords}`
                  }).toString()
              });

              }}
            >
              {item?.keywords}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ServiceList;
