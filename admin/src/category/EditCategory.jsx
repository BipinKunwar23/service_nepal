import React, { useEffect } from "react";
import { AddCategory } from "./AddCategory";
import SubCategory from "./subCategory";
import { UpdateCategory } from "./UpdateCategory";
import AddService from "./AddService";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
const EditCategory = () => {
  const location = useLocation();
  console.log(location.state);
  const { parent, subparent, child } = useSelector(
    (state) => state.categorySlice.selectedCategory
  );
  // const path=useSelector(state=>state.categorySlice.path)

  console.log("parent", parent);
  console.log("subparent", subparent);
  console.log("child", child);

  const navigate = useNavigate();
  useEffect(() => {
    Object.keys(parent).length === 0 ? navigate("/user/category") : null;
  }, [parent]);
  // console.log('parent',parent);
  const selectedCatg =
    Object.keys(child).length != 0
      ? child
      : Object.keys(subparent).length != 0
      ? subparent
      : parent;
  return (
    <div className="flex flex-col">
      <div className="border-b-2 border-gray-200">
        <UpdateCategory selectedCatg={selectedCatg} />
      </div>
      {Object.keys(child).length === 0 ? <SubCategory selectedCatg={selectedCatg}/> : null}


      {Object.keys(parent).length !== 0 &&
      Object.keys(parent?.category).length === 0 ? (
        <AddService selectedCatg={selectedCatg}/>
      ) : Object.keys(subparent).length !== 0 &&
        Object.keys(subparent?.category).length === 0 ? (
        <AddService selectedCatg={selectedCatg} />
      ) : Object.keys(child).length !== 0 ? (
        <AddService selectedCatg={selectedCatg} />
      ) : null}
    </div>
  );
};

export default EditCategory;
