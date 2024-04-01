import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaStar } from "react-icons/fa";

import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import ServiceCard from "../card/serviceCard";

import { setPaginateUrl } from "../../redux/buyerSlice";
import Pagination from "react-js-pagination";
import "bootstrap/dist/css/bootstrap.min.css";

const FilterQuery = ({ services, filter_Type }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  const serviceName = useSelector((state) => state.buyerSlice.service);

  const filters = [
    {
      id: 1,
      name: " OPTION",
    },
    {
      id: 2,
      name: "BUDGET",
    },
    {
      id: 3,
      name: "LOCATION",
    },
    {
      id: 4,
      name: "RATING",
    },
  ];
  const [filterId, setFilters] = useState();
  const [filterType, setFilterType] = useState({});

  useEffect(() => {
    setSearchParams(filterType);
  }, [filterType]);
  console.log("filters", filterType);
  const [types, setTypes] = useState([]);
  console.log("types", types);
  const [prices, setPrices] = useState("");
  console.log("prices", prices);
  const [city, setCity] = useState("");

  console.log("filteredService", services);
  console.log("filter_Type", filter_Type);

  const FilterData = () => {
    switch (filterId) {
      case 1:
        return (
          <form
            className="bg-white   shadow shadow-gray-400 rounded-md col-span-2  mt-2  max-h-[330px] overflow-y-auto"
            onSubmit={(e) => {
              e.preventDefault();
              if (types.length == 0) {
                delete filterType.type;
                setFilterType({ ...filterType });
              } else {
                setFilterType({ ...filterType, type: types.join(",") });
              }
              setFilters(null);
            }}
          >
            <ul className="grid grid-cols-2 gap-3  p-4">
              {filter_Type?.options?.map((type) => (
                <li
                  key={type.id}
                  className="p-2 flex gap-3 hover:cursor-pointer w-full"
                >
                  <input
                    type="checkbox"
                    id={type?.id}
                    name={`type[${type?.id}]`}
                    value={type?.name}
                    className="w-[18px]"
                    onChange={(e) => {
                      const { checked, value } = e.target;
                      if (checked) {
                        // If checkbox is checked, add the value to the types array
                        setTypes([...types, value]);
                      } else {
                        // If checkbox is unchecked, remove the value from the types array
                        setTypes(types.filter((type) => type !== value));
                      }
                    }}
                    checked={types.includes(type.name)}
                  />
                  <label htmlFor={type?.id} className="hover:cursor-pointer">
                    {type?.name}
                  </label>
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-2 gap-5  m-3 border-t border-gray-400 p-4  ">
              <button
                className="border border-gray-400 p-2 rounded-md"
                type="button"
                onClick={() => {
                  delete filterType.type;
                  setFilterType({ ...filterType });

                  setFilters(null);
                  setTypes([]);
                }}
              >
                Clear
              </button>
              <button
                className="border border-gray-400 p-2 rounded-md"
                type="submit"
              >
                Apply
              </button>
            </div>
          </form>
        );
        break;

      case 2:
        const low = parseInt(
          (parseInt(filter_Type?.budget[0]?.min) +
            parseInt(filter_Type?.budget[0]?.max)) /
            3
        );
        const high = parseInt(
          ((parseInt(filter_Type?.budget[0]?.min) +
            parseInt(filter_Type?.budget[0]?.max)) /
            3) *
            2
        );
        return (
          <div className="bg-white  p-1  shadow shadow-gray-400 rounded-md col-span-2 mt-2 col-start-2 ">
            <ul className="flex flex-col gap-3 ">
              <li className="flex gap-3  p-3 ">
                <input
                  type="radio"
                  className="w-[20px]"
                  name="price"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setPrices(`low, ${low}`);
                    }
                  }}
                />
                <p>
                  Vlaue{" "}
                  <span className=" ml-2 text-gray-600">{`Under Rs  ${low}`}</span>
                </p>
              </li>
              <li className="flex gap-3  p-3 ">
                <input
                  type="radio"
                  className="w-[25px]"
                  name="price"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setPrices(`mid, ${low}, ${high}`);
                    }
                  }}
                />
                <p>
                  Mid-Range{" "}
                  <span className=" ml-2 text-gray-600">{` Rs  ${low} -  ${high}`}</span>
                </p>
              </li>
              <li className="flex gap-3  p-3 ">
                <input
                  type="radio"
                  className="w-[25px]"
                  name="price"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setPrices(`high, ${high}`);
                    }
                  }}
                />
                <p>
                  High-Above{" "}
                  <span className=" ml-2 text-gray-600">{` Rs  ${high}`}</span>
                </p>
              </li>
              <li className="flex gap-3  p-3 ">
                <input type="radio" className="w-[25px]" name="price" />
                <p>Custom </p>
              </li>
              <li className="  p-3 ">
                <div></div>
                <input
                  type="text"
                  className="w-[80%] mx-auto  p-2 border border-gray-400  "
                  placeholder="Enter Price"
                />
              </li>

              <li className="grid grid-cols-2 gap-5  m-3 border-t border-gray-300 py-4 ">
                <button
                  className="border border-gray-400 p-2 rounded-md"
                  onClick={() => {
                    delete filterType.price;
                    setFilterType({ ...filterType });

                    setFilters(null);
                    setPrices([]);
                  }}
                >
                  Clear
                </button>
                <button
                  className="border border-gray-400 p-2 rounded-md"
                  onClick={() => {
                    // await updateBudget({ value: prices });
                    setFilterType({ ...filterType, price: prices });
                  }}
                >
                  Apply
                </button>
              </li>
            </ul>
          </div>
        );
        break;
      case 3:
        return (
          <div className="bg-white   shadow shadow-gray-400 rounded-md col-span-1 mt-2  max-h-[330px] col-start-3 overflow-y-auto">
            <ul className="flex flex-col gap-2 p-2  ">
              {filter_Type?.locations?.map((location) => (
                <li
                  key={location.city}
                  className={`p-2.5 border box-border border-gray-400 hover:bg-gray-300 ${
                    location.city === city && "bg-gray-300"
                  }  cursor-pointer w-full`}
                  onClick={() => {
                    setCity(location?.city);
                  }}
                >
                  {location?.city}
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-2 gap-5 border-t border-gray-300 py-3 px-2 ">
              <button className="border border-gray-400 p-2 rounded-md">
                Clear
              </button>
              <button
                className="border border-gray-400 p-2 rounded-md"
                onClick={async () => {
                  await updateLocation({ city });
                  setFilterType({ ...filterType, city });
                }}
              >
                Apply
              </button>
            </div>
          </div>
        );
        break;
      case 4:
        return (
          <div className="bg-white   shadow shadow-gray-400 rounded-md col-span-2 mt-2   col-start-4 ">
            <ul className="p-4 grid grid-cols-2 gap-2 ">
              <li className="flex gap-5  p-3 ">
                <input type="checkbox" className="w-[18px]" />
                <p>
                  Excellent <span>(2000)</span>
                </p>
              </li>
              <li className="flex gap-5 p-3 ">
                <input type="checkbox" className="w-[18px]" />
                <p>
                  Average <span>(3000)</span>
                </p>
              </li>
              <li className="flex gap-5 p-3">
                <input type="checkbox" className="w-[18px]" />
                <p>
                  Good <span>(2000)</span>
                </p>
              </li>
              <li className="flex gap-5 p-3">
                <input type="checkbox" className="w-[18px]" />
                <p>
                  Newer <span>(2000)</span>
                </p>
              </li>
            </ul>
            <div className="grid grid-cols-2 gap-5 border-t border-gray-300 m-3 p-4 ">
              <button className="border border-gray-400 p-2 rounded-md">
                Clear
              </button>
              <button className="border border-gray-400 p-2 rounded-md">
                Apply
              </button>
            </div>
          </div>
        );
        break;
      default:
        return null;
    }
  };

  return (
    <section className="font-semibold text-[1em]">
      <section className=" mt-4 relative">
        <h2 className="mb-8 text-xl">{serviceName}</h2>
        <div className="grid grid-cols-5  text-[0.9em2] gap-5">
          {filters.map((filter) => (
            <div
              key={filter.id}
              className="flex justify-between  text-gray-700 gap-5 border border-gray-600 p-2 rounded-lg hover:cursor-pointer "
              onClick={() => {
                filterId === filter.id
                  ? setFilters(null)
                  : setFilters(filter.id);
              }}
            >
              <p className="text-center ml-2 text-[1.1em] ">{filter.name}</p>
              <span className=" transition-all delay-1000">
                {filterId === filter.id ? <IoIosArrowDown /> : <IoIosArrowUp />}
              </span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-5 gap-5 z-10 absolute w-[97%]">
          {FilterData()}
        </div>
      </section>
      <section>
        {!services || services.data?.length === 0 ? (
          <div className="h-[50Vh] grid place-content-center">
            <p className="text-2xl font-semibold text-gray-500">
              No result found
            </p>
          </div>
        ) : (
          <ServiceCard
            cards={services?.data}
            url={`/user/${localStorage.getItem("name")}/service`}
          >
            <Pagination
              totalItemsCount={services?.total}
              activePage={services?.current_page}
              itemsCountPerPage={services?.per_page}
              onChange={(pageNumber) => {
                dispatch(setPaginateUrl(pageNumber));
              }}
              itemClass="page-item"
              linkClass="page-link"
              prevPageText="Previous"
              nextPageText="Next"
              hideFirstLastPages={true}
              hideNavigation={false}
              activeClass="active"
            />
          </ServiceCard>
        )}
      </section>
    </section>
  );
};

export default FilterQuery;
