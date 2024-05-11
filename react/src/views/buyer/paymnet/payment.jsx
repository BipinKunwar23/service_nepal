import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import signature from "./signature";
import esewa from "../../../images/esewa.png";
import { useLocation } from "react-router-dom";

export const PaymentEsewa = ({ amount = 10 }) => {
  console.log("amount", amount);
  const location = useLocation();
  const success_url = window.location.origin + location.pathname+"/success";
  console.log('succes',success_url);
  const tax_amount = 10;
  const product_service_charge = 10;
  const product_delivery_charge = 50;

  const [total_amount, setTotalAmount] = useState(0);
  console.log("total", total_amount);
  useEffect(() => {
    setTotalAmount(
      amount + tax_amount + product_delivery_charge + product_service_charge
    );
  }, []);

  const uuId = uuidv4();
  console.log("uuid", uuId);

  return (
    <form
      action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
      method="POST"
    >
      <input
        type="text"
        id="amount"
        name="amount"
        value={amount}
        required
        hidden
      />
      <input
        type="text"
        id="tax_amount"
        name="tax_amount"
        value={tax_amount}
        required
        hidden
      />
      <input
        type="text"
        id="total_amount"
        name="total_amount"
        value={total_amount}
        required
        hidden
      />
      <input
        type="text"
        id="transaction_uuid"
        name="transaction_uuid"
        value={uuId}
        required
        hidden
      />
      <input
        type="text"
        id="product_code"
        name="product_code"
        value="EPAYTEST"
        required
        hidden
      />
      <input
        type="text"
        id="product_service_charge"
        name="product_service_charge"
        value={product_service_charge}
        required
        hidden
      />
      <input
        type="text"
        id="product_delivery_charge"
        name="product_delivery_charge"
        value={product_delivery_charge}
        required
        hidden
      />
      <input
        type="text"
        id="success_url"
        name="success_url"
        value={`${success_url}`}
        required
        hidden
      />
      <input
        type="text"
        id="failure_url"
        name="failure_url"
        value="https://google.com"
        required
        hidden
      />
      <input
        type="text"
        id="signed_field_names"
        name="signed_field_names"
        value="total_amount,transaction_uuid,product_code"
        required
        hidden
      />
      <input
        type="text"
        id="signature"
        name="signature"
        value={signature(
          `total_amount=${total_amount},transaction_uuid=${uuId},product_code=EPAYTEST`,
          "8gBm/:&EnhH.1/q"
        )}
        required
        hidden
      />
      <button
        type="submit"
        className=" border-gray-300 border-2  flex place-content-center text-white text-lg  rounded-md  w-full"
      >
        <img src={esewa} className="h-12 w-28 object-cover " alt="" />
      </button>
      {/* <input
        value="Pay view Esewa"
        type="submit"
        className="bg-green-600 text-white rounded p-2 w-44"
      /> */}
    </form>
  );
};
