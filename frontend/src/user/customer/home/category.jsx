import React, { useEffect, useState } from "react";
import { useViewCategoryQuery } from "../category/categoryApi";
import { FaChevronRight } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { useNavigate, Outlet, useParams } from "react-router-dom";
import { setOnClick, setOnOver } from "./cardSlice";
import { useSelector, useDispatch } from "react-redux";
export default function Category() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const selected = useSelector((state) => state.cardSlice.hovered);
  const clicked = useSelector((state) => state.cardSlice.clicked);
  console.log(clicked);

  const {
    data: categories,
    isError: categoryIsError,
    isLoading: categoryLoading,
    error: cataegoryError,
  } = useViewCategoryQuery();

  console.log('category',categories);
  const handleCategory = (category) => {
    dispatch(
      setOnOver({ ...selected, parent: category, subparent: {}, child: {} })
    );
  };
  const handleSubCategory = (category) => {
    dispatch(setOnOver({ ...selected, subparent: category, child: {} }));
  };
  const [toggle, setToggle] = useState(false);
  const [toggleCatg, setToggleCatg] = useState(false);
  const handleToggle = (toggle) => setToggle(toggle);
  const handleCategoryToggle = (toggle) => setToggleCatg(toggle);
  const selectedCatg =
    Object.keys(clicked?.child).length != 0
      ? clicked?.child
      : Object.keys(clicked?.subparent).length != 0
      ? clicked?.subparent
      : clicked?.parent;

  useEffect(() => {
    Object.keys(selectedCatg).length !== 0 &&
      navigate(`Category/${selectedCatg?.name}`);
  }, [selectedCatg]);
  if (categoryLoading) {
    return <div>loading...</div>;
  }
  return (
    <div className="grid grid-cols-3  col-start-1 row-start-1 col-end-4 col-span-4 text-sm font-semibold ">
      <div className="  bg-white shadow overflow-hidden">
        <ul
          className=" box-border grid grid-cols-1 gap-1 p-1"
          onMouseLeave={() => handleToggle(true)}
        >
          <li className="p-2 text-red-500 ">CATEGORIES</li>
          <li
            className={`p-2  hover:cursor-pointer ${
              clicked?.parent?.name === "All"
                ? "bg-blue-600 text-white"
                : " hover:bg-gray-200  hover:text-gray-700"
            }`}
            onClick={() => {
              dispatch(
                setOnClick({
                  ...clicked,
                  parent: { name: "All", category: [] },
                  subparent: {},
                  child: {},
                })
              );
            }}
            onMouseEnter={() => {
              handleCategoryToggle(false);
              handleToggle(false);
            }}
          >
            All
          </li>
          {categories.map((category) => {
            return (
              <li
                onMouseEnter={() => {
                  handleCategory(category);

                  // setCategoryId({ ...categoryId, parent: category.id });
                  // dispatch(setOnClick({...clicked,parent:category,subparent:{},child:{}}));
                }}
                onClick={() => {
                  console.log(category.id);
                  Object.keys(category?.category).length === 0 &&
                    (dispatch(
                      setOnClick({
                        ...clicked,
                        parent: category,
                        subparent: {},
                        child: {},
                      })
                    ),
                    handleToggle(false),
                    handleCategoryToggle(false));
                }}
                key={category.id}
                className={`p-2  hover:cursor-pointer flex  ${
                  clicked &&
                  clicked.parent &&
                  clicked.parent?.id === category.id
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-200  hover:text-gray-700"
                }`}
              >
                <p className="flex-1">{category.name}</p>
                {category.category &&
                  category.category.length > 0 &&
                  selected?.parent?.id === category.id && (
                    <span className="text-[#0118E6]">
                      <FaChevronRight />
                    </span>
                  )}
              </li>
            );
          })}
        </ul>
      </div>
      {Object.keys(selected?.parent).length > 0 &&
      Object.keys(selected?.parent?.category).length > 0 ? (
        <div className=" grid  bg-white shadow p-2 z-10 ">
          <ul className="">
            <li className="p-2 text-red-500">SUB CATEGORIES</li>
            {selected?.parent?.category.map((subcategory) => {
              return (
                <li
                  key={subcategory.id}
                  onMouseEnter={() => {
                    handleSubCategory(subcategory);

                    // setCategoryId({
                    //   ...categoryId,
                    //   Subparent: subcategory.id,
                    // });
                  }}
                  onClick={() => {
                    Object.keys(subcategory?.category).length === 0 &&
                      (dispatch(
                        setOnClick({
                          ...clicked,
                          parent: selected?.parent,
                          subparent: subcategory,
                          child: {},
                        })
                      ),
                      handleToggle(false),
                      handleCategoryToggle(false));
                  }}
                  className={`p-2 w-full hover:cursor-pointer flex ${
                    clicked &&
                    clicked.subparent &&
                    clicked.subparent?.id === subcategory.id
                      ? "bg-blue-600 text-white"
                      : "  hover:bg-gray-200  hover:text-gray-700"
                  }`}
                >
                  <p className="flex-1">{subcategory.name}</p>
                  {selected?.subparent &&
                    Object.keys(selected?.subparent).length > 0 &&
                    selected?.subparent?.id === subcategory.id &&
                    Object.keys(selected?.subparent?.category).length > 0 && (
                      <span className="text-[#0118E6]">
                        <FaChevronRight />
                      </span>
                    )}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
      {Object.keys(selected?.subparent).length != 0 &&
      Object.keys(selected?.subparent?.category).length > 0 ? (
        <div
          className=" bg-white  shadow p-2 z-10 "
          onMouseLeave={() => handleSubCategory({})}
        >
          <ul className="">
            <li className="p-2 text-red-500">SUB CATEGORIES</li>
            {selected?.subparent?.category.map((childcategory) => {
              return (
                <li
                  key={childcategory.id}
                  className={`p-2  ${
                    clicked?.child && clicked?.child?.id === childcategory.id
                      ? "hover:cursor-pointer bg-blue-600 text-gray-100"
                      : "hover:cursor-pointer hover:bg-gray-200  hover:text-gray-700"
                  }`}
                  onClick={() => {
                    dispatch(setOnOver({ ...selected, child: childcategory }));
                    dispatch(
                      setOnClick({
                        ...clicked,
                        parent: selected?.parent,
                        subparent: selected?.subparent,
                        child: childcategory,
                      })
                    );
                  }}
                >
                  {childcategory.name}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
