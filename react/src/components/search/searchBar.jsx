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
    <div className="relative w-full">
      <div className=" flex border-2 rounded-full border-slate-300  ">
        <input
          type="search"
          className="bg-white p-1.5  w-full text-gray-600 text-lg rounded-l-full   placeholder:text-lg focus:outline-none"
          placeholder="What service are you looking today ?"
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
          value={searchValue}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
        />
        <button
          className="text-blue-600 rounded-r-full bg-white grid place-content-center w-[60px] text-2xl"
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
          <FaSearch className="font-light" />
        </button>
      </div>
      {showItemList && searchValue !== "" && (
        <ServiceList search={searchValue} />
      )}
    </div>
  );
};

export default SearchBar;
