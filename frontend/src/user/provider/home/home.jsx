import React, { useEffect, useState } from "react";
import { useViewCategoryQuery } from "../../../Api/categoryApi";
import { useNavigate, Outlet, useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../../../redux/categorySlice";
import Category from "../../../services/category";
import SearchBox from "../../../components/searchBox";
import CardSection from "../../../services/cardSection";
import { useGetSubCategoryQuery } from "../../../Api/subCategoryApi";
import { useGetServicesQuery } from "../../../Api/catServiceApi";
import Card from "./card";
import Loader from "../../../components/Loader";
const ProviderHome = () => {
    const category = useSelector((state) => state.categorySlice.category);
    const subcategory = useSelector((state) => state.categorySlice.subcategory);
    const {
      data: subcategories,
      isError,
      isLoading: subcategoryLoading,
      error: subcataegoryError,
    } = useGetSubCategoryQuery(category);
    const {
      data: services,
      isError: serviceIsError,
      isLoading: serviceLoading,
      error: serviceError,
    } = useGetServicesQuery({ category, subcategory });
  
    const navigate = useNavigate();
    const {
      data: categories,
      isError: categoryIsError,
      isLoading: categoryLoading,
      error: cataegoryError,
    } = useViewCategoryQuery();
  
  
  
    if (categoryLoading || subcategoryLoading || serviceLoading ) {
      return <Loader/>
    }
  return (
    <>
    <div className="">
      <section className="m-8">
        <SearchBox />
      </section>
      <section className="shadow ">
        <Category
          categories={categories}
          setCategory={setCategory}
          selected={category}
        />
      </section>
      <section>
        <CardSection subcategories={subcategories} >
          <Card cards={services}/>
          </CardSection>
      </section>
    
    </div>
  </>
  )
}

export default ProviderHome


