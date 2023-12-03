import React, { useEffect, useState } from "react";
import { useNavigate, Outlet, useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../../../redux/categorySlice";
import Category from "../../../services/category";
import SearchBox from "../../../components/searchBox";
import CardSection from "../../../services/cardSection";
import { useGetProviderCategoryQuery } from "../../../Api/categoryApi";
import { useGetProviderSubCategoryQuery } from "../../../Api/subCategoryApi";
import {useGetProviderServiceQuery} from "../../../Api/providerApi"
import ServiceCard from "./card";
import Loader from "../../../components/Loader";
const Services = () => {
    const categoryId = useSelector((state) => state.categorySlice.category);
    const subcategoryId = useSelector((state) => state.categorySlice.subcategory);
    const serviceId=useSelector((state)=>state.serviceSlice.service)
    const dispatch=useDispatch();
    const providerId=localStorage.getItem("userId");
    const {
      data: subcategories,
      isError,
      isLoading: subcategoryLoading,
      error: subcataegoryError,
    } = useGetProviderSubCategoryQuery({providerId, categoryId });
    console.log('subcategory',subcategories);
    const {
      data: cards,
      isError: serviceIsError,
      isLoading: serviceLoading,
      error: serviceError,
    } = useGetProviderServiceQuery({ providerId,categoryId, subcategoryId });
    console.log(cards);
  
    const navigate = useNavigate();
    const {
      data: categories,
      isError: categoryIsError,
      isLoading: categoryLoading,
      error: cataegoryError,
    } = useGetProviderCategoryQuery(providerId);
  
console.log('category',categories);
  
    if (categoryLoading || subcategoryLoading || serviceLoading ) {
      return <Loader/>
    }
  return (
    <>
    <div className="relative">
      <section className="m-8">
        <SearchBox />
      </section>
      <section className="shadow ">
        <Category
          categories={categories}
          setCategory={setCategory}
          selected={categoryId}
        />
      </section>
      <section>
        <CardSection subcategories={subcategories}>
          <ServiceCard cards={cards}/>
          </CardSection>
      </section>
      
  
    
    </div>
  </>
  )
}

export default Services


