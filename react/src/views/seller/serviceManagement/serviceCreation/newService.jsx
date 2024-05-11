import React, { useEffect } from "react";
import CreateService from "./ceeateService";
import { setStepCount, setSteps } from "../../../../redux/sellerSlice";
import { useDispatch } from "react-redux";

const NewService = () => {
  const dispatch = useDispatch();
  
  return (
    <>
      <CreateService />
    </>
  );
};

export default NewService;
