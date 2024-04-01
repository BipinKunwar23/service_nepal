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
import { useGetServiceCardsQuery } from "../../../api/public/serviceApi";

import ServiceCard from "../../../components/card/serviceCard";
import Loader from "../../../components/Loader";
import Category from "../../../components/catalog/category";
import { setSubCategories } from "../../../redux/buyerSlice";
import UserNavbar from "./user-navbar";
import CardSkeleton from "../../buyer/home/cardSkeleton";

const UserHome = () => {
  const dispatch = useDispatch();
  const isHome = useMatch("/user");
  const name = localStorage.getItem("name");

  // const [showItemList, setShowItemList] = useState(false);
  // const itemListRef = useRef(null);


  const { data, isLoading } =
    useGetServiceCardsQuery();
    console.log('data',data);

  const { categoryId } = useParams();

  useEffect(() => {
    if (categoryId && data) {
      dispatch(
        setSubCategories(
          data?.catalog.find((category) => category.id === parseInt(categoryId))
            .subcategories
        )
      );
    }
  }, [categoryId, data]);

  console.log("categoryId", categoryId);

  if ( isLoading) {
    return <CardSkeleton />;
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
            <Category categories={data?.catalog} />
          </section>
        </section>
      </div>


      {isHome ? (
        <section className="">
          <ServiceCard cards={data?.services?.data} url="/user/service"/>
        </section>
      ) : (
        <Outlet />
      )}
    </sec>
    </>

  );
};

export default UserHome;
