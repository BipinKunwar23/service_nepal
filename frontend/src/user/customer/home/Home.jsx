import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Outlet, useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../../../redux/categorySlice";
import Category from "../../../services/category";
import CardSection from "../home/CardSection";
import { useViewCategoryQuery } from "../../../Api/categoryApi";
import { useGetSubCategoryQuery } from "../../../Api/subCategoryApi";
import { useGetProviderQuery } from "../../../Api/providerApi";
import { setSearchingProvider, setService } from "../../../redux/cardSlice";

import Provider from "./searching/provider";

import Card from "./Card";
import Loader from "../../../components/Loader";
import AllCards from "./AllCards";
const Home = () => {
  const dispatch = useDispatch();
  const [showItemList, setShowItemList] = useState(false);
  const itemListRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = async (event) => {
      if (itemListRef.current && !itemListRef.current.contains(event.target)) {
        // Clicked outside the itemList, hide it after a small delay
        await new Promise((resolve) => setTimeout(resolve, 100));
        setShowItemList(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSearchFocus = () => {
    setShowItemList(true);
  };

  const handleSearchBlur = async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    setShowItemList(false);
  };

  const service = useSelector((state) => state.cardSlice.service);
  console.log("service", service);

  const categoryId = useSelector((state) => state.categorySlice.category);
  const subcategoryId = useSelector((state) => state.categorySlice.subcategory);
  const {
    data: subcategories,
    isError,
    isLoading: subcategoryLoading,
    error: subcataegoryError,
  } = useGetSubCategoryQuery(categoryId);
  const {
    data: services,
    isError: serviceIsError,
    isLoading: serviceLoading,
    error: serviceError,
  } = useGetProviderQuery({ categoryId, subcategoryId, service });


  const navigate = useNavigate();
  const {
    data: categories,
    isError: categoryIsError,
    isLoading: categoryLoading,
    error: cataegoryError,
  } = useViewCategoryQuery();

  if (categoryLoading || subcategoryLoading || serviceLoading) {
    return <Loader/>
  }
  return (
    <section className=" ">
      <div className=" shadow-xl shadow-slate-400 p-5   rounded-2xl ">
        <section className="  shadow shadow-gray-300 mb-1 py-3  ">

        
          <div className="flex col-span-4 mb-5 w-[60Vw]  mx-auto justify-self-center relative  ">
            <input
              type="search"
              className="w-full rounded-full p-2 focus:outline-none shadow shadow-gray-600 "
              placeholder="Find Your Srevices"
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              onChange={(e) => {
                console.log(e.target.value);
                !e.target.value ? dispatch(setSearchingProvider(null)):
                dispatch(setSearchingProvider(e.target.value));
              }}
            />
            {showItemList && <Provider />}
          </div>
      
        <section className=" py-4 ">
          <Category
            categories={categories}
            setCategory={setCategory}
            selected={categoryId}
          />
        </section>
        </section>

        <section className="">
          <CardSection subcategories={subcategories} >
            {
             subcategoryId ? 
             <Card cards={services} />
             :
             <AllCards cards={services}/>
            }
          </CardSection>
        </section>
      </div>
    </section>
  );
};

export default Home;
