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

const buyerHome = () => {
  const dispatch = useDispatch();
  const isHome = useMatch(`/user/${encodeURI(localStorage.getItem('name'))}`);
  const name = localStorage.getItem("name");
const paginateUrl=useSelector((state)=>state.buyerSlice.paginateUrl);
  // const [showItemList, setShowItemList] = useState(false);
  // const itemListRef = useRef(null);

  const { data: catalog, isLoading: isCatalog } = useGetCatalogQuery();
  console.log("categoruies", catalog);

  const { data: services, isLoading: serviceLoading } =
    useGetServiceCardsQuery(paginateUrl);
  console.log("services", services);

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

  console.log("categoryId", categoryId);

  if (isCatalog || serviceLoading) {
    return <Loader />;
  }
  return (
    <>
    <BuyerNavbar/>
    <section
      className="min-h-screen "
      onMouseLeave={() => {
        dispatch(setCategory(null));
      }}
    >
       
            <Category categories={catalog} />
     

      {isHome ? (
          <ServiceCard cards={services} url={`/user/${localStorage.getItem('name')}/service`} />
      ) : (
        <Outlet />
      )}
    </section>
    </>

  );
};

export default buyerHome;
