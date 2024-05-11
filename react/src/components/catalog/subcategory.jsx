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
    <section className=" relative py-4 min-h-[80Vh] shadow-sm ">
      <div className="  ">
        <div className="grid grid-cols-3 gap-10  ">
          {subcategories.map((subcategory) => {
            return (
              <div className=" bg-white  p-4" key={subcategory.id}  >
                <ul>
                  <li className="flex flex-col gap-1">
                    <img
                      src={`http://localhost:8000/${subcategory.icons}`}
                      alt=""
                      className="h-[140px] rounded-lg object-cover  w-full  "
                    />

                    <ul className="space-y-3 ">
                      <li className="mb-1">
                        <p className="text-[1.3em] font-semibold text-gray-900 my-2 ">
                          {subcategory.name}
                        </p>
                      </li>
                      {subcategory.services.map((service) => {
                        return (
                          <li key={service.id} className="text-[1em] ">
                            <button
                              className="  text-black  hover:cursor-pointer "
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
