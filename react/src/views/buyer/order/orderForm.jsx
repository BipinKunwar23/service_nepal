import React, { useEffect, useState } from "react";
import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { setOrderDetails } from "../../../redux/sellerSlice";
import { useDispatch, useSelector } from "react-redux";
import { setContinue } from "../../../redux/buyerSlice";

const OrderForm = ({ packages,sellerId }) => {
  const packageName = useSelector((state) => state.sellerSlice.packageName);

  console.log("packages", packages);
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const order = useSelector((state) => state.sellerSlice.order);
  const location=useLocation();



  return (
    <section className=" w-[35%]  bg-white flex flex-col gap-8 ">
      <div className=" flex justify-between border-b border-gray-400 p-6">
        <h2 className="text-lg">Order Options</h2>
        <button
          className="text-lg font-semibold"
          onClick={() => {
            dispatch(
            setContinue(false)

            )
          }}
        >
          X
        </button>
      </div>
      <div className="flex-1 p-5   overflow-y-auto">
        <div className="flex flex-col gap-3 rounded-md border-2 p-4 border-gray-600">
          <div className="flex justify-between">
            <h2 className="font-semibold text-lg">
              {packages?.package?.toUpperCase()}
            </h2>
            <span className="text-xl">{count * packages?.price}</span>
          </div>
          <h2>
            <span  className="mr-4 font-semibold block">
              {packages?.name?.toUpperCase()}
            </span>{" "}
          </h2>
          <p>
            {packages?.description}

          </p>
          <div className="flex justify-between">
            <h2 className="text-lg">Service Quantity</h2>
            <div className="flex gap-3">
              <button
                className="bg-gray-200 rounded-full w-[40px] h-[40px]  text-2xl"
                onClick={() => {
                  setCount((prevState) => {
                    if (prevState > 1) {
                      return prevState - 1;
                    }
                    return 1;
                  });
                }}
              >
                -
              </button>
              <p className="text-xl text-center  grid place-content-center">
                {count}
              </p>
              <button
                className="bg-gray-200 rounded-full w-[40px] h-[40px]  text-xl "
                onClick={() => {
                  setCount((prevState) => prevState + 1);
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5">
        <button
          className="w-full box-border text-[1.2em]  bg-gray-700 text-white p-2 rounded-sm "
          onClick={() => {
            sessionStorage.setItem('quantity',count)
            sessionStorage.setItem('cost',packages?.price * count)

            dispatch(setOrderDetails({quantity:count,cost:packages?.price * count}))
            navigate({
              pathname: `order`,
              search: createSearchParams({
                seller:sellerId,
                package: packageName,
              }).toString(),
            },
            {state:{
              path:location.pathname
            }}
            
            );
          }}
        >
          CONTINUE <span className="ml-4">${packages?.price * count}</span>{" "}
        </button>
      </div>
    </section>
  );
};

export default OrderForm;
