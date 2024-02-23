import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Outlet, useParams, useLocation, useMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../../../redux/categorySlice";
import { useViewCategoryQuery } from "../../../api/categoryApi";
import { useFilterProviderQuery } from "../../../api/searchingApi";
import { useGetFilterFactorsQuery } from "../../../api/searchingApi";

import ServiceCard from "../service/serviceCard";
import Loader from "../../../components/Loader";
import Category from "./Category";
import { setSubcategories } from "../../../redux/categorySlice";

const buyerHome = () => {
  const dispatch = useDispatch();
  const isHome=useMatch('/');
  const name=localStorage.getItem('name')
  const isCatgory=useMatch(`/${name}/category/:categoryId`);

  console.log('iscategory',isCatgory);

  const [showItemList, setShowItemList] = useState(false);
  const itemListRef = useRef(null);



  const handleSearchFocus = () => {
    setShowItemList(true);
  };

  const handleSearchBlur = async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    setShowItemList(false);
  };

  const service = useSelector((state) => state.cardSlice.service);
  console.log("service", service);
  const filters = useSelector((state) => state.cardSlice.filters);

  const { data: factors, isLoading: isFactors } = useGetFilterFactorsQuery();
  console.log("factors", factors);

  // const {categoryId}=useParams();
  // console.log('cateoryid',categoryId);
  const subcategoryId = useSelector((state) => state.categorySlice.subcategory);
  // const {
  //   data: subcategories,
  //   isError,
  //   isLoading: subcategoryLoading,
  //   error: subcataegoryError,
  // } = useGetSubCategoryQuery(categoryId);
  // const { data: services, isLoading: serviceLoading } =
  //   useFilterProviderQuery(filters);

  const navigate = useNavigate();
  const {
    data: categories,
    isError: categoryIsError,
    isLoading: categoryLoading,
    error: cataegoryError,
  } = useViewCategoryQuery();
  console.log("categoruies", categories);

  const {
    data: services,
    isLoading: serviceLoading,
  } = useFilterProviderQuery(filters);
  console.log("services", services);

  const {categoryId}=useParams()


useEffect(()=>{
if( categoryId){
 dispatch(setSubcategories(categories.find(category=>category.id===parseInt(categoryId)).subcategories))
}
},[categoryId])

console.log('categoryId',categoryId);

  if (categoryLoading || isFactors || serviceLoading) {
    return <Loader />;
  }
  return (
    <section className="h-screen "
    onMouseLeave={()=>{
      dispatch(setCategory(null))
    }}
    >
      <div className="  ">
        <section className="   ">
          {/* <div className="flex col-span-4 mb-5 w-[60Vw]  mx-auto justify-self-center relative  ">
            <input
              type="search"
              className="w-full rounded-full p-2 focus:outline-none shadow shadow-gray-600 "
              placeholder="Find Your Srevices"
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              onChange={(e) => {
                console.log(e.target.value);
                !e.target.value
                  ? dispatch(setSearchingProvider(null))
                  : dispatch(setSearchingProvider(e.target.value));
              }}
            />
            {showItemList && <Provider />}
          </div> */}

          <section className=" p-2 px-8 border border-gray-300 mb-5 ">
            <Category categories={categories} />
          </section>
        </section>
     
      </div>

        {/* <section>
        <SubCategory subcategories={subcategories} />

        </section> */}
        {
          isHome ?
        <section className="">

        <ServiceCard cards={services} />

          {/* <CardSection subcategories={factors?.subcategory} locations={factors?.location}>
              <Card cards={services} />
       
          </CardSection> */}
        </section> : (

          <Outlet/>
        )
        }

    </section>
  );
};

export default buyerHome;
