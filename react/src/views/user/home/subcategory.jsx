import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setServiceName } from "../../../redux/buyerSlice";
import { useCreateSearchHistoryMutation } from "../../../api/searchHistoryApi";
const SubCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const subcategories = useSelector((state) => state.buyerSlice.subcategories);
  console.log("subcategories", subcategories);

  const [createSearchHistory, {}] = useCreateSearchHistoryMutation();

  return (
    <section className=" relative  ">
      <div className="  ">
        <div className="grid grid-cols-4 gap-5">
          {subcategories.map((subcategory) => {
            return (
              <div className=" bg-white  p-4" key={subcategory.id}>
                <ul>
                  <li className="flex flex-col gap-3">
                    <img
                      src={`http://localhost:8000/${subcategory.icons}`}
                      alt=""
                      className="h-[200px] rounded-lg object-cover  w-full border shadow shadow-gray-300 "
                    />

                    <ul className="flex flex-col gap-2 mt-2">
                      <li className="mb-1">
                        <p className="text-[1.2em] font-semibold text-gray-900  ">
                          {subcategory.name}
                        </p>
                      </li>
                      {subcategory.services.map((service) => {
                        return (
                          <li key={service.id}>
                            <p
                              className="text-[1.4em]  text-gray-600  hover:cursor-pointer "
                              onClick={async () => {
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
                                      navigate(
                                        `subcategory/${service?.subcategory_id}/service/${service.id}`
                                      );

                                    }
                                  })
                                  .catch((error) => {
                                    console.log(error);
                                  });
                               
                              }}
                            >
                              {service?.name}
                            </p>
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
