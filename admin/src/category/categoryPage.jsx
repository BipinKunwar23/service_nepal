import React, { useEffect, useState } from "react";
import { useViewCategoryQuery } from "../Api/categoryApi";
import { useNavigate, Outlet, useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../redux/categorySlice";
import Category from "./category";
import SearchBox from "../components/searchBox";
import AllForm from "./AllForm";
import CardSection from "./cardSection";
import { useGetSubCategoryQuery } from "../Api/subCategoryApi";
import { useGetServicesQuery } from "../Api/catServiceApi";
import EditAction from "./edit/editAction"
export const CategoryPage = () => {
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
  console.log('categories',categories);
  console.log('subcategories',subcategories);

console.log('services',services);

  if (categoryLoading || subcategoryLoading || serviceLoading ) {
    return <div>loading...</div>;
  }

  return (
    <>
      <div className="relative  ">
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
          <CardSection subcategories={subcategories} cards={services} />
        </section>
        <section>
          <AllForm />
        </section>
        <section>
         <EditAction/>
        </section>
      </div>
    </>
  );
};
