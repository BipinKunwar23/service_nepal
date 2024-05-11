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

const FilterQuery = ({ services, filter_Type, name }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

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

  console.log("filters", filterType);
  const [types, setTypes] = useState([]);
  console.log("types", types);
  const [prices, setPrices] = useState([]);
  console.log("prices", prices);
  const [city, setCity] = useState(null);
  console.log("city", city);
  const [rating, setRating] = useState([]);
  console.log("rating", rating);

  console.log("filteredService", services);
  console.log("filter_Type", filter_Type);

  useEffect(() => {
    setSearchParams(filterType);
  }, [filterType]);

  const FilterData = () => {
    switch (filterId) {
      case 1:
        return (
          <form
            className="bg-white border  shadow shadow-gray-600 rounded-lg col-span-2  mt-2  max-h-[330px] overflow-y-auto"
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
            <div>
              <h2 className="p-4 ">Service Options</h2>
            </div>
            <ul className="grid grid-cols-2  gap-y-4 border-y p-4">
              {filter_Type?.options?.map((type) => (
                <li
                  key={type.id}
                  className="   flex gap-3 hover:cursor-pointer w-full"
                >
                  <div>
                    <input
                      type="checkbox"
                      id={type?.id}
                      name={`type[${type?.id}]`}
                      value={type?.name}
                      className="w-4 h-4 "
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
                  </div>
                  <div>
                    <label htmlFor={type?.id} className="hover:cursor-pointer ">
                      {type?.name}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-2 gap-5  p-4 border-gray-400   ">
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
                className=" bg-gray-700 text-white p-2 rounded-md"
                type="submit"
              >
                Apply
              </button>
            </div>
          </form>
        );
        break;

      case 2:
        const low = filter_Type?.budget?.low;
        const high = filter_Type?.budget?.high;
        return (
          <div className="bg-white border   shadow rounded-lg col-span-2 mt-2 col-start-2 ">
            <h2 className="p-4 "> Budget Range</h2>
            <ul className="flex flex-col gap-3 p-4 border-y  space-y-4">
              <li className="flex gap-3  ">
                <input
                  type="radio"
                  className="h-6 w-6"
                  name="price"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setPrices(["low", low]);
                    }
                  }}
                  checked={prices[0] === "low"}
                />

                <p>
                  Vlaue{" "}
                  <span className=" ml-2 text-gray-600">{`Under Rs  ${low}`}</span>
                </p>
              </li>
              <li className="flex gap-3  ">
                <input
                  type="radio"
                  className="h-6 w-6"
                  name="price"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setPrices(["mid", low, high]);
                    }
                  }}
                  defaultChecked={prices[0] === "mid"}
                />
                <p>
                  Mid-Range{" "}
                  <span className=" ml-2 text-gray-600">{` Rs  ${low} -  ${high}`}</span>
                </p>
              </li>
              <li className="flex gap-3   ">
                <input
                  type="radio"
                  className="h-6 w-6"
                  name="price"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setPrices(["high", high]);
                    }
                  }}
                  checked={prices[0] === "high"}
                />
                <p>
                  High-Above{" "}
                  <span className=" ml-2 text-gray-600">{` Rs  ${high}`}</span>
                </p>
              </li>
              <li className="flex gap-3  ">
                <input type="radio" className="h-6 w-6" name="price" />
                <p>Custom </p>
              </li>
              <li className="  ">
                <input
                  type="text"
                  className="w-[70%] mx-auto  p-2 border border-gray-400  "
                  placeholder="Enter Price"
                />
              </li>
            </ul>
            <div className="grid grid-cols-2 gap-5  p-4  ">
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
                className=" bg-gray-700 text-white p-2 rounded-md"
                onClick={() => {
                  // await updateBudget({ value: prices });
                  setFilterType({ ...filterType, price: prices.join(",") });
                  setFilters(null);
                }}
              >
                Apply
              </button>
            </div>
          </div>
        );
        break;
      case 3:
        return (
          <div className="bg-white   shadow shadow-gray-400 rounded-md col-span-2 mt-2  max-h-[330px] col-start-3 overflow-y-auto">
            <h2 className="p-4">Filter By Location</h2>
            <ul className="flex flex-col gap-2  p-4 space-y-4 border-y ">
              {filter_Type?.locations?.map((location) => (
                <li
                  key={location.city}
                  className="flex gap-3  cursor-pointer w-full"
                >
                  <input
                    type="radio"
                    className="h-6 w-6"
                    name="price"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCity(location?.city);
                      }
                    }}
                    checked={location.city === city}
                  />
                  <p>{location?.city}</p>
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-2 gap-5 border-t border-gray-300 py-3 px-2 ">
              <button
                className="border border-gray-400 p-2 rounded-md"
                onClick={() => {
                  delete filterType.city;
                  setFilterType({ ...filterType });
                  setCity(null);

                  setFilters(null);
                }}
              >
                Clear
              </button>
              <button
                className=" bg-gray-700 text-white p-2 rounded-md"
                onClick={() => {
                  setFilterType({ ...filterType, city });
                  setFilters(null);
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
          <div className="bg-white  border shadow shadow-gray-600 rounded-lg col-span-2 mt-2   col-start-4 ">
            <h2 className="p-4 ">Filter By Rating</h2>
            <ul className="p-4 grid grid-cols-2 gap-4 border-y ">
              <li className="flex gap-5  ">
                <input type="checkbox" className="w-[18px] "
                  onChange={(e) => {
                    const { checked } = e.target;
                    if (checked) {
                      // If checkbox is checked, add the value to the types array
                      setRating([...rating, 5]);
                    } else {
                      // If checkbox is unchecked, remove the value from the types array
                      setRating(rating.filter((rate) => rate !== 5));
                    }
                  }}
                  checked={rating.includes(5)}
                />
                <div>
                  <p>Excellent</p>
                  <p>
                   ( {filter_Type?.rating.find((rating) => rating?.stars === 5)
                      ?.count || 0} )
                  </p>
                </div>
              </li>
              <li className="flex gap-5  ">
                <input type="checkbox" className="w-[18px]"
                onChange={(e) => {
                  const { checked } = e.target;
                  if (checked) {
                    // If checkbox is checked, add the value to the types array
                    setRating([...rating, 4]);
                  } else {
                    // If checkbox is unchecked, remove the value from the types array
                    setRating(rating.filter((rate) => rate !== 4));
                  }
                }}
                checked={rating.includes(4)}
                />
                <div>
                  <p>Average</p>
                  <p>
                   ( {filter_Type?.rating.find((rating) => rating?.stars === 4)
                      ?.count || 0} )
                  </p>
                </div>
              </li>
              <li className="flex gap-5 ">
                <input type="checkbox" className="w-[18px]"
                onChange={(e) => {
                  const { checked } = e.target;
                  if (checked) {
                    // If checkbox is checked, add the value to the types array
                    setRating([...rating, 3]);
                  } else {
                    // If checkbox is unchecked, remove the value from the types array
                    setRating(rating.filter((rate) => rate !== 3));
                  }
                }}
                checked={rating.includes(3)}
                />
                <div>
                  <p>Good</p>
                  <p>
                   ( {filter_Type?.rating.find((rating) => rating?.stars === 3)
                      ?.count || 0} )
                  </p>
                </div>
              </li>
              <li className="flex gap-5">
                <input type="checkbox" className="w-[18px]"
                onChange={(e) => {
                  const { checked } = e.target;
                  if (checked) {
                    // If checkbox is checked, add the value to the types array
                    setRating([...rating, 1]);
                  } else {
                    // If checkbox is unchecked, remove the value from the types array
                    setRating(rating.filter((rate) => rate !==1));
                  }
                }}
                checked={rating.includes(1)}
                />
                <div>
                  <p>Newer</p>
                  <p>
                   ( {filter_Type?.rating.find((rating) => rating?.stars === 1)
                      ?.count || 0} )
                  </p>
                </div>
              </li>
            </ul>
            <div className="grid grid-cols-2 gap-5  p-4 ">
              <button className="border border-gray-400 p-2 rounded-md"
               onClick={() => {
                delete filterType.rating;
                setFilterType({ ...filterType });

                setFilters(null);
                setRating([]);
              }}
              >
                Clear
              </button>
              <button className=" bg-gray-700 text-white p-2 rounded-md"
              onClick={()=>{
                if (rating.length == 0) {
                  delete filterType.rating;
                  setFilterType({ ...filterType });
                } else {
                  setFilterType({ ...filterType, rating: rating.join(",") });
                }
                setFilters(null);
              }}
              >
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
      <section className=" relative">
        <h2 className=" text-xl mb-8">{name}</h2>
        <div className="grid grid-cols-6 gap-5 ">
          {filters.map((filter) => (
            <div
              key={filter.id}
              className="flex justify-between  text-gray-700 border-1 border-gray-500  p-2 rounded-lg hover:cursor-pointer "
              onClick={() => {
                filterId === filter.id
                  ? setFilters(null)
                  : setFilters(filter.id);
              }}
            >
              <button className="text-center  text-[1em] ">
                {filter.name}
              </button>
              <i className=" transition-all delay-1000">
                {filterId === filter.id ? <IoIosArrowDown /> : <IoIosArrowUp />}
              </i>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-6 gap-5 z-10 absolute w-full ">
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
