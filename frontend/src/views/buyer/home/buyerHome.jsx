import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Outlet, useParams, useLocation, useMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../../../redux/buyerSlice";
import { useGetCatalogQuery } from "../../../api/buyer/catalogApi";
import { useGetServiceCardsQuery } from "../../../api/buyer/serviceApi";


import ServiceCard from "../service/serviceCard";
import Loader from "../../../components/Loader";
import Category from "./Category";
import { setSubCategories } from "../../../redux/buyerSlice";

const buyerHome = () => {
  const dispatch = useDispatch();
  const isHome=useMatch('/user');
  const name=localStorage.getItem('name')
 

  // const [showItemList, setShowItemList] = useState(false);
  // const itemListRef = useRef(null);



  // const handleSearchFocus = () => {
  //   setShowItemList(true);
  // };

  // const handleSearchBlur = async () => {
  //   await new Promise((resolve) => setTimeout(resolve, 200));
  //   setShowItemList(false);
  // };


  const {
    data: catalog,
    isLoading: isCatalog,
  } = useGetCatalogQuery();
  console.log("categoruies", catalog);

  const {
    data: services,
    isLoading: serviceLoading,
  } = useGetServiceCardsQuery();
  console.log("services", services);

  const {categoryId}=useParams()


useEffect(()=>{
if( categoryId && catalog){
 dispatch(setSubCategories(catalog.find(category=>category.id===parseInt(categoryId)).subcategories))
}
},[categoryId,catalog])

console.log('categoryId',categoryId);

  if (isCatalog  || serviceLoading) {
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
            <Category categories={catalog} />
          </section>
        </section>
     
      </div>

      
        {
          isHome ?
        <section className="">

        <ServiceCard cards={services} />
        </section> : (

          <Outlet/>
        )
        }

    </section>
  );
};

export default buyerHome;
