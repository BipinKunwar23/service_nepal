import React, { useEffect } from "react";
import { usePlaceOrderMutation } from "../../../api/buyer/orderApi";
import Loader from "../../../components/Loader";
import { Bounce, ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
const PaymentSuccess = () => {
  const [placeOrder, { isLoading: isPlacing }] = usePlaceOrderMutation();
  const navigate=useNavigate()

  const handleOrder = async () => {
    await placeOrder({
      serviceId: sessionStorage.getItem("serviceId"),
      addressId: sessionStorage.getItem("addressId"),
      quantity: sessionStorage.getItem("quantity"),
      cost: sessionStorage.getItem("cost"),
      package: sessionStorage.getItem("package"),
    })
      .unwrap()
      .then((response) => {
        console.log("response", response);

        if (response) {
          toast(response?.message);
          setTimeout(() => {
            navigate(`/user/${localStorage.getItem("name")}/order`, {
              replace: true,
            });
          }, [2000]);
        }
        reset();
      })
      .catch((error) => {
        console.log("error", error);
        toast(error);
      });
  };
  useEffect(() => {
    handleOrder();
  }, []);

  if (isPlacing) {
    return <Loader />;
  }
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default PaymentSuccess;
