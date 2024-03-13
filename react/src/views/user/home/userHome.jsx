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
import Category from "./category";
import { setSubCategories } from "../../../redux/buyerSlice";
import UserNavbar from "./user-navbar";

const UserHome = () => {
  const dispatch = useDispatch();
  const isHome = useMatch("/user");
  const name = localStorage.getItem("name");

  // const [showItemList, setShowItemList] = useState(false);
  // const itemListRef = useRef(null);

  const { data: catalog, isLoading: isCatalog } = useGetCatalogQuery();
  console.log("categoruies", catalog);

  const { data: services, isLoading: serviceLoading } =
    useGetServiceCardsQuery();
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
      <UserNavbar/>
     
    <sec tion
      className=" "
      onMouseLeave={() => {
        dispatch(setCategory(null));
      }}
    >
      <div className="  ">
        <section className="   ">
          <section className="  ">
            <Category categories={catalog} />
          </section>
        </section>
      </div>

      {isHome ? (
        <section className="">
          <ServiceCard cards={services} />
        </section>
      ) : (
        <Outlet />
      )}
    </sec>
    </>

  );
};

export default UserHome;
