import React, { useEffect, useState, useRef } from "react";
import {
  useNavigate,
  Outlet,
  useParams,
  useLocation,
  useMatch,
} from "react-router-dom";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../../../redux/buyerSlice";
import { useGetCatalogQuery } from "../../../api/buyer/catalogApi";
import {
  useGetServiceCardsQuery,
  useGetPopularServiceQuery,
} from "../../../api/buyer/serviceApi";

import ServiceCard from "../../../components/card/serviceCard";
import Loader from "../../../components/Loader";
import Category from "../../../components/catalog/category";
import { setSubCategories } from "../../../redux/buyerSlice";
import BuyerNavbar from "./buyer-navbar";
import { setPaginateUrl } from "../../../redux/buyerSlice";
import Pagination from "react-js-pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import CardSkeleton from "./cardSkeleton";
import SearchBar from "../../../components/search/searchBar";
import { RiMenuFill } from "react-icons/ri";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { MdOutlineSort } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";

const buyerHome = () => {
  const dispatch = useDispatch();
  const isHome = useMatch(`/user/${encodeURI(localStorage.getItem("name"))}`);
  const name = localStorage.getItem("name");
  const paginateUrl = useSelector((state) => state.buyerSlice.paginateUrl);

  // const [showItemList, setShowItemList] = useState(false);
  // const itemListRef = useRef(null);
  const { data: catalog, isLoading: isCatalog } = useGetCatalogQuery();
  const { data: populars, isLoading: ispopular } = useGetPopularServiceQuery();
  const [menu, setMenu] = useState(false);

  const { data: services, isLoading: serviceLoading } =
    useGetServiceCardsQuery(paginateUrl);

  const { categoryId } = useParams();

  useEffect(() => {
    if (categoryId && catalog) {
      dispatch(
        setSubCategories(
          catalog.find((category) => category.id === parseInt(categoryId))
            .subcategories
        )
      );
    }
  }, [categoryId, catalog]);
  const types = [
    {
      id: 1,
      name: " All",
    },
    {
      id: 2,
      name: "Relevant",
    },
    {
      id: 3,
      name: "Recent",
    },
  ];

  if (isCatalog || serviceLoading || ispopular) {
    return <CardSkeleton />;
  }
  return (
    <section className="w-[80Vw] mx-auto">
      <BuyerNavbar />
      <section className=" flex content-center  my-8 justify-between">
        <div className="flex font-semibold gap-6 w-[20Vw]">
        <div>
              <button
                className="flex gap-2 p-2"
                onClick={() => {
                  setMenu(!menu);
                }}
              >
                <i className="text-xl">
                  <HiAdjustmentsHorizontal />
                </i>
                Filter
              </button>
            </div>
            <div>
              <button className="flex gap-2 p-2">
                <i className="text-xl">
                  <MdOutlineSort />
                </i>
                Sort
              </button>
            </div>
        </div>
        {/* <div className="flex-1 grid justify-end ">

        <SearchBar/>
        </div> */}
        <div className=" grid justify-end">
          <div className="flex gap-4">
            <div>
              <button className="flex gap-2 bg-slate-100  p-2 px-4 rounded-full">
                <i className="text-xl">
                  <IoIosSearch />
                </i>
                Search
              </button>
            </div>
            
          </div>
        </div>
      </section>
      {menu && (
        <div className="my-4">
          <Category categories={catalog} />
        </div>
      )}

      <section className="">
        {isHome ? (
          <section className=" min-h-screen">
            <h2 className="text-2xl font-semibold mb-4">Recommended Service</h2>

            <ServiceCard
              cards={services?.data}
              url={`/user/${localStorage.getItem("name")}/service`}
            >
              {services && services?.data?.length > 0 && (
                <div className="mt-4 grid place-content-center">
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
                </div>
              )}
            </ServiceCard>
            {populars && populars.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-600 ">
                  Popular Services
                </h2>
                <ServiceCard
                  cards={populars}
                  url={`/user/${localStorage.getItem("name")}/service`}
                ></ServiceCard>
              </div>
            )}
          </section>
        ) : (
          <Outlet />
        )}
      </section>
    </section>
  );
};

export default buyerHome;
