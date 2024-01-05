import React from "react";
import CheckInitial from "./checkInitial";
import { useSelector } from "react-redux";

const CheckAgreement = () => {
  return (
    <div className="border-t-2 border-gray-500 mt-5">
      <CheckInitial />

      <div></div>
    </div>
  );
};

export default CheckAgreement;
