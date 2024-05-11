import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

import ServiceList from "./serviceList";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../../redux/sellerSlice";
const SearchBar = () => {
  const dispatch = useDispatch();
  const [showItemList, setShowItemList] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchParms, setSearchParams] = useSearchParams();

  const searchValue = useSelector((state) => state.sellerSlice.searchValue);
  const navigate = useNavigate();

  const handleSearchFocus = () => {
    setShowItemList(true);
  };

  const handleSearchBlur = async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    setShowItemList(false);
  };
  const handleChange = (e) => {
    dispatch(setSearchValue(e.target.value));
    console.log(e.target.value);
    if (e.target.value === "") {
      navigate("/user", { replace: true });
    }
  };

  const handleKeyUp = (e) => {
    console.log("value", e.key);
    if (e.key === "Enter") {
      navigate({
        pathname: "user/search",
        search: createSearchParams({
          service: `${e.target.value}`,
        }).toString(),
      });
    }
  };

  return (
    <div className="relative   rounded ">
      <div className=" flex  bg-sky-200 rounded-md  ">
        <input
          type="search"
          className="bg-sky-200  p-1.5 rounded-md w-full text-gray-600 text-lg   placeholder:text-lg focus:outline-none"
          placeholder="Search Services"
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
          value={searchValue}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
        />
        <button
          className="text-gray-500  border grid place-content-center w-[60px] text-2xl"
          onClick={() => {
            // searchName &&
            //   (navigate(`user/service/search`),
            //   setSearchParams({ name: searchValue }));

            navigate({
              pathname: "user/search",
              search: createSearchParams({
                service: `${searchValue}`,
              }).toString(),
            });
          }}
        >
          <i className="">
          <FaSearch className="font-light" />

          </i>
        </button>
      </div>
      {showItemList && searchValue !== "" && (
        <ServiceList search={searchValue} />
      )}
    </div>
  );
};

export default SearchBar;
