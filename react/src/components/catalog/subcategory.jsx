import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setServiceName } from "../../redux/buyerSlice";
import { useCreateSearchHistoryMutation } from "../../api/searchHistoryApi";
const SubCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const subcategories = useSelector((state) => state.buyerSlice.subcategories);
  console.log("subcategories", subcategories);

  const [createSearchHistory, {}] = useCreateSearchHistoryMutation();

  return (
    <section className=" relative  ">
      <div className="  ">
        <div className="grid grid-cols-4 ">
          {subcategories.map((subcategory) => {
            return (
              <div className=" bg-white  p-4" key={subcategory.id} >
                <ul>
                  <li className="flex flex-col gap-3">
                    <img
                      src={`http://localhost:8000/${subcategory.icons}`}
                      alt=""
                      className="h-[200px] rounded-lg object-cover  w-full border shadow shadow-gray-300 "
                    />

                    <ul className="space-y-2 mt-1">
                      <li className="mb-1">
                        <p className="text-[1.3em] font-semibold text-gray-900  ">
                          {subcategory.name}
                        </p>
                      </li>
                      {subcategory.services.map((service) => {
                        return (
                          <li key={service.id} className="text-[1.2em] hover:border-b-2 p-1 ">
                            <button
                              className="  text-gray-600  hover:cursor-pointer "
                              onClick={async () => {
                                navigate(
                                  `subcategory/${service?.subcategory_id}/service/${service.id}`
                                );
                                const values = {};
                                await createSearchHistory({
                                  values,
                                  subcategoryId: service?.subcategory_id,
                                })
                                  .unwrap()
                                  .then((response) => {
                                    console.log('response',response);

                                    if(response){
                                      dispatch(setServiceName(service?.name));
                                     

                                    }
                                  })
                                  .catch((error) => {
                                    console.log(error);
                                  });
                               
                              }}
                            >
                              {service?.name}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SubCategory;
