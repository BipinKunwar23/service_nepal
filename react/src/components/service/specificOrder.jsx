import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setChat } from "../../redux/buyerSlice";
import { setOrderDetails } from "../../redux/sellerSlice";
import { useDispatch } from "react-redux";

const SpecificOrder = ({  price }) => {
  const [count, setCount] = useState(1);
  useEffect(() => {
    dispatch(setOrderDetails({quantity:count,cost:price * count}));
  }, [count]);
const dispatch=useDispatch()

  const navigate = useNavigate();
  return (
    <section className="">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold"> Quantity</h2>
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
      <div className="mt-3">
        <button
          className="w-full box-border text-[1.2em] bg-gray-700 text-white p-2 rounded-sm "
          onClick={() => {
            navigate("order", {
              state: {
                path: location.pathname,
              },
            });
          }}
        >
          CONTINUE{" "}
          <span className="ml-4">
            NPR {count * parseInt(price)}
          </span>{" "}
        </button>
        <button
          className="border-2 border-gray-400 rounded-md  p-2  mt-4 w-full"
          onClick={() => {
            dispatch(setChat(true));
          }}
        >
          Contact Now
        </button>
      </div>
    </section>
  );
};

export default SpecificOrder;
