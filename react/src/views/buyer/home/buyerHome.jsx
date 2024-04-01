import React, { useEffect, useState, useRef } from "react";
import {
  useNavigate,
  Outlet,
  useParams,
  useLocation,
  useMatch,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../../../redux/buyerSlice";
import { useGetCatalogQuery } from "../../../api/buyer/catalogApi";
import { useGetServiceCardsQuery } from "../../../api/buyer/serviceApi";

import ServiceCard from "../../../components/card/serviceCard";
import Loader from "../../../components/Loader";
import Category from "../../../components/catalog/category";
import { setSubCategories } from "../../../redux/buyerSlice";
import BuyerNavbar from "./buyer-navbar";
import { setPaginateUrl } from "../../../redux/buyerSlice";
import Pagination from "react-js-pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import CardSkeleton from "./cardSkeleton";


const buyerHome = () => {
  const dispatch = useDispatch();
  const isHome = useMatch(`/user/${encodeURI(localStorage.getItem("name"))}`);
  const name = localStorage.getItem("name");
  const paginateUrl = useSelector((state) => state.buyerSlice.paginateUrl);

  // const [showItemList, setShowItemList] = useState(false);
  // const itemListRef = useRef(null);
  const { data: catalog, isLoading: isCatalog } = useGetCatalogQuery();

  const { data: services, isLoading: serviceLoading } =
    useGetServiceCardsQuery(paginateUrl);

    console.log('services',services);

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


  if (isCatalog || serviceLoading) {
    return <CardSkeleton />;
  }
  return (
    <>
      <BuyerNavbar />
      <section
        className=" "
       
      >
        
        <Category categories={catalog} />

        {isHome ? (
          <section className="p-4 min-h-screen">
          <h2 className="text-xl font-semibold text-gray-600 ">Based on your browsing history</h2>
          
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
          </section>
        ) : (
          <Outlet />
        )}
      </section>
    </>
  );
};

export default buyerHome;
